import Link from "next/link";
import { Plus } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import ArtworkTable from "@/components/admin/ArtworkTable";

export default async function AdminDashboard() {
  const supabase = await createClient();
  const { data: artworks } = await supabase
    .from("artworks")
    .select("*")
    .order("created_at", { ascending: false });

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-serif text-3xl tracking-wide">Dashboard</h1>
          <p className="text-sm text-text-secondary mt-1">
            {(artworks ?? []).length} artwork{(artworks ?? []).length !== 1 ? "s" : ""} in your collection
          </p>
        </div>
        <Link
          href="/admin/upload"
          className="flex items-center gap-2 text-sm tracking-[0.15em] uppercase bg-accent text-bg-primary px-6 py-3 hover:bg-accent-hover transition-colors duration-300"
        >
          <Plus size={18} />
          Upload
        </Link>
      </div>

      <ArtworkTable artworks={artworks ?? []} />
    </div>
  );
}
