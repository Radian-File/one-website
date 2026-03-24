import Image from "next/image";
import Link from "next/link";
import { PageTemplate } from "@/components/layout/page-template";
import { prisma } from "@/lib/prisma";
import { formatCurrency } from "@/lib/cart-utils";

export const dynamic = "force-dynamic";

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q } = await searchParams;
  const query = q?.trim() ?? "";

  const products =
    query.length > 0
      ? await prisma.product.findMany({
          where: {
            OR: [
              { title: { contains: query } },
              { category: { contains: query } },
              { description: { contains: query } },
            ],
          },
          orderBy: { createdAt: "desc" },
          take: 24,
        })
      : [];

  return (
    <PageTemplate
      title="Search Results"
      subtitle={query ? `Results for “${query}”` : "Search"}
    >
      <div className="max-w-7xl mx-auto">
        {!query ? (
          <div className="text-center">
            <span className="material-symbols-outlined text-6xl text-outline mb-6 block">
              search
            </span>
            <p className="font-body text-secondary">Enter a search term to find products.</p>
          </div>
        ) : products.length === 0 ? (
          <div className="text-center">
            <span className="material-symbols-outlined text-6xl text-outline mb-6 block">
              search_off
            </span>
            <p className="font-body text-secondary">No results found for “{query}”.</p>
            <p className="font-label text-sm text-secondary mt-4">Try different keywords.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            {products.map((product) => (
              <Link key={product.id} href={`/product/${product.id}`} className="group cursor-pointer">
                <div className="aspect-[3/4] overflow-hidden mb-6 relative">
                  <Image
                    src={product.image}
                    alt={product.title}
                    fill
                    sizes="(min-width: 768px) 22vw, 100vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                </div>
                <p className="font-label text-[10px] uppercase tracking-widest text-secondary mb-2">
                  {product.category}
                </p>
                <h3 className="font-headline text-lg font-bold mb-1">{product.title}</h3>
                <p className="font-body text-sm text-secondary">{formatCurrency(product.price)}</p>
              </Link>
            ))}
          </div>
        )}
      </div>
    </PageTemplate>
  );
}
