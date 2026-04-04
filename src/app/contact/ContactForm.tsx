"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { Send } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import toast from "react-hot-toast";
import PageTransition from "@/components/ui/PageTransition";
import LoadingSpinner from "@/components/ui/LoadingSpinner";

export default function ContactForm() {
  const searchParams = useSearchParams();
  const artworkId = searchParams.get("artwork");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const supabase = createClient();
      const { error } = await supabase.from("messages").insert({
        name,
        email,
        message,
        artwork_id: artworkId || null,
      });

      if (error) throw error;
      setSubmitted(true);
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const inputClasses =
    "w-full bg-bg-secondary border border-border rounded-xl px-4 py-3 text-text-primary placeholder:text-text-secondary/50 focus:outline-none focus:border-accent/50 focus:ring-2 focus:ring-accent/10 transition-all";

  return (
    <PageTransition>
      <div className="text-center mb-14">
        <h1 className="font-serif text-4xl sm:text-5xl text-text-primary mb-3">
          Say Hello
        </h1>
        <p className="text-text-secondary">
          Want a piece? Have a question? Just want to chat about art? Drop me a message!
        </p>
      </div>

      {submitted ? (
        <div className="text-center py-16">
          <div className="w-16 h-16 rounded-full bg-accent-light flex items-center justify-center mx-auto mb-6">
            <Send size={24} className="text-accent" />
          </div>
          <h2 className="font-serif text-2xl text-text-primary mb-2">Got it!</h2>
          <p className="text-text-secondary">
            Thanks for reaching out — I&apos;ll get back to you as soon as I can.
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm text-text-secondary mb-1.5">
              Your Name
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={inputClasses}
              placeholder="What should I call you?"
            />
          </div>

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
              Message
            </label>
            <textarea
              required
              rows={5}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className={`${inputClasses} resize-none`}
              placeholder={
                artworkId
                  ? "I love this piece! Tell me more..."
                  : "What's on your mind?"
              }
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center text-sm bg-accent text-white px-8 py-3.5 rounded-full hover:bg-accent-hover transition-colors duration-300 shadow-sm disabled:opacity-50"
          >
            {loading ? <LoadingSpinner size="sm" /> : "Send Message"}
          </button>
        </form>
      )}
    </PageTransition>
  );
}
