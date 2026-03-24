"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

interface LogoutButtonProps {
  label?: string;
}

export function LogoutButton({ label = "Logout" }: LogoutButtonProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleLogout = async () => {
    setLoading(true);
    try {
      await fetch("/api/auth/logout", { method: "POST" });
      router.replace("/auth");
      router.refresh();
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      type="button"
      onClick={handleLogout}
      disabled={loading}
      className="w-full bg-inverse-surface text-background py-5 font-label text-xs uppercase tracking-[0.3rem] hover:bg-primary disabled:opacity-60 transition-colors"
    >
      {loading ? "Signing Out..." : label}
    </button>
  );
}
