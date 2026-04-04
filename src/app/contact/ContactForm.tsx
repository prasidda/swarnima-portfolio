"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { Send } from "lucide-react";
import PageTransition from "@/components/ui/PageTransition";

export default function ContactForm() {
  const searchParams = useSearchParams();
  const artworkId = searchParams.get("artwork");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Future: send to Supabase or email service
    setSubmitted(true);
  };

  return (
    <PageTransition>
      <div className="text-center mb-16">
        <h1 className="font-serif text-4xl sm:text-5xl tracking-[0.1em] mb-4">
          Get in Touch
        </h1>
        <div className="w-12 h-px bg-accent mx-auto mb-4" />
        <p className="text-text-secondary">
          Interested in a piece or have a question? I&apos;d love to hear from
          you.
        </p>
      </div>

      {submitted ? (
        <div className="text-center py-16">
          <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-6">
            <Send size={24} className="text-accent" />
          </div>
          <h2 className="font-serif text-2xl mb-3">Message Sent</h2>
          <p className="text-text-secondary">
            Thank you for reaching out. I&apos;ll get back to you soon.
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-xs tracking-[0.2em] uppercase text-text-secondary mb-2">
              Name
            </label>
            <input
              type="text"
              required
              className="w-full bg-bg-secondary border border-border rounded-sm px-4 py-3 text-text-primary placeholder:text-text-secondary/50 focus:outline-none focus:border-accent/50 transition-colors"
              placeholder="Your name"
            />
          </div>

          <div>
            <label className="block text-xs tracking-[0.2em] uppercase text-text-secondary mb-2">
              Email
            </label>
            <input
              type="email"
              required
              className="w-full bg-bg-secondary border border-border rounded-sm px-4 py-3 text-text-primary placeholder:text-text-secondary/50 focus:outline-none focus:border-accent/50 transition-colors"
              placeholder="your@email.com"
            />
          </div>

          {artworkId && (
            <input type="hidden" name="artwork_id" value={artworkId} />
          )}

          <div>
            <label className="block text-xs tracking-[0.2em] uppercase text-text-secondary mb-2">
              Message
            </label>
            <textarea
              required
              rows={5}
              className="w-full bg-bg-secondary border border-border rounded-sm px-4 py-3 text-text-primary placeholder:text-text-secondary/50 focus:outline-none focus:border-accent/50 transition-colors resize-none"
              placeholder={
                artworkId
                  ? "I'm interested in this piece..."
                  : "Tell me about your inquiry..."
              }
            />
          </div>

          <button
            type="submit"
            className="w-full text-sm tracking-[0.2em] uppercase bg-accent text-bg-primary px-8 py-4 hover:bg-accent-hover transition-colors duration-300"
          >
            Send Message
          </button>
        </form>
      )}
    </PageTransition>
  );
}
