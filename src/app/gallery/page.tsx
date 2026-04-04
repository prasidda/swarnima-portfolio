import { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import GalleryContent from "./GalleryContent";
import { Artwork } from "@/lib/types";

export const metadata: Metadata = {
  title: "Gallery",
  description: "Browse the complete collection of original artwork by Swarnima.",
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

  const categories = [
    ...new Set(
      artworks
        .map((a) => a.category)
        .filter((c): c is string => c !== null)
    ),
  ];

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-28 pb-16 px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="font-serif text-4xl sm:text-5xl tracking-[0.1em] mb-4">
            Gallery
          </h1>
          <div className="w-12 h-px bg-accent mx-auto mb-4" />
          <p className="text-text-secondary max-w-lg mx-auto">
            Explore the complete collection of original works.
          </p>
        </div>
        <GalleryContent
          artworks={artworks}
          availableCategories={categories}
        />
      </main>
      <Footer />
    </>
  );
}
