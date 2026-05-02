import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import AdminSidebar from "@/components/layout/AdminSidebar";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      redirect("/admin/login");
    }
  } catch {
    redirect("/admin/login");
  }

  return (
    <div className="md:flex min-h-screen bg-bg-primary">
      <AdminSidebar />
      <main className="flex-1 p-4 sm:p-6 md:p-8 overflow-auto">{children}</main>
    </div>
  );
}
