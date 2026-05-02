import { Metadata } from "next";
import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { getImageUrl } from "@/lib/constants";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ArtworkDetail from "@/components/artwork/ArtworkDetail";

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  try {
    const { id } = await params;
    const supabase = await createClient();
    const { data: artwork } = await supabase
      .from("artworks")
      .select("*")
      .eq("id", id)
      .single();

    if (!artwork) return { title: "Artwork Not Found" };

    return {
      title: artwork.title,
      description:
        artwork.description ||
        `${artwork.title}${artwork.artist ? ` by ${artwork.artist}` : ""}`,
      openGraph: {
        images: [{ url: getImageUrl(artwork.image_path) }],
      },
    };
  } catch {
    return { title: "Artwork Not Found" };
  }
}

export default async function ArtworkPage({ params }: Props) {
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
      <>
        <Navbar />
        <main>
          <ArtworkDetail artwork={artwork} />
        </main>
        <Footer />
      </>
    );
  } catch {
    notFound();
  }
}
