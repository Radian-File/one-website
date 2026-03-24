"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";

interface CartItem {
  quantity: number;
}

export function Navbar() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  useEffect(() => {
    let mounted = true;

    const loadCart = async () => {
      try {
        const response = await fetch("/api/cart", { cache: "no-store" });
        if (!response.ok) return;

        const data = (await response.json()) as { cart?: { items?: CartItem[] } };
        if (mounted) {
          setCartItems(data.cart?.items ?? []);
        }
      } catch {
        // ignore non-critical navbar cart fetch errors
      }
    };

    void loadCart();
    return () => {
      mounted = false;
    };
  }, []);

  const cartCount = useMemo(
    () => cartItems.reduce((total, item) => total + item.quantity, 0),
    [cartItems],
  );

  const submitSearch = () => {
    const query = searchQuery.trim();
    if (!query) return;
    router.push(`/search?q=${encodeURIComponent(query)}`);
  };

  return (
    <nav className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-xl">
      <div className="flex justify-between items-center w-full px-12 py-6 max-w-full">
        <div className="flex items-center gap-12">
          <Link
            href="/"
            className="text-2xl font-bold tracking-tighter text-inverse-surface font-headline"
          >
            ATELIER
          </Link>
          <div className="hidden md:flex gap-8 items-center">
            <Link
              href="/collections"
              className="font-headline tracking-tight text-inverse-surface border-b-2 border-primary pb-1"
            >
              Collections
            </Link>
            <Link
              href="/objects"
              className="font-headline tracking-tight text-secondary hover:text-inverse-surface transition-colors"
            >
              Objects
            </Link>
            <Link
              href="/editorial"
              className="font-headline tracking-tight text-secondary hover:text-inverse-surface transition-colors"
            >
              Editorial
            </Link>
            <Link
              href="/archive"
              className="font-headline tracking-tight text-secondary hover:text-inverse-surface transition-colors"
            >
              Archive
            </Link>
          </div>
        </div>
        <div className="flex items-center gap-6">
          <div className="hidden lg:flex items-center bg-surface-container-high px-4 py-2">
            <span className="material-symbols-outlined text-outline text-sm">search</span>
            <input
              className="bg-transparent border-none focus:ring-0 text-sm font-label w-48"
              placeholder="Search the archive..."
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  submitSearch();
                }
              }}
            />
          </div>
          <Link
            href="/cart"
            className="relative text-secondary hover:text-inverse-surface transition-all active:scale-95 duration-200"
          >
            <span className="material-symbols-outlined">shopping_bag</span>
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 min-w-5 h-5 px-1 rounded-full bg-primary text-on-primary text-[10px] font-bold flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </Link>
          <Link
            href="/account"
            className="text-secondary hover:text-inverse-surface transition-all active:scale-95 duration-200"
          >
            <span className="material-symbols-outlined">person</span>
          </Link>
        </div>
      </div>
      <div className="bg-surface-container-low h-[1px] w-full"></div>
    </nav>
  );
}
