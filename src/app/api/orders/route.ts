import { randomBytes } from "node:crypto";
import { z } from "zod";
import { getSessionUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

const schema = z.object({
  items: z.array(z.object({
    productId: z.string().min(1),
    quantity: z.number().int().min(1).max(99),
    options: z.record(z.string(), z.string()).optional()
  })).min(1).max(100),
  customerName: z.string().trim().min(2).max(100),
  customerEmail: z.string().trim().email(),
  customerPhone: z.string().trim().min(7).max(30),
  addressLine: z.string().trim().min(5).max(250),
  city: z.string().trim().min(2).max(80),
  state: z.string().trim().min(2).max(80),
  deliveryNote: z.string().trim().max(500).optional(),
  couponCode: z.string().trim().max(40).optional()
});

export async function POST(request: Request) {
  const user = await getSessionUser();
  if (!user) return Response.json({ error: "Sign in before placing an order." }, { status: 401 });

  const parsed = schema.safeParse(await request.json());
  if (!parsed.success) return Response.json({ error: "Order details are invalid.", details: parsed.error.flatten() }, { status: 400 });

  const quantities = new Map<string, number>();
  for (const line of parsed.data.items) quantities.set(line.productId, (quantities.get(line.productId) ?? 0) + line.quantity);
  const productIds = Array.from(quantities.keys());

  try {
    const order = await prisma.$transaction(async (tx) => {
      const products = await tx.product.findMany({
        where: { id: { in: productIds }, active: true, vendor: { status: "APPROVED" } },
        include: { vendor: { select: { id: true, storeName: true } } }
      });
      if (products.length !== productIds.length) throw new Error("One or more products are unavailable.");

      const byId = new Map(products.map((product) => [product.id, product]));
      let subtotal = 0;
      const orderLines = parsed.data.items.map((line) => {
        const product = byId.get(line.productId);
        if (!product) throw new Error("A product in this order is unavailable.");
        if ((quantities.get(product.id) ?? 0) > product.stock) throw new Error(`Not enough stock for ${product.name}.`);
        subtotal += product.price * line.quantity;
        return {
          productId: product.id,
          vendorId: product.vendorId,
          productName: product.name,
          unitPrice: product.price,
          quantity: line.quantity,
          options: line.options ?? undefined
        };
      });

      for (const [productId, quantity] of quantities) {
        const reserved = await tx.product.updateMany({
          where: { id: productId, active: true, stock: { gte: quantity } },
          data: { stock: { decrement: quantity } }
        });
        if (reserved.count !== 1) throw new Error("Stock changed while placing the order. Please refresh your cart.");
      }

      const orderNumber = `MK-${Date.now().toString(36).toUpperCase()}-${randomBytes(3).toString("hex").toUpperCase()}`;
      return tx.order.create({
        data: {
          orderNumber,
          userId: user.id,
          subtotal,
          total: subtotal,
          customerName: parsed.data.customerName,
          customerEmail: parsed.data.customerEmail,
          customerPhone: parsed.data.customerPhone,
          addressLine: parsed.data.addressLine,
          city: parsed.data.city,
          state: parsed.data.state,
          deliveryNote: parsed.data.deliveryNote || null,
          couponCode: null,
          items: { create: orderLines }
        },
        select: { id: true, orderNumber: true, status: true, paymentStatus: true, subtotal: true, total: true, createdAt: true }
      });
    });

    return Response.json({ order, message: "Order created. Payment is not yet enabled." }, { status: 201 });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unable to create this order.";
    return Response.json({ error: message }, { status: 400 });
  }
}
