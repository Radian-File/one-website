import type { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(_request: NextRequest, context: RouteContext<"/api/products/[id]">) {
  const { id } = await context.params;

  const product = await prisma.product.findUnique({ where: { id } });

  if (!product) {
    return Response.json({ error: "Product not found" }, { status: 404 });
  }

  return Response.json({ product });
}
