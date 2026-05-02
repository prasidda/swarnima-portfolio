"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Upload,
  MessageCircle,
  LogOut,
  Palette,
  Menu,
  X,
} from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { createClient } from "@/lib/supabase/client";
import toast from "react-hot-toast";

const adminLinks = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/upload", label: "Upload", icon: Upload },
  { href: "/admin/messages", label: "Messages", icon: MessageCircle },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);

  // Close drawer when route changes
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Lock scroll when drawer is open on mobile
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const handleSignOut = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    toast.success("Signed out");
    router.push("/admin/login");
  };

  const sidebarContent = (
    <>
      <div className="p-5 border-b border-border">
        <Link href="/" className="flex items-center gap-2.5 group">
          <Palette size={22} className="text-accent shrink-0" />
          <span className="font-serif text-base text-text-primary group-hover:text-accent transition-colors">
            The Adhikari Collection
          </span>
        </Link>
        <p className="text-xs text-text-secondary mt-1">Admin Panel</p>
      </div>

      <nav className="flex-1 p-3 flex flex-col gap-0.5">
        {adminLinks.map((link) => {
          const isActive = pathname === link.href;
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`flex items-center gap-2.5 px-3.5 py-2.5 rounded-lg text-sm transition-all duration-200 ${
                isActive
                  ? "bg-accent-light text-accent"
                  : "text-text-secondary hover:bg-bg-tertiary hover:text-text-primary"
              }`}
            >
              <link.icon size={17} />
              {link.label}
            </Link>
          );
        })}
      </nav>

      <div className="p-3 border-t border-border">
        <button
          onClick={handleSignOut}
          className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-lg text-sm text-text-secondary hover:bg-bg-tertiary hover:text-text-primary transition-all duration-200 w-full"
        >
          <LogOut size={17} />
          Sign Out
        </button>
      </div>
    </>
  );

  return (
    <>
      {/* Mobile top bar */}
      <div className="md:hidden sticky top-0 z-30 flex items-center justify-between bg-bg-secondary border-b border-border px-4 py-3">
        <button
          onClick={() => setOpen(true)}
          className="p-2 -ml-2 text-text-primary"
          aria-label="Open menu"
        >
          <Menu size={22} />
        </button>
        <Link
          href="/"
          className="flex items-center gap-2 font-serif text-sm text-text-primary"
        >
          <Palette size={16} className="text-accent" />
          The Adhikari Collection
        </Link>
        <span className="w-8" aria-hidden />
      </div>

      {/* Desktop sidebar */}
      <aside className="hidden md:flex w-60 min-h-screen bg-bg-secondary border-r border-border flex-col shrink-0">
        {sidebarContent}
      </aside>

      {/* Mobile drawer */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="md:hidden fixed inset-0 z-40 bg-black/40"
              onClick={() => setOpen(false)}
            />
            <motion.aside
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "tween", duration: 0.25, ease: "easeOut" }}
              className="md:hidden fixed top-0 left-0 z-50 h-full w-72 bg-bg-secondary border-r border-border flex flex-col shadow-xl"
            >
              <button
                onClick={() => setOpen(false)}
                className="absolute top-3 right-3 p-2 text-text-secondary hover:text-text-primary"
                aria-label="Close menu"
              >
                <X size={20} />
              </button>
              {sidebarContent}
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
