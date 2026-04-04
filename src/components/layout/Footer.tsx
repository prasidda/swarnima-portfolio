import Link from "next/link";
import { AtSign, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-border bg-bg-primary">
      <div className="mx-auto max-w-7xl px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex flex-col items-center md:items-start gap-2">
            <Link
              href="/"
              className="font-serif text-lg tracking-[0.2em] text-text-primary hover:text-accent transition-colors"
            >
              SWARNIMA
            </Link>
            <p className="text-sm text-text-secondary">
              &copy; {new Date().getFullYear()} Swarnima. All rights reserved.
            </p>
          </div>

          <div className="flex items-center gap-6">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-text-secondary hover:text-accent transition-colors duration-300"
              aria-label="Instagram"
            >
              <AtSign size={20} />
            </a>
            <a
              href="mailto:hello@swarnima.art"
              className="text-text-secondary hover:text-accent transition-colors duration-300"
              aria-label="Email"
            >
              <Mail size={20} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
