import { randomUUID } from "node:crypto";
import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";
import { registerSchema } from "@/lib/api-schemas";
import { hashPassword } from "@/lib/auth-utils";
import { APP_SESSION_COOKIE } from "@/lib/session";

type UserRow = {
  id: string;
  email: string;
  name: string | null;
  passwordHash: string;
};

type UserFindDelegate = {
  findUnique(args: { where: { email: string } }): Promise<UserRow | null>;
};

type UserCreateDelegate = {
  create(args: {
    data: { email: string; name?: string; passwordHash: string };
    select: { id: true; email: true; name: true };
  }): Promise<{ id: string; email: string; name: string | null }>;
};

async function findUserByEmail(email: string): Promise<UserRow | null> {
  const userDelegate = (prisma as unknown as { user?: UserFindDelegate }).user;

  if (userDelegate?.findUnique) {
    const user = await userDelegate.findUnique({ where: { email } });
    return user ?? null;
  }

  const rows = await prisma.$queryRaw<UserRow[]>`
    SELECT id, email, name, passwordHash
    FROM "User"
    WHERE email = ${email}
    LIMIT 1
  `;

  return rows[0] ?? null;
}

async function createUser(data: { email: string; name?: string; passwordHash: string }) {
  const userDelegate = (prisma as unknown as { user?: UserCreateDelegate }).user;

  if (userDelegate?.create) {
    return userDelegate.create({
      data,
      select: {
        id: true,
        email: true,
        name: true,
      },
    });
  }

  const id = randomUUID();
  const now = new Date().toISOString();

  await prisma.$executeRaw`
    INSERT INTO "User" (id, email, name, passwordHash, createdAt, updatedAt)
    VALUES (${id}, ${data.email}, ${data.name ?? null}, ${data.passwordHash}, ${now}, ${now})
  `;

  return {
    id,
    email: data.email,
    name: data.name ?? null,
  };
}

export async function POST(request: Request) {
  const payload = registerSchema.safeParse(await request.json());

  if (!payload.success) {
    return Response.json({ error: payload.error.flatten() }, { status: 400 });
  }

  const email = payload.data.email.toLowerCase();

  const exists = await findUserByEmail(email);
  if (exists) {
    return Response.json({ error: "Email already registered" }, { status: 409 });
  }

  const user = await createUser({
    email,
    name: payload.data.name,
    passwordHash: hashPassword(payload.data.password),
  });

  const cookieStore = await cookies();
  const maxAge = payload.data.remember ? 60 * 60 * 24 * 30 : 60 * 60 * 24;

  cookieStore.set(APP_SESSION_COOKIE, `user-${user.id}`, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge,
  });

  return Response.json({ message: "Registered", user });
}
