import { z } from "zod";
import { getSessionUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

const createSchema = z.object({
  name: z.string().trim().min(2).max(160),
  description: z.string().trim().min(5).max(5000),
  category: z.string().trim().min(2).max(80),
  price: z.number().int().positive(),
  compareAtPrice: z.number().int().positive().optional(),
  stock: z.number().int().min(0).max(1000000).default(0),
  images: z.array(z.string().url()).min(1).max(8),
  options: z.record(z.string(), z.array(z.string())).optional(),
  wholesaleMin: z.number().int().min(2).optional()
});

const slugify = (value: string) => value.toLowerCase().normalize("NFKD").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const q = searchParams.get("q")?.trim();
  const category = searchParams.get("category")?.trim();
  const page = Math.max(1, Number(searchParams.get("page") || 1));
  const limit = Math.min(50, Math.max(1, Number(searchParams.get("limit") || 20)));

  const where = {
    active: true,
    vendor: { status: "APPROVED" as const },
    ...(category ? { category: { equals: category, mode: "insensitive" as const } } : {}),
    ...(q ? { OR: [{ name: { contains: q, mode: "insensitive" as const } }, { description: { contains: q, mode: "insensitive" as const } }] } : {})
  };

  const [items, total] = await Promise.all([
    prisma.product.findMany({
      where,
      orderBy: { createdAt: "desc" },
      skip: (page - 1) * limit,
      take: limit,
      select: { id: true, name: true, description: true, category: true, price: true, compareAtPrice: true, stock: true, images: true, options: true, wholesaleMin: true, vendor: { select: { id: true, storeName: true, slug: true } } }
    }),
    prisma.product.count({ where })
  ]);

  return Response.json({ items, pagination: { page, limit, total, pages: Math.ceil(total / limit) } });
}

export async function POST(request: Request) {
  const user = await getSessionUser();
  if (!user) return Response.json({ error: "Sign in to add products." }, { status: 401 });
  if (user.role !== "VENDOR" && user.role !== "ADMIN") return Response.json({ error: "Vendor access is required. Submit a vendor application first." }, { status: 403 });

  const parsed = createSchema.safeParse(await request.json());
  if (!parsed.success) return Response.json({ error: "Product details are invalid.", details: parsed.error.flatten() }, { status: 400 });

  const vendor = await prisma.vendor.findUnique({ where: { userId: user.id } });
  if (!vendor || vendor.status !== "APPROVED") return Response.json({ error: "Your vendor account must be approved before listing products." }, { status: 403 });

  const baseSlug = slugify(parsed.data.name) || "product";
  const product = await prisma.product.create({
    data: { ...parsed.data, slug: `${baseSlug}-${Date.now().toString(36)}`, vendorId: vendor.id },
    select: { id: true, name: true, price: true, stock: true, active: true, createdAt: true }
  });
  return Response.json({ product }, { status: 201 });
}
