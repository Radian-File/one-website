import { changePasswordSchema } from "@/lib/api-schemas";
import { hashPassword, verifyPassword } from "@/lib/auth-utils";
import { prisma } from "@/lib/prisma";
import { requireUserSession } from "@/lib/session";

type UserRow = {
  id: string;
  passwordHash: string;
};

type UserDelegate = {
  findUnique(args: { where: { id: string } }): Promise<UserRow | null>;
  update(args: { where: { id: string }; data: { passwordHash: string } }): Promise<{ id: string }>;
};

async function findUserById(id: string): Promise<UserRow | null> {
  const userDelegate = (prisma as unknown as { user?: UserDelegate }).user;
  if (userDelegate?.findUnique) {
    return userDelegate.findUnique({ where: { id } });
  }

  const rows = await prisma.$queryRaw<UserRow[]>`
    SELECT id, passwordHash
    FROM "User"
    WHERE id = ${id}
    LIMIT 1
  `;
  return rows[0] ?? null;
}

async function updatePassword(id: string, passwordHash: string) {
  const userDelegate = (prisma as unknown as { user?: UserDelegate }).user;
  if (userDelegate?.update) {
    await userDelegate.update({ where: { id }, data: { passwordHash } });
    return;
  }

  const now = new Date().toISOString();
  await prisma.$executeRaw`
    UPDATE "User"
    SET passwordHash = ${passwordHash}, updatedAt = ${now}
    WHERE id = ${id}
  `;
}

export async function POST(request: Request) {
  try {
    const sessionUser = await requireUserSession();

    const payload = changePasswordSchema.safeParse(await request.json());
    if (!payload.success) {
      return Response.json({ error: payload.error.flatten() }, { status: 400 });
    }

    const user = await findUserById(sessionUser.id);
    if (!user) {
      return Response.json({ error: "User not found" }, { status: 404 });
    }

    if (!verifyPassword(payload.data.currentPassword, user.passwordHash)) {
      return Response.json({ error: "Current password is incorrect" }, { status: 401 });
    }

    await updatePassword(user.id, hashPassword(payload.data.newPassword));

    return Response.json({ message: "Password updated" });
  } catch (error) {
    if (error instanceof Error && error.message === "UNAUTHORIZED") {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }
    if (error instanceof Error && error.message === "FORBIDDEN_USER") {
      return Response.json({ error: "Forbidden" }, { status: 403 });
    }

    return Response.json({ error: "Unable to update password" }, { status: 500 });
  }
}
