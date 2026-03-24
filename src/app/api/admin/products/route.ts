import { prisma } from "@/lib/prisma";
import { requireAdminSession } from "@/lib/session";
import { adminProductSchema } from "@/lib/api-schemas";
import { createProductId } from "@/lib/slug";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    await requireAdminSession();

    const products = await prisma.product.findMany({
      orderBy: { createdAt: "desc" },
    });

    return Response.json({ products });
  } catch (error) {
    if (error instanceof Error && error.message === "UNAUTHORIZED") {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }
    if (error instanceof Error && error.message === "FORBIDDEN_ADMIN") {
      return Response.json({ error: "Forbidden" }, { status: 403 });
    }

    return Response.json({ error: "Unable to fetch products" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    await requireAdminSession();

    const payload = adminProductSchema.safeParse(await request.json());
    if (!payload.success) {
      return Response.json({ error: payload.error.flatten() }, { status: 400 });
    }

    const id = createProductId(payload.data.title);

    const product = await prisma.product.create({
      data: {
        id,
        ...payload.data,
      },
    });

    return Response.json({ product, message: "Product created" }, { status: 201 });
  } catch (error) {
    if (error instanceof Error && error.message === "UNAUTHORIZED") {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }
    if (error instanceof Error && error.message === "FORBIDDEN_ADMIN") {
      return Response.json({ error: "Forbidden" }, { status: 403 });
    }

    return Response.json({ error: "Unable to create product" }, { status: 500 });
  }
}
