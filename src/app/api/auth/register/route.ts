import { hash } from "bcryptjs";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { createSession } from "@/lib/auth";

const schema = z.object({
  name: z.string().trim().min(2).max(80),
  email: z.string().trim().email().max(254),
  password: z.string().min(10).max(128),
  phone: z.string().trim().max(30).optional()
});

export async function POST(request: Request) {
  try {
    const parsed = schema.safeParse(await request.json());
    if (!parsed.success) return Response.json({ error: "Please provide a valid name, email and password (at least 10 characters)." }, { status: 400 });

    const email = parsed.data.email.toLowerCase();
    const existing = await prisma.user.findUnique({ where: { email }, select: { id: true } });
    if (existing) return Response.json({ error: "An account with this email already exists." }, { status: 409 });

    const user = await prisma.user.create({
      data: {
        name: parsed.data.name,
        email,
        passwordHash: await hash(parsed.data.password, 12),
        phone: parsed.data.phone || null
      },
      select: { id: true, name: true, email: true, role: true }
    });
    await createSession(user.id);
    return Response.json({ user }, { status: 201 });
  } catch {
    return Response.json({ error: "Unable to create your account right now." }, { status: 500 });
  }
}
