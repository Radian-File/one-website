"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useMemo, useState } from "react";
import { getSafeImageSrc } from "@/lib/image-utils";

interface CartItem {
  id: string;
  productId: string;
  quantity: number;
  lineTotal: number;
  product: {
    id: string;
    title: string;
    image: string;
    category: string;
    price: number;
  };
}

interface CartResponse {
  cart: {
    items: CartItem[];
    subtotal: number;
  };
}

function formatCurrency(value: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);
}

export function CartView() {
  const [items, setItems] = useState<CartItem[]>([]);
  const [subtotal, setSubtotal] = useState(0);
  const [loading, setLoading] = useState(true);

  const loadCart = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/cart", { cache: "no-store" });
      const data = (await response.json()) as CartResponse;
      setItems(data.cart.items ?? []);
      setSubtotal(data.cart.subtotal ?? 0);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void loadCart();
  }, [loadCart]);

  const totalItems = useMemo(() => items.reduce((acc, item) => acc + item.quantity, 0), [items]);

  const updateQuantity = async (productId: string, quantity: number) => {
    await fetch(`/api/cart/items/${productId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ quantity }),
    });

    await loadCart();
  };

  const removeItem = async (productId: string) => {
    await fetch(`/api/cart/items/${productId}`, { method: "DELETE" });
    await loadCart();
  };

  if (loading) {
    return <p className="text-center text-secondary">Loading bag...</p>;
  }

  if (items.length === 0) {
    return (
      <div className="max-w-3xl mx-auto text-center">
        <span className="material-symbols-outlined text-6xl text-outline mb-6 block">
          shopping_bag
        </span>
        <p className="font-body text-secondary text-lg mb-12">Your bag is currently empty</p>
        <Link
          href="/objects"
          className="inline-block bg-primary hover:bg-primary-dim text-on-primary px-10 py-5 font-label text-xs uppercase tracking-widest transition-all"
        >
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-10">
      <div className="lg:col-span-2 space-y-6">
        {items.map((item) => (
          <div key={item.id} className="grid grid-cols-[120px_1fr] gap-6 border-b border-outline-variant/30 pb-6">
            <div className="relative h-[150px] w-[120px] bg-surface-container-low">
              <Image
                src={getSafeImageSrc(item.product.image)}
                alt={item.product.title}
                fill
                sizes="120px"
                className="object-cover"
              />
            </div>
            <div>
              <p className="font-label text-[10px] uppercase tracking-widest text-secondary mb-2">
                {item.product.category}
              </p>
              <h3 className="font-headline text-xl font-bold mb-2">{item.product.title}</h3>
              <p className="text-secondary mb-4">{formatCurrency(item.product.price)}</p>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => updateQuantity(item.productId, Math.max(1, item.quantity - 1))}
                  className="px-3 py-1 border border-outline-variant/40"
                >
                  -
                </button>
                <span>{item.quantity}</span>
                <button
                  onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                  className="px-3 py-1 border border-outline-variant/40"
                >
                  +
                </button>
                <button
                  onClick={() => removeItem(item.productId)}
                  className="ml-6 text-sm text-error hover:underline"
                >
                  Remove
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <aside className="bg-surface-container-low p-8 h-fit">
        <h2 className="font-headline text-2xl font-bold mb-6">Summary</h2>
        <div className="space-y-3 text-sm mb-6">
          <div className="flex justify-between">
            <span>Items</span>
            <span>{totalItems}</span>
          </div>
          <div className="flex justify-between">
            <span>Subtotal</span>
            <span>{formatCurrency(subtotal)}</span>
          </div>
        </div>
        <button className="w-full bg-inverse-surface text-background py-4 font-label text-xs uppercase tracking-[0.2rem]">
          Checkout
        </button>
      </aside>
    </div>
  );
}
