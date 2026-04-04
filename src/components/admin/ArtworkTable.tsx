"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import toast from "react-hot-toast";
import { Pencil, Trash2, Star, StarOff } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { Artwork } from "@/lib/types";
import { getImageUrl } from "@/lib/constants";

export default function ArtworkTable({ artworks }: { artworks: Artwork[] }) {
  const router = useRouter();
  const [deleting, setDeleting] = useState<string | null>(null);

  const toggleFeatured = async (artwork: Artwork) => {
    const supabase = createClient();
    const { error } = await supabase
      .from("artworks")
      .update({ is_featured: !artwork.is_featured })
      .eq("id", artwork.id);

    if (error) {
      toast.error("Failed to update");
    } else {
      toast.success(
        artwork.is_featured ? "Removed from featured" : "Added to featured"
      );
      router.refresh();
    }
  };

  const toggleSold = async (artwork: Artwork) => {
    const supabase = createClient();
    const { error } = await supabase
      .from("artworks")
      .update({ is_sold: !artwork.is_sold })
      .eq("id", artwork.id);

    if (error) {
      toast.error("Failed to update");
    } else {
      toast.success(artwork.is_sold ? "Marked as available" : "Marked as sold");
      router.refresh();
    }
  };

  const handleDelete = async (artwork: Artwork) => {
    if (!confirm(`Delete "${artwork.title}"? This cannot be undone.`)) return;

    setDeleting(artwork.id);
    const supabase = createClient();

    try {
      // Delete image from storage
      await supabase.storage.from("artworks").remove([artwork.image_path]);

      // Delete row from database
      const { error } = await supabase
        .from("artworks")
        .delete()
        .eq("id", artwork.id);

      if (error) throw error;

      toast.success("Artwork deleted");
      router.refresh();
    } catch {
      toast.error("Failed to delete artwork");
    } finally {
      setDeleting(null);
    }
  };

  if (artworks.length === 0) {
    return (
      <div className="text-center py-16 bg-bg-secondary rounded-xl border border-border">
        <p className="text-text-secondary mb-4">No artworks uploaded yet.</p>
        <Link
          href="/admin/upload"
          className="text-sm text-accent hover:text-accent-hover transition-colors"
        >
          Upload your first artwork
        </Link>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b border-border text-left">
            <th className="pb-3 text-xs tracking-[0.2em] uppercase text-text-secondary font-normal">
              Artwork
            </th>
            <th className="pb-3 text-xs tracking-[0.2em] uppercase text-text-secondary font-normal">
              Category
            </th>
            <th className="pb-3 text-xs tracking-[0.2em] uppercase text-text-secondary font-normal">
              Price
            </th>
            <th className="pb-3 text-xs tracking-[0.2em] uppercase text-text-secondary font-normal text-center">
              Featured
            </th>
            <th className="pb-3 text-xs tracking-[0.2em] uppercase text-text-secondary font-normal text-center">
              Status
            </th>
            <th className="pb-3 text-xs tracking-[0.2em] uppercase text-text-secondary font-normal text-right">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {artworks.map((artwork) => (
            <tr
              key={artwork.id}
              className="border-b border-border/50 hover:bg-bg-tertiary/50 transition-colors"
            >
              <td className="py-4 pr-4">
                <div className="flex items-center gap-4">
                  <div className="relative w-12 h-16 bg-bg-tertiary rounded-sm overflow-hidden shrink-0">
                    <Image
                      src={getImageUrl(artwork.image_path)}
                      alt={artwork.title}
                      fill
                      className="object-cover"
                      sizes="48px"
                    />
                  </div>
                  <span className="font-serif text-sm">{artwork.title}</span>
                </div>
              </td>
              <td className="py-4 pr-4">
                <span className="text-sm text-text-secondary">
                  {artwork.category ?? "—"}
                </span>
              </td>
              <td className="py-4 pr-4">
                <span className="text-sm text-text-secondary">
                  {artwork.price ? `$${artwork.price.toLocaleString()}` : "—"}
                </span>
              </td>
              <td className="py-4 text-center">
                <button
                  onClick={() => toggleFeatured(artwork)}
                  className="text-text-secondary hover:text-accent transition-colors"
                  title={
                    artwork.is_featured
                      ? "Remove from featured"
                      : "Add to featured"
                  }
                >
                  {artwork.is_featured ? (
                    <Star size={16} className="fill-accent text-accent" />
                  ) : (
                    <StarOff size={16} />
                  )}
                </button>
              </td>
              <td className="py-4 text-center">
                <button
                  onClick={() => toggleSold(artwork)}
                  className={`text-xs tracking-[0.1em] uppercase px-3 py-1 rounded-full border transition-colors ${
                    artwork.is_sold
                      ? "border-accent/30 text-accent bg-accent/10"
                      : "border-border text-text-secondary hover:border-text-secondary"
                  }`}
                >
                  {artwork.is_sold ? "Sold" : "Available"}
                </button>
              </td>
              <td className="py-4 text-right">
                <div className="flex items-center justify-end gap-2">
                  <Link
                    href={`/admin/edit/${artwork.id}`}
                    className="p-2 text-text-secondary hover:text-text-primary transition-colors"
                    title="Edit"
                  >
                    <Pencil size={16} />
                  </Link>
                  <button
                    onClick={() => handleDelete(artwork)}
                    disabled={deleting === artwork.id}
                    className="p-2 text-text-secondary hover:text-red-400 transition-colors disabled:opacity-50"
                    title="Delete"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
