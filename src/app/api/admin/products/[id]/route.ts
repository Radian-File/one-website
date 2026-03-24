import { prisma } from "@/lib/prisma";
import { requireAdminSession } from "@/lib/session";
import { adminProductUpdateSchema } from "@/lib/api-schemas";

export const dynamic = "force-dynamic";

export async function PATCH(
  request: Request,
  context: RouteContext<"/api/admin/products/[id]">,
) {
  try {
    await requireAdminSession();

    const { id } = await context.params;

    const payload = adminProductUpdateSchema.safeParse(await request.json());
    if (!payload.success) {
      return Response.json({ error: payload.error.flatten() }, { status: 400 });
    }

    const existing = await prisma.product.findUnique({ where: { id } });
    if (!existing) {
      return Response.json({ error: "Product not found" }, { status: 404 });
    }

    const product = await prisma.product.update({
      where: { id },
      data: payload.data,
    });

    return Response.json({ product, message: "Product updated" });
  } catch (error) {
    if (error instanceof Error && error.message === "UNAUTHORIZED") {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }
    if (error instanceof Error && error.message === "FORBIDDEN_ADMIN") {
      return Response.json({ error: "Forbidden" }, { status: 403 });
    }

    return Response.json({ error: "Unable to update product" }, { status: 500 });
  }
}

export async function DELETE(
  _request: Request,
  context: RouteContext<"/api/admin/products/[id]">,
) {
  try {
    await requireAdminSession();

    const { id } = await context.params;

    const existing = await prisma.product.findUnique({ where: { id } });
    if (!existing) {
      return Response.json({ error: "Product not found" }, { status: 404 });
    }

    await prisma.product.delete({ where: { id } });
    return Response.json({ message: "Product deleted" });
  } catch (error) {
    if (error instanceof Error && error.message === "UNAUTHORIZED") {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }
    if (error instanceof Error && error.message === "FORBIDDEN_ADMIN") {
      return Response.json({ error: "Forbidden" }, { status: 403 });
    }

    return Response.json({ error: "Unable to delete product" }, { status: 500 });
  }
}
