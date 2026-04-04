import { createClient } from "@/lib/supabase/server";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import HeroSection from "@/components/home/HeroSection";
import FeaturedGallery from "@/components/home/FeaturedGallery";

export default async function Home() {
  const supabase = await createClient();
  const { data: artworks } = await supabase
    .from("artworks")
    .select("*")
    .eq("is_featured", true)
    .order("display_order", { ascending: true })
    .limit(6);

  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <FeaturedGallery artworks={artworks ?? []} />
      </main>
      <Footer />
    </>
  );
}
