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

  const inputClasses =
    "w-full bg-bg-secondary border border-border rounded-xl px-4 py-3 text-text-primary placeholder:text-text-secondary/50 focus:outline-none focus:border-accent/50 focus:ring-2 focus:ring-accent/10 transition-all";

  return (
    <div className="min-h-screen flex items-center justify-center bg-bg-primary px-6">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <Palette size={36} className="text-accent mx-auto mb-3" />
          <h1 className="font-serif text-2xl text-text-primary">Welcome Back</h1>
          <p className="text-sm text-text-secondary mt-1">
            Sign in to manage your art
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="text-sm text-red-500 text-center bg-red-50 border border-red-200 rounded-xl px-4 py-3">
              {error}
            </div>
          )}

          <div>
            <label className="block text-sm text-text-secondary mb-1.5">
              Email
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={inputClasses}
              placeholder="your@email.com"
            />
          </div>

          <div>
            <label className="block text-sm text-text-secondary mb-1.5">
              Password
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={inputClasses}
              placeholder="Enter password"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center text-sm bg-accent text-white px-8 py-3.5 rounded-full hover:bg-accent-hover transition-colors duration-300 shadow-sm disabled:opacity-50"
          >
            {loading ? <LoadingSpinner size="sm" /> : "Sign In"}
          </button>
        </form>
      </div>
    </div>
  );
}
