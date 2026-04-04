import { createClient } from "@/lib/supabase/server";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import HeroSection from "@/components/home/HeroSection";
import FeaturedGallery from "@/components/home/FeaturedGallery";
import { Artwork } from "@/lib/types";

async function getFeaturedArtworks(): Promise<Artwork[]> {
  try {
    const supabase = await createClient();
    const { data } = await supabase
      .from("artworks")
      .select("*")
      .eq("is_featured", true)
      .order("display_order", { ascending: true })
      .limit(6);
    return data ?? [];
  } catch {
    return [];
  }
}

export default async function Home() {
  const artworks = await getFeaturedArtworks();

  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <FeaturedGallery artworks={artworks} />
      </main>
      <Footer />
    </>
  );
}
