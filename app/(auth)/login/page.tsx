"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (res.ok) {
        router.push("/dashboard");
      } else {
        setError("Invalid email or password.");
      }
    } catch {
      setError("Unable to reach the server. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-5xl rounded-3xl bg-white shadow-2xl shadow-black/20 overflow-hidden">
      <div className="grid md:grid-cols-2">
        <div className="relative hidden md:block min-h-[520px]">
          <Image
            src="/logins.png"
            alt="Login"
            fill
            className="object-cover object-[80%_center]"
            sizes="(min-width: 768px) 50vw, 100vw"
            priority
          />
          <div className="absolute inset-0 bg-black/20" />
        </div>

        <div className="p-8 sm:p-10 md:p-12">
          <div className="text-center md:text-left mb-8">
            <div className="h-14 w-14 bg-primary rounded-xl flex items-center justify-center md:mx-0 mx-auto mb-4 shadow-lg">
              <svg
                className="w-7 h-7 text-accent"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                />
              </svg>
            </div>
            <h1 className="text-2xl sm:text-3xl font-semibold text-textPrimary">
              SecureGuard Admin
            </h1>
            <p className="text-textSecondary text-sm sm:text-base mt-2">
              Sign in to access your platform
            </p>
          </div>

          <div className="mb-1 text-xs text-textPrimary">
            <p>Email: admin@ug.edu.gh</p>
            <p>Password: admin123</p>
          </div>

          {error && (
            <div className="mb-4 p-3 bg-error/10 border border-error/20 rounded-lg text-error text-sm text-center">
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-textPrimary">
                Institutional Email
              </label>
              <div className="mt-1.5">
                <input
                  id="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-2.5 border border-borderLight rounded-lg text-textPrimary focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                  placeholder="admin@ug.edu.gh"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-textPrimary">
                Password
              </label>
              <div className="mt-1.5">
                <input
                  id="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-2.5 border border-borderLight rounded-lg text-textPrimary focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                  placeholder="********"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center py-2.5 px-4 rounded-lg shadow-sm text-sm font-semibold text-white bg-primary hover:bg-primary-dark transition-colors disabled:opacity-60"
              >
                {loading ? "Signing in..." : "Sign in securely"}
              </button>
            </div>
          </form>

          <div className="mt-6 text-center md:text-left">
            <p className="text-xs text-textSecondary">
              Protected by University of Ghana IT Security
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
