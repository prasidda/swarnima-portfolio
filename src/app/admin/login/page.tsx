"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Palette } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import LoadingSpinner from "@/components/ui/LoadingSpinner";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const supabase = createClient();
    const { error: authError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (authError) {
      setError("Invalid email or password");
      setLoading(false);
      return;
    }

    router.push("/admin");
    router.refresh();
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-bg-primary px-6">
      <div className="w-full max-w-sm">
        <div className="text-center mb-10">
          <Palette size={40} className="text-accent mx-auto mb-4" />
          <h1 className="font-serif text-2xl tracking-[0.15em]">Admin</h1>
          <p className="text-sm text-text-secondary mt-2">
            Sign in to manage your portfolio
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {error && (
            <div className="text-sm text-red-400 text-center bg-red-400/10 border border-red-400/20 rounded-sm px-4 py-3">
              {error}
            </div>
          )}

          <div>
            <label className="block text-xs tracking-[0.2em] uppercase text-text-secondary mb-2">
              Email
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-bg-secondary border border-border rounded-sm px-4 py-3 text-text-primary placeholder:text-text-secondary/50 focus:outline-none focus:border-accent/50 transition-colors"
              placeholder="your@email.com"
            />
          </div>

          <div>
            <label className="block text-xs tracking-[0.2em] uppercase text-text-secondary mb-2">
              Password
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-bg-secondary border border-border rounded-sm px-4 py-3 text-text-primary placeholder:text-text-secondary/50 focus:outline-none focus:border-accent/50 transition-colors"
              placeholder="Enter password"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center text-sm tracking-[0.2em] uppercase bg-accent text-bg-primary px-8 py-3.5 hover:bg-accent-hover transition-colors duration-300 disabled:opacity-50"
          >
            {loading ? <LoadingSpinner size="sm" /> : "Sign In"}
          </button>
        </form>
      </div>
    </div>
  );
}
