import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import ArtworkForm from "@/components/admin/ArtworkForm";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function EditArtworkPage({ params }: Props) {
  try {
    const { id } = await params;
    const supabase = await createClient();
    const { data: artwork } = await supabase
      .from("artworks")
      .select("*")
      .eq("id", id)
      .single();

    if (!artwork) notFound();

    return (
      <div>
        <div className="mb-8">
          <h1 className="font-serif text-3xl tracking-wide">Edit Artwork</h1>
          <p className="text-sm text-text-secondary mt-1">
            Update &ldquo;{artwork.title}&rdquo;
          </p>
        </div>
        <ArtworkForm mode="edit" artwork={artwork} />
      </div>
    );
  } catch {
    notFound();
  }
}
