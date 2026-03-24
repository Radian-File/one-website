import { cookies } from "next/headers";
import { loginSchema } from "@/lib/api-schemas";
import { prisma } from "@/lib/prisma";
import { verifyPassword } from "@/lib/auth-utils";
import { APP_SESSION_COOKIE } from "@/lib/session";

const ADMIN_EMAIL = "admin@gmail.com";
const ADMIN_PASSWORD = "admin123";

type UserRow = {
  id: string;
  email: string;
  name: string | null;
  passwordHash: string;
};

type SellerRow = {
  id: string;
  email: string;
  displayName: string | null;
  passwordHash: string;
};

type UserDelegate = {
  findUnique(args: { where: { email: string } }): Promise<UserRow | null>;
};

type SellerDelegate = {
  findUnique(args: { where: { email: string } }): Promise<SellerRow | null>;
};

async function findUserByEmail(email: string): Promise<UserRow | null> {
  const userDelegate = (prisma as unknown as { user?: UserDelegate }).user;

  if (userDelegate?.findUnique) {
    return userDelegate.findUnique({ where: { email } });
  }

  const rows = await prisma.$queryRaw<UserRow[]>`
    SELECT id, email, name, passwordHash
    FROM "User"
    WHERE email = ${email}
    LIMIT 1
  `;

  return rows[0] ?? null;
}

async function findSellerByEmail(email: string): Promise<SellerRow | null> {
  const sellerDelegate = (prisma as unknown as { sellerUser?: SellerDelegate }).sellerUser;

  if (sellerDelegate?.findUnique) {
    return sellerDelegate.findUnique({ where: { email } });
  }

  const rows = await prisma.$queryRaw<SellerRow[]>`
    SELECT id, email, displayName, passwordHash
    FROM "SellerUser"
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

  const loginId = payload.data.email.trim();
  const normalizedEmail = loginId.toLowerCase();
  const password = payload.data.password;

  const cookieStore = await cookies();
  const maxAge = payload.data.remember ? 60 * 60 * 24 * 30 : 60 * 60 * 24;

  if (normalizedEmail === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
    cookieStore.set(APP_SESSION_COOKIE, "admin-admin", {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge,
    });

    return Response.json({
      message: "Admin signed in",
      role: "admin",
      user: {
        id: "admin",
        email: ADMIN_EMAIL,
        name: "Administrator",
      },
    });
  }

  const seller = await findSellerByEmail(normalizedEmail);
  if (seller && verifyPassword(password, seller.passwordHash)) {
    cookieStore.set(APP_SESSION_COOKIE, `seller-${seller.id}`, {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge,
    });

    return Response.json({
      message: "Seller signed in",
      role: "seller",
      user: {
        id: seller.id,
        email: seller.email,
        name: seller.displayName,
      },
    });
  }

  const user = await findUserByEmail(normalizedEmail);
  if (user && verifyPassword(password, user.passwordHash)) {
    cookieStore.set(APP_SESSION_COOKIE, `user-${user.id}`, {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge,
    });

    return Response.json({
      message: "Signed in",
      role: "user",
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
      },
    });
  }

  return Response.json({ error: "Invalid credentials" }, { status: 401 });
}
