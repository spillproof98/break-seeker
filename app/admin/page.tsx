"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const ADMIN_KEY = "bs_admin_logged_in";
const ADMIN_PASSWORD = "admin"; // for demo

export default function AdminLoginPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (typeof window === "undefined") return;
    const loggedIn = window.localStorage.getItem(ADMIN_KEY) === "true";
    if (loggedIn) router.replace("/admin/dashboard");
  }, [router]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      if (typeof window !== "undefined") {
        window.localStorage.setItem(ADMIN_KEY, "true");
      }
      router.replace("/admin/dashboard");
    } else {
      setError("Incorrect password. Use 'admin' for this demo.");
    }
  };

  return (
    <div className="flex items-center justify-center">
      <div className="card w-full max-w-sm p-4">
        <h1 className="text-lg font-semibold text-slate-900">
          Admin sign in
        </h1>
        <p className="mt-1 text-xs text-slate-500">
          This is client-side only. Use password <span className="font-mono">admin</span>.
        </p>

        <form onSubmit={handleSubmit} className="mt-4 space-y-3 text-sm">
          <div>
            <label className="mb-1 block text-xs font-medium text-slate-700">
              Password
            </label>
            <input
              className="input"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="admin"
            />
          </div>
          {error && (
            <p className="text-xs text-red-600" role="alert">
              {error}
            </p>
          )}
          <button type="submit" className="btn-primary w-full">
            Continue
          </button>
        </form>
      </div>
    </div>
  );
}
