import { PageTemplate } from "@/components/layout/page-template";
import Image from "next/image";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { formatCurrency } from "@/lib/cart-utils";
import { getSafeImageSrc } from "@/lib/image-utils";

export default async function ObjectsPage() {
  const products = await prisma.product.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <PageTemplate title="All Objects" subtitle="The Archive">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-12 max-w-7xl mx-auto">
        {products.map((product) => (
          <Link
            key={product.id}
            href={`/product/${product.id}`}
            className="group cursor-pointer"
          >
            <div className="aspect-[3/4] overflow-hidden mb-6 relative">
              <Image
                src={getSafeImageSrc(product.image)}
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
    </PageTemplate>
  );
}
