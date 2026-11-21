import { z } from "zod";
import { getSessionUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

const schema = z.object({ decision: z.enum(["APPROVED", "REJECTED", "SUSPENDED"]) });

export async function PATCH(request: Request, context: { params: Promise<{ vendorId: string }> }) {
  const user = await getSessionUser();
  if (!user || user.role !== "ADMIN") return Response.json({ error: "Administrator access is required." }, { status: 403 });
  const parsed = schema.safeParse(await request.json());
  if (!parsed.success) return Response.json({ error: "Choose a valid vendor review decision." }, { status: 400 });

  const { vendorId } = await context.params;
  const vendor = await prisma.vendor.findUnique({ where: { id: vendorId }, select: { id: true, userId: true } });
  if (!vendor) return Response.json({ error: "Vendor application not found." }, { status: 404 });

  const updated = await prisma.$transaction(async (tx) => {
    const result = await tx.vendor.update({
      where: { id: vendorId },
      data: { status: parsed.data.decision },
      select: { id: true, storeName: true, slug: true, status: true }
    });
    const role = parsed.data.decision === "APPROVED" ? "VENDOR" : "CUSTOMER";
    await tx.user.update({ where: { id: vendor.userId }, data: { role } });
    return result;
  });
  return Response.json({ vendor: updated });
}
