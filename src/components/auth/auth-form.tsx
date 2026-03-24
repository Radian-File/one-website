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

      const role = data?.role as string | undefined;
      router.replace(role === "admin" ? "/admin" : "/");
      router.refresh();
    } catch {
      setMessage("Unable to process request right now. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md bg-surface-container-lowest border border-outline-variant/20 p-8 md:p-10 shadow-xl animate-fade-up anim-delay-100 hover-lift">
      <div className="mb-8">
        <p className="font-label text-[10px] uppercase tracking-[0.3rem] text-secondary mb-3">
          Welcome to Atelier
        </p>
        <h1 className="font-headline text-3xl md:text-4xl font-bold tracking-tight text-inverse-surface">
          {mode === "login" ? "Sign In" : "Create Account"}
        </h1>
      </div>

      <div className="grid grid-cols-2 gap-2 p-1 bg-surface-container mb-8">
        <button
          type="button"
          onClick={() => setMode("login")}
          className={`py-2.5 text-[11px] uppercase tracking-[0.18rem] transition-colors ${
            mode === "login"
              ? "bg-inverse-surface text-background"
              : "text-secondary hover:text-inverse-surface"
          }`}
        >
          Sign In
        </button>
        <button
          type="button"
          onClick={() => setMode("register")}
          className={`py-2.5 text-[11px] uppercase tracking-[0.18rem] transition-colors ${
            mode === "register"
              ? "bg-inverse-surface text-background"
              : "text-secondary hover:text-inverse-surface"
          }`}
        >
          Register
        </button>
      </div>

      <form className="space-y-5" onSubmit={handleSubmit}>
        {mode === "register" && (
          <div>
            <label className="block font-label text-[10px] uppercase tracking-[0.16rem] text-secondary mb-2">
              Name
            </label>
            <input
              type="text"
              className="w-full bg-transparent border-t-0 border-x-0 border-b border-outline-variant/35 focus:border-primary focus:ring-0 transition-all py-3 px-0"
              placeholder="Your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
        )}

        <div>
          <label className="block font-label text-[10px] uppercase tracking-[0.16rem] text-secondary mb-2">
            Email
          </label>
          <input
            type="email"
            className="w-full bg-transparent border-t-0 border-x-0 border-b border-outline-variant/35 focus:border-primary focus:ring-0 transition-all py-3 px-0"
            placeholder="your@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block font-label text-[10px] uppercase tracking-[0.16rem] text-secondary mb-2">
            Password
          </label>
          <input
            type="password"
            className="w-full bg-transparent border-t-0 border-x-0 border-b border-outline-variant/35 focus:border-primary focus:ring-0 transition-all py-3 px-0"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={6}
          />
        </div>

        <label className="flex items-center gap-3 text-sm text-secondary pt-1">
          <input
            type="checkbox"
            checked={remember}
            onChange={(e) => setRemember(e.target.checked)}
            className="h-4 w-4"
          />
          Keep me signed in
        </label>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-inverse-surface text-background py-4 font-label text-xs uppercase tracking-[0.3rem] hover:bg-primary disabled:opacity-60 transition-colors"
        >
          {loading
            ? mode === "login"
              ? "Signing In..."
              : "Creating..."
            : mode === "login"
              ? "Sign In"
              : "Create Account"}
        </button>

        {message && <p className="text-sm text-secondary text-center pt-1">{message}</p>}
      </form>
    </div>
  );
}
