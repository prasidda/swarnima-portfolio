import { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import GalleryContent from "./GalleryContent";
import { Artwork } from "@/lib/types";

export const metadata: Metadata = {
  title: "Gallery",
  description: "Browse all handmade artwork by Swarnima and Samana.",
};

async function getArtworks(): Promise<Artwork[]> {
  try {
    const supabase = await createClient();
    const { data } = await supabase
      .from("artworks")
      .select("*")
      .order("display_order", { ascending: true });
    return data ?? [];
  } catch {
    return [];
  }
}

export default async function GalleryPage() {
  const artworks = await getArtworks();

  const artists = [
    ...new Set(
      artworks
        .map((a) => a.artist)
        .filter((a): a is string => a !== null && a !== "")
    ),
  ];

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-24 pb-16 px-6 lg:px-8 max-w-6xl mx-auto">
        <div className="text-center mb-14">
          <h1 className="font-serif text-4xl sm:text-5xl text-text-primary mb-3">
            Gallery
          </h1>
          <p className="text-text-secondary max-w-md mx-auto">
            Browse all of our artwork below.
          </p>
        </div>
        <GalleryContent
          artworks={artworks}
          availableArtists={artists}
        />
      </main>
      <Footer />
    </>
  );
}
