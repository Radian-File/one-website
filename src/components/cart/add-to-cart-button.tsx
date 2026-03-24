"use client";

import { useState } from "react";

interface AddToCartButtonProps {
  productId: string;
}

export function AddToCartButton({ productId }: AddToCartButtonProps) {
  const [loading, setLoading] = useState(false);

  const handleAddToCart = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/cart", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId, quantity: 1 }),
      });

      if (!response.ok) {
        throw new Error("Failed to add item");
      }

      alert("Added to bag");
    } catch {
      alert("Failed to add item to bag");
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleAddToCart}
      disabled={loading}
      className="w-full bg-primary hover:bg-primary-dim disabled:opacity-60 text-on-primary px-10 py-5 font-label text-xs uppercase tracking-widest transition-all"
    >
      {loading ? "Adding..." : "Add to Bag"}
    </button>
  );
}
