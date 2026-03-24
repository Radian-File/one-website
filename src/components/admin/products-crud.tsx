"use client";

import { useEffect, useMemo, useState } from "react";

function formatCurrency(value: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);
}

type Product = {
  id: string;
  title: string;
  category: string;
  price: number;
  description: string;
  image: string;
};

type FormState = {
  title: string;
  category: string;
  price: string;
  description: string;
  image: string;
};

const initialForm: FormState = {
  title: "",
  category: "",
  price: "",
  description: "",
  image: "",
};

export function ProductsCrud() {
  const [products, setProducts] = useState<Product[]>([]);
  const [form, setForm] = useState<FormState>(initialForm);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const totalProducts = useMemo(() => products.length, [products]);

  const loadProducts = async () => {
    const response = await fetch("/api/admin/products", { cache: "no-store" });
    const data = await response.json();

    if (!response.ok) {
      setMessage("Failed to load products");
      return;
    }

    setProducts(data.products ?? []);
  };

  useEffect(() => {
    void loadProducts();
  }, []);

  const resetForm = () => {
    setForm(initialForm);
    setEditingId(null);
  };

  const submitForm = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setMessage(null);

    const payload = {
      ...form,
      price: Number(form.price),
    };

    const endpoint = editingId
      ? `/api/admin/products/${editingId}`
      : "/api/admin/products";
    const method = editingId ? "PATCH" : "POST";

    try {
      const response = await fetch(endpoint, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) {
        setMessage(
          typeof data?.error === "string"
            ? data.error
            : editingId
              ? "Failed to update product"
              : "Failed to create product",
        );
        return;
      }

      setMessage(editingId ? "Product updated" : "Product created");
      resetForm();
      await loadProducts();
    } catch {
      setMessage("Request failed");
    } finally {
      setLoading(false);
    }
  };

  const startEdit = (product: Product) => {
    setEditingId(product.id);
    setForm({
      title: product.title,
      category: product.category,
      price: String(product.price),
      description: product.description,
      image: product.image,
    });
    setMessage(null);
  };

  const deleteProduct = async (id: string) => {
    if (!confirm("Delete this product?")) return;

    setLoading(true);
    setMessage(null);
    try {
      const response = await fetch(`/api/admin/products/${id}`, {
        method: "DELETE",
      });
      const data = await response.json();

      if (!response.ok) {
        setMessage(typeof data?.error === "string" ? data.error : "Failed to delete product");
        return;
      }

      setMessage("Product deleted");
      if (editingId === id) {
        resetForm();
      }
      await loadProducts();
    } catch {
      setMessage("Request failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto space-y-10">
      <section className="bg-surface-container-low p-8 md:p-10 animate-fade-up">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="font-headline text-3xl font-bold">Product Manager</h2>
            <p className="text-secondary mt-2">Total Products: {totalProducts}</p>
          </div>
          {editingId && (
            <button
              type="button"
              onClick={resetForm}
              className="border border-outline-variant/40 px-4 py-2 text-xs uppercase tracking-widest"
            >
              Cancel Edit
            </button>
          )}
        </div>

        <form className="grid grid-cols-1 md:grid-cols-2 gap-6" onSubmit={submitForm}>
          <div>
            <label className="block font-label text-[10px] uppercase tracking-widest text-secondary mb-2">
              Title
            </label>
            <input
              value={form.title}
              onChange={(e) => setForm((prev) => ({ ...prev, title: e.target.value }))}
              className="w-full border border-outline-variant/30 px-4 py-3 bg-surface-container-lowest"
              required
            />
          </div>
          <div>
            <label className="block font-label text-[10px] uppercase tracking-widest text-secondary mb-2">
              Category
            </label>
            <input
              value={form.category}
              onChange={(e) => setForm((prev) => ({ ...prev, category: e.target.value }))}
              className="w-full border border-outline-variant/30 px-4 py-3 bg-surface-container-lowest"
              required
            />
          </div>
          <div>
            <label className="block font-label text-[10px] uppercase tracking-widest text-secondary mb-2">
              Price (USD)
            </label>
            <input
              type="number"
              min={1}
              value={form.price}
              onChange={(e) => setForm((prev) => ({ ...prev, price: e.target.value }))}
              className="w-full border border-outline-variant/30 px-4 py-3 bg-surface-container-lowest"
              required
            />
          </div>
          <div>
            <label className="block font-label text-[10px] uppercase tracking-widest text-secondary mb-2">
              Image URL
            </label>
            <input
              type="url"
              value={form.image}
              onChange={(e) => setForm((prev) => ({ ...prev, image: e.target.value }))}
              className="w-full border border-outline-variant/30 px-4 py-3 bg-surface-container-lowest"
              required
            />
          </div>
          <div className="md:col-span-2">
            <label className="block font-label text-[10px] uppercase tracking-widest text-secondary mb-2">
              Description
            </label>
            <textarea
              value={form.description}
              onChange={(e) => setForm((prev) => ({ ...prev, description: e.target.value }))}
              rows={4}
              className="w-full border border-outline-variant/30 px-4 py-3 bg-surface-container-lowest"
              required
            />
          </div>
          <div className="md:col-span-2 flex items-center gap-4">
            <button
              type="submit"
              disabled={loading}
              className="bg-inverse-surface text-background px-8 py-3 text-xs uppercase tracking-[0.2rem] disabled:opacity-60"
            >
              {loading ? "Saving..." : editingId ? "Update Product" : "Create Product"}
            </button>
            {message && <p className="text-sm text-secondary">{message}</p>}
          </div>
        </form>
      </section>

      <section className="bg-surface-container-low p-8 md:p-10 animate-fade-up anim-delay-100">
        <h3 className="font-headline text-2xl font-bold mb-6">Existing Products</h3>

        <div className="overflow-auto">
          <table className="w-full min-w-[900px] text-left">
            <thead>
              <tr className="border-b border-outline-variant/30">
                <th className="py-3 pr-4 font-label text-[10px] uppercase tracking-widest text-secondary">Title</th>
                <th className="py-3 pr-4 font-label text-[10px] uppercase tracking-widest text-secondary">Category</th>
                <th className="py-3 pr-4 font-label text-[10px] uppercase tracking-widest text-secondary">Price</th>
                <th className="py-3 pr-4 font-label text-[10px] uppercase tracking-widest text-secondary">ID</th>
                <th className="py-3 pr-4 font-label text-[10px] uppercase tracking-widest text-secondary">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id} className="border-b border-outline-variant/15">
                  <td className="py-4 pr-4 font-headline text-base">{product.title}</td>
                  <td className="py-4 pr-4 text-secondary">{product.category}</td>
                  <td className="py-4 pr-4">{formatCurrency(product.price)}</td>
                  <td className="py-4 pr-4 text-xs text-secondary">{product.id}</td>
                  <td className="py-4 pr-4">
                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={() => startEdit(product)}
                        className="border border-outline-variant/40 px-3 py-1 text-xs uppercase tracking-widest"
                      >
                        Edit
                      </button>
                      <button
                        type="button"
                        onClick={() => deleteProduct(product.id)}
                        className="border border-error/40 text-error px-3 py-1 text-xs uppercase tracking-widest"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
