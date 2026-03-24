"use client";

import { useEffect, useState } from "react";

type Seller = {
  id: string;
  email: string;
  displayName: string | null;
  createdAt: string;
};

export function SellerAccountsManager() {
  const [sellers, setSellers] = useState<Seller[]>([]);
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember] = useState(true);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const loadSellers = async () => {
    const response = await fetch("/api/admin/sellers", { cache: "no-store" });
    const data = await response.json();

    if (!response.ok) {
      setMessage("Failed to load seller accounts");
      return;
    }

    setSellers(data.sellers ?? []);
  };

  useEffect(() => {
    void loadSellers();
  }, []);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      const response = await fetch("/api/admin/sellers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ displayName, email, password, remember }),
      });

      const data = await response.json();
      if (!response.ok) {
        setMessage(typeof data?.error === "string" ? data.error : "Failed to create seller");
        return;
      }

      setDisplayName("");
      setEmail("");
      setPassword("");
      setMessage("Seller account created");
      await loadSellers();
    } catch {
      setMessage("Request failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="bg-surface-container-low p-8 md:p-10 animate-fade-up">
      <h2 className="font-headline text-3xl font-bold mb-2">Seller Accounts</h2>
      <p className="text-secondary mb-8">Create seller logins for catalog management.</p>

      <form className="grid grid-cols-1 md:grid-cols-3 gap-6" onSubmit={handleSubmit}>
        <div>
          <label className="block font-label text-[10px] uppercase tracking-widest text-secondary mb-2">
            Seller Name
          </label>
          <input
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
            className="w-full border border-outline-variant/30 px-4 py-3 bg-surface-container-lowest"
            placeholder="My Store"
          />
        </div>
        <div>
          <label className="block font-label text-[10px] uppercase tracking-widest text-secondary mb-2">
            Seller Email
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border border-outline-variant/30 px-4 py-3 bg-surface-container-lowest"
            required
          />
        </div>
        <div>
          <label className="block font-label text-[10px] uppercase tracking-widest text-secondary mb-2">
            Temporary Password
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border border-outline-variant/30 px-4 py-3 bg-surface-container-lowest"
            required
            minLength={6}
          />
        </div>

        <div className="md:col-span-3 flex items-center gap-4">
          <button
            type="submit"
            disabled={loading}
            className="bg-inverse-surface text-background px-8 py-3 text-xs uppercase tracking-[0.2rem] disabled:opacity-60"
          >
            {loading ? "Creating..." : "Create Seller Account"}
          </button>
          {message && <p className="text-sm text-secondary">{message}</p>}
        </div>
      </form>

      <div className="mt-10 overflow-auto">
        <table className="w-full min-w-[700px] text-left">
          <thead>
            <tr className="border-b border-outline-variant/30">
              <th className="py-3 pr-4 font-label text-[10px] uppercase tracking-widest text-secondary">Seller</th>
              <th className="py-3 pr-4 font-label text-[10px] uppercase tracking-widest text-secondary">Email</th>
              <th className="py-3 pr-4 font-label text-[10px] uppercase tracking-widest text-secondary">Created</th>
            </tr>
          </thead>
          <tbody>
            {sellers.map((seller) => (
              <tr key={seller.id} className="border-b border-outline-variant/15">
                <td className="py-4 pr-4 font-headline text-base">{seller.displayName ?? "Unnamed Seller"}</td>
                <td className="py-4 pr-4 text-secondary">{seller.email}</td>
                <td className="py-4 pr-4 text-secondary text-sm">
                  {new Date(seller.createdAt).toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
