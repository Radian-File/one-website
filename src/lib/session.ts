import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";

type SessionUser = {
  id: string;
  email: string;
  name: string | null;
};

export function parseSessionUserId(value?: string): string | null {
  if (!value) return null;
  if (!value.startsWith("user-")) return null;
  return value.slice(5) || null;
}

export async function getSessionUser(): Promise<SessionUser | null> {
  const cookieStore = await cookies();
  const session = cookieStore.get("atelier_session")?.value;
  const userId = parseSessionUserId(session);

  if (!userId) return null;

  const userDelegate = (prisma as unknown as {
    user?: { findUnique(args: { where: { id: string }; select: { id: true; email: true; name: true } }): Promise<SessionUser | null> };
  }).user;

  if (userDelegate?.findUnique) {
    return userDelegate.findUnique({
      where: { id: userId },
      select: { id: true, email: true, name: true },
    });
  }

  const rows = await prisma.$queryRaw<SessionUser[]>`
    SELECT id, email, name
    FROM "User"
    WHERE id = ${userId}
    LIMIT 1
  `;

  return rows[0] ?? null;
}

export async function isAuthenticated(): Promise<boolean> {
  const user = await getSessionUser();
  return !!user;
}

export async function requireSessionUser(): Promise<SessionUser> {
  const user = await getSessionUser();
  if (!user) {
    throw new Error("UNAUTHORIZED");
  }
  return user;
}
