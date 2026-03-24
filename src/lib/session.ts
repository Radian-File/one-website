import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";

export const APP_SESSION_COOKIE = "atelier_session";

export type SessionRole = "admin" | "seller" | "user";

export type SessionPrincipal = {
  role: SessionRole;
  id: string;
};

type SessionUser = {
  id: string;
  email: string;
  name: string | null;
};

type SessionSeller = {
  id: string;
  email: string;
  displayName: string | null;
};

function parseSession(value?: string): SessionPrincipal | null {
  if (!value) return null;

  if (value.startsWith("admin-")) {
    const id = value.slice(6);
    if (!id) return null;
    return { role: "admin", id };
  }

  if (value.startsWith("seller-")) {
    const id = value.slice(7);
    if (!id) return null;
    return { role: "seller", id };
  }

  if (value.startsWith("user-")) {
    const id = value.slice(5);
    if (!id) return null;
    return { role: "user", id };
  }

  return null;
}

export async function getSessionPrincipal(): Promise<SessionPrincipal | null> {
  const cookieStore = await cookies();
  const raw = cookieStore.get(APP_SESSION_COOKIE)?.value;
  return parseSession(raw);
}

export async function isAuthenticated(): Promise<boolean> {
  return !!(await getSessionPrincipal());
}

export async function requireAuthenticatedPrincipal(): Promise<SessionPrincipal> {
  const principal = await getSessionPrincipal();
  if (!principal) throw new Error("UNAUTHORIZED");
  return principal;
}

export async function requireAdminSession(): Promise<SessionPrincipal> {
  const principal = await requireAuthenticatedPrincipal();
  if (principal.role !== "admin") throw new Error("FORBIDDEN_ADMIN");
  return principal;
}

export async function requireUserSession(): Promise<SessionPrincipal> {
  const principal = await requireAuthenticatedPrincipal();
  if (principal.role !== "user") throw new Error("FORBIDDEN_USER");
  return principal;
}

export async function getSessionUser(): Promise<SessionUser | null> {
  const principal = await getSessionPrincipal();
  if (!principal || principal.role !== "user") return null;

  const userDelegate = (prisma as unknown as {
    user?: {
      findUnique(args: {
        where: { id: string };
        select: { id: true; email: true; name: true };
      }): Promise<SessionUser | null>;
    };
  }).user;

  if (userDelegate?.findUnique) {
    return userDelegate.findUnique({
      where: { id: principal.id },
      select: { id: true, email: true, name: true },
    });
  }

  const rows = await prisma.$queryRaw<SessionUser[]>`
    SELECT id, email, name
    FROM "User"
    WHERE id = ${principal.id}
    LIMIT 1
  `;

  return rows[0] ?? null;
}

export async function getSessionSeller(): Promise<SessionSeller | null> {
  const principal = await getSessionPrincipal();
  if (!principal || principal.role !== "seller") return null;

  const sellerDelegate = (prisma as unknown as {
    sellerUser?: {
      findUnique(args: {
        where: { id: string };
        select: { id: true; email: true; displayName: true };
      }): Promise<SessionSeller | null>;
    };
  }).sellerUser;

  if (sellerDelegate?.findUnique) {
    return sellerDelegate.findUnique({
      where: { id: principal.id },
      select: { id: true, email: true, displayName: true },
    });
  }

  const rows = await prisma.$queryRaw<SessionSeller[]>`
    SELECT id, email, displayName
    FROM "SellerUser"
    WHERE id = ${principal.id}
    LIMIT 1
  `;

  return rows[0] ?? null;
}
