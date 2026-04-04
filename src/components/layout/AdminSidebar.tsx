"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { LayoutDashboard, Upload, MessageCircle, LogOut, Palette } from "lucide-react";
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

  const handleSignOut = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    toast.success("Signed out");
    router.push("/admin/login");
  };

  return (
    <aside className="w-60 min-h-screen bg-bg-secondary border-r border-border flex flex-col">
      <div className="p-5 border-b border-border">
        <Link href="/" className="flex items-center gap-2.5 group">
          <Palette size={22} className="text-accent" />
          <span className="font-serif text-lg text-text-primary group-hover:text-accent transition-colors">
            Swarnima
          </span>
        </Link>
        <p className="text-xs text-text-secondary mt-1">
          Admin Panel
        </p>
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
    </aside>
  );
}
