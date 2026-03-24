import { notFound } from "next/navigation";
import { PageTemplate } from "@/components/layout/page-template";
import Image from "next/image";
import Link from "next/link";
import { AddToCartButton } from "@/components/cart/add-to-cart-button";
import { prisma } from "@/lib/prisma";
import { formatCurrency } from "@/lib/cart-utils";

export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const product = await prisma.product.findUnique({ where: { id } });

  if (!product) {
    notFound();
  }

  return (
    <PageTemplate>
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          <div className="aspect-square relative bg-surface-container-low">
            <Image
              src={product.image}
              alt={product.title}
              fill
              sizes="(min-width: 768px) 50vw, 100vw"
              className="object-cover"
            />
          </div>
          <div className="flex flex-col justify-center">
            <p className="font-label text-[10px] uppercase tracking-widest text-secondary mb-4">
              {product.category}
            </p>
            <h1 className="font-headline text-5xl font-bold mb-6">{product.title}</h1>
            <p className="font-headline text-3xl mb-12">{formatCurrency(product.price)}</p>
            <p className="font-body text-secondary leading-relaxed mb-12">{product.description}</p>
            <div className="space-y-4">
              <AddToCartButton productId={product.id} />
              <Link
                href="/objects"
                className="block text-center border border-outline-variant/30 hover:bg-surface-container-lowest text-inverse-surface px-10 py-5 font-label text-xs uppercase tracking-widest transition-all"
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    </PageTemplate>
  );
}
