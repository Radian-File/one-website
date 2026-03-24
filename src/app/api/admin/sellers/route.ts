import { randomUUID } from "node:crypto";
import { prisma } from "@/lib/prisma";
import { requireAdminSession } from "@/lib/session";
import { sellerRegisterSchema } from "@/lib/api-schemas";
import { hashPassword } from "@/lib/auth-utils";

type SellerRow = {
  id: string;
  email: string;
  displayName: string | null;
  createdAt: string;
};

type SellerFindDelegate = {
  findUnique(args: { where: { email: string } }): Promise<{ id: string } | null>;
};

type SellerCreateDelegate = {
  create(args: {
    data: { email: string; displayName?: string; passwordHash: string };
    select: { id: true; email: true; displayName: true; createdAt: true };
  }): Promise<SellerRow>;
};

type SellerListDelegate = {
  findMany(args: {
    orderBy: { createdAt: "desc" };
    select: { id: true; email: true; displayName: true; createdAt: true };
  }): Promise<SellerRow[]>;
};

async function sellerExists(email: string): Promise<boolean> {
  const sellerDelegate = (prisma as unknown as { sellerUser?: SellerFindDelegate }).sellerUser;

  if (sellerDelegate?.findUnique) {
    const seller = await sellerDelegate.findUnique({ where: { email } });
    return !!seller;
  }

  const rows = await prisma.$queryRaw<{ id: string }[]>`
    SELECT id FROM "SellerUser" WHERE email = ${email} LIMIT 1
  `;
  return rows.length > 0;
}

async function createSeller(data: { email: string; displayName?: string; passwordHash: string }) {
  const sellerDelegate = (prisma as unknown as { sellerUser?: SellerCreateDelegate }).sellerUser;

  if (sellerDelegate?.create) {
    return sellerDelegate.create({
      data,
      select: { id: true, email: true, displayName: true, createdAt: true },
    });
  }

  const id = randomUUID();
  const now = new Date().toISOString();
  await prisma.$executeRaw`
    INSERT INTO "SellerUser" (id, email, displayName, passwordHash, createdAt, updatedAt)
    VALUES (${id}, ${data.email}, ${data.displayName ?? null}, ${data.passwordHash}, ${now}, ${now})
  `;

  return { id, email: data.email, displayName: data.displayName ?? null, createdAt: now };
}

async function listSellers(): Promise<SellerRow[]> {
  const sellerDelegate = (prisma as unknown as { sellerUser?: SellerListDelegate }).sellerUser;

  if (sellerDelegate?.findMany) {
    return sellerDelegate.findMany({
      orderBy: { createdAt: "desc" },
      select: { id: true, email: true, displayName: true, createdAt: true },
    });
  }

  return prisma.$queryRaw<SellerRow[]>`
    SELECT id, email, displayName, createdAt
    FROM "SellerUser"
    ORDER BY createdAt DESC
  `;
}

export async function GET() {
  try {
    await requireAdminSession();
    const sellers = await listSellers();
    return Response.json({ sellers });
  } catch (error) {
    if (error instanceof Error && error.message === "UNAUTHORIZED") {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }
    if (error instanceof Error && error.message === "FORBIDDEN_ADMIN") {
      return Response.json({ error: "Forbidden" }, { status: 403 });
    }
    return Response.json({ error: "Unable to fetch sellers" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    await requireAdminSession();

    const payload = sellerRegisterSchema.safeParse(await request.json());
    if (!payload.success) {
      return Response.json({ error: payload.error.flatten() }, { status: 400 });
    }

    const email = payload.data.email.toLowerCase();

    if (await sellerExists(email)) {
      return Response.json({ error: "Seller email already exists" }, { status: 409 });
    }

    const seller = await createSeller({
      email,
      displayName: payload.data.displayName,
      passwordHash: hashPassword(payload.data.password),
    });

    return Response.json({ seller, message: "Seller account created" }, { status: 201 });
  } catch (error) {
    if (error instanceof Error && error.message === "UNAUTHORIZED") {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }
    if (error instanceof Error && error.message === "FORBIDDEN_ADMIN") {
      return Response.json({ error: "Forbidden" }, { status: 403 });
    }
    return Response.json({ error: "Unable to create seller" }, { status: 500 });
  }
}
