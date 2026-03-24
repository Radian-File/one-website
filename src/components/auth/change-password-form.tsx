"use client";

import { useState } from "react";

export function ChangePasswordForm() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      const response = await fetch("/api/auth/change-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ currentPassword, newPassword, confirmPassword }),
      });

      const data = await response.json();

      if (!response.ok) {
        setMessage(typeof data?.error === "string" ? data.error : "Failed to update password.");
        return;
      }

      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
      setMessage("Password updated successfully.");
    } catch {
      setMessage("Failed to update password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <h3 className="font-headline text-xl font-bold">Security</h3>
      <div>
        <label className="block font-label text-[10px] uppercase tracking-widest text-secondary mb-2">
          Current Password
        </label>
        <input
          type="password"
          className="w-full bg-transparent border-t-0 border-x-0 border-b border-outline-variant/30 focus:border-primary focus:ring-0 transition-all py-3 px-0"
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
          required
          minLength={6}
        />
      </div>
      <div>
        <label className="block font-label text-[10px] uppercase tracking-widest text-secondary mb-2">
          New Password
        </label>
        <input
          type="password"
          className="w-full bg-transparent border-t-0 border-x-0 border-b border-outline-variant/30 focus:border-primary focus:ring-0 transition-all py-3 px-0"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          required
          minLength={6}
        />
      </div>
      <div>
        <label className="block font-label text-[10px] uppercase tracking-widest text-secondary mb-2">
          Confirm New Password
        </label>
        <input
          type="password"
          className="w-full bg-transparent border-t-0 border-x-0 border-b border-outline-variant/30 focus:border-primary focus:ring-0 transition-all py-3 px-0"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
          minLength={6}
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-inverse-surface text-background py-4 font-label text-xs uppercase tracking-[0.2rem] hover:bg-primary disabled:opacity-60 transition-colors"
      >
        {loading ? "Updating..." : "Update Password"}
      </button>

      {message && <p className="text-sm text-secondary">{message}</p>}
    </form>
  );
}
