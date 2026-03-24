"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type AuthMode = "login" | "register";

export function AuthForm() {
  const router = useRouter();
  const [mode, setMode] = useState<AuthMode>("login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(true);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setMessage(null);

    const endpoint = mode === "login" ? "/api/auth/login" : "/api/auth/register";
    const payload =
      mode === "login"
        ? { email, password, remember }
        : { name, email, password, remember };

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) {
        const errorMessage =
          typeof data?.error === "string"
            ? data.error
            : mode === "login"
              ? "Login failed. Please check your credentials."
              : "Register failed. Please try another email.";
        setMessage(errorMessage);
        return;
      }

      router.replace("/");
      router.refresh();
    } catch {
      setMessage("Unable to process request right now. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-surface-container-low p-12">
        <div className="flex gap-3 mb-8">
          <button
            type="button"
            onClick={() => setMode("login")}
            className={`px-4 py-2 text-xs uppercase tracking-widest border ${
              mode === "login" ? "bg-inverse-surface text-background" : "border-outline-variant/40"
            }`}
          >
            Sign In
          </button>
          <button
            type="button"
            onClick={() => setMode("register")}
            className={`px-4 py-2 text-xs uppercase tracking-widest border ${
              mode === "register" ? "bg-inverse-surface text-background" : "border-outline-variant/40"
            }`}
          >
            Register
          </button>
        </div>

        <h2 className="font-headline text-2xl font-bold mb-8">
          {mode === "login" ? "Sign In" : "Create Account"}
        </h2>

        <form className="space-y-6" onSubmit={handleSubmit}>
          {mode === "register" && (
            <div>
              <label className="block font-label text-[10px] uppercase tracking-widest text-secondary mb-2">
                Name
              </label>
              <input
                type="text"
                className="w-full bg-transparent border-t-0 border-x-0 border-b border-outline-variant/30 focus:border-primary focus:ring-0 transition-all py-3 px-0"
                placeholder="Your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
          )}

          <div>
            <label className="block font-label text-[10px] uppercase tracking-widest text-secondary mb-2">
              Email
            </label>
            <input
              type="email"
              className="w-full bg-transparent border-t-0 border-x-0 border-b border-outline-variant/30 focus:border-primary focus:ring-0 transition-all py-3 px-0"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block font-label text-[10px] uppercase tracking-widest text-secondary mb-2">
              Password
            </label>
            <input
              type="password"
              className="w-full bg-transparent border-t-0 border-x-0 border-b border-outline-variant/30 focus:border-primary focus:ring-0 transition-all py-3 px-0"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
            />
          </div>
          <label className="flex items-center gap-3 text-sm text-secondary">
            <input
              type="checkbox"
              checked={remember}
              onChange={(e) => setRemember(e.target.checked)}
              className="h-4 w-4"
            />
            Remember me for 30 days
          </label>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-inverse-surface text-background py-5 font-label text-xs uppercase tracking-[0.3rem] hover:bg-primary disabled:opacity-60 transition-colors"
          >
            {loading
              ? mode === "login"
                ? "Signing In..."
                : "Creating..."
              : mode === "login"
                ? "Sign In"
                : "Register"}
          </button>
          {message && <p className="text-sm text-secondary">{message}</p>}
        </form>
      </div>
    </div>
  );
}
