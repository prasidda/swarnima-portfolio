import Link from "next/link";
import { AtSign, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-border bg-bg-secondary">
      <div className="mx-auto max-w-6xl px-6 lg:px-8 py-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex flex-col items-center md:items-start gap-1.5">
            <Link
              href="/"
              className="font-serif text-xl text-text-primary hover:text-accent transition-colors"
            >
              Swarnima
            </Link>
            <p className="text-sm text-text-secondary flex items-center gap-1">
              Made by Swarnima
            </p>
          </div>

          <div className="flex items-center gap-5">
            <a
              href="https://www.instagram.com/_swarnima13/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-text-secondary hover:text-accent transition-colors duration-300"
              aria-label="Instagram"
            >
              <AtSign size={18} />
            </a>
            <a
              href="mailto:hello@swarnima.art"
              className="text-text-secondary hover:text-accent transition-colors duration-300"
              aria-label="Email"
            >
              <Mail size={18} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
