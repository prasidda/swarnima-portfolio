import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-border bg-bg-secondary">
      <div className="mx-auto max-w-6xl px-6 lg:px-8 py-10">
        <div className="flex flex-col items-center gap-1.5 text-center">
          <Link
            href="/"
            className="font-serif text-xl text-text-primary hover:text-accent transition-colors"
          >
            The Adhikari Collection
          </Link>
          <p className="text-sm text-text-secondary">
            Made by Swarnima and Samana
          </p>
        </div>
      </div>
    </footer>
  );
}
