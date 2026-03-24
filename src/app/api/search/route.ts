import { prisma } from "@/lib/prisma";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("q")?.trim() ?? "";

  if (!query) {
    return Response.json({ products: [] });
  }

  const products = await prisma.product.findMany({
    where: {
      OR: [
        { title: { contains: query } },
        { category: { contains: query } },
        { description: { contains: query } },
      ],
    },
    orderBy: { createdAt: "desc" },
    take: 24,
  });

  return Response.json({ products });
}
