import { cookies } from "next/headers";
import { loginSchema } from "@/lib/api-schemas";
import { prisma } from "@/lib/prisma";
import { verifyPassword } from "@/lib/auth-utils";

type UserRow = {
  id: string;
  email: string;
  name: string | null;
  passwordHash: string;
};

type UserDelegate = {
  findUnique(args: { where: { email: string } }): Promise<UserRow | null>;
};

async function findUserByEmail(email: string): Promise<UserRow | null> {
  const userDelegate = (prisma as unknown as { user?: UserDelegate }).user;

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

export async function POST(request: Request) {
  const payload = loginSchema.safeParse(await request.json());

  if (!payload.success) {
    return Response.json({ error: payload.error.flatten() }, { status: 400 });
  }

  const email = payload.data.email.toLowerCase();
  const user = await findUserByEmail(email);

  if (!user || !verifyPassword(payload.data.password, user.passwordHash)) {
    return Response.json({ error: "Invalid email or password" }, { status: 401 });
  }

  const cookieStore = await cookies();
  const maxAge = payload.data.remember ? 60 * 60 * 24 * 30 : 60 * 60 * 24;

  cookieStore.set("atelier_session", `user-${user.id}`, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge,
  });

  return Response.json({
    message: "Signed in",
    user: {
      id: user.id,
      email: user.email,
      name: user.name,
    },
  });
}
