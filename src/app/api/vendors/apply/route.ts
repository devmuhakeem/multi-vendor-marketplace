import { z } from "zod";
import { getSessionUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

const schema = z.object({
  storeName: z.string().trim().min(2).max(100),
  description: z.string().trim().max(1000).optional(),
  supportEmail: z.string().trim().email().optional().or(z.literal("")),
  supportPhone: z.string().trim().max(30).optional()
});

const slugify = (value: string) => value.toLowerCase().normalize("NFKD").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

export async function POST(request: Request) {
  const user = await getSessionUser();
  if (!user) return Response.json({ error: "Sign in before applying to become a vendor." }, { status: 401 });

  const parsed = schema.safeParse(await request.json());
  if (!parsed.success) return Response.json({ error: "Provide a valid store name and contact details." }, { status: 400 });

  const existing = await prisma.vendor.findUnique({ where: { userId: user.id } });
  if (existing) return Response.json({ error: "A vendor application already exists for this account.", status: existing.status }, { status: 409 });

  const baseSlug = slugify(parsed.data.storeName) || "store";
  const slug = `${baseSlug}-${user.id.slice(-6)}`;
  const vendor = await prisma.vendor.create({
    data: {
      userId: user.id,
      storeName: parsed.data.storeName,
      slug,
      description: parsed.data.description || null,
      supportEmail: parsed.data.supportEmail || null,
      supportPhone: parsed.data.supportPhone || null
    },
    select: { id: true, storeName: true, slug: true, status: true, createdAt: true }
  });

  return Response.json({ vendor, message: "Application submitted for marketplace review." }, { status: 201 });
}
