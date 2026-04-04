import { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "About",
  description: "Learn more about Swarnima and her artistic journey.",
};

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-28 pb-16 px-6 lg:px-8 max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="font-serif text-4xl sm:text-5xl tracking-[0.1em] mb-4">
            About the Artist
          </h1>
          <div className="w-12 h-px bg-accent mx-auto" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
          {/* Photo placeholder */}
          <div className="aspect-[3/4] bg-bg-secondary rounded-sm flex items-center justify-center">
            <p className="text-text-secondary text-sm tracking-[0.1em] uppercase">
              Artist Photo
            </p>
          </div>

          {/* Bio */}
          <div className="space-y-6">
            <h2 className="font-serif text-2xl tracking-wide">Swarnima</h2>
            <div className="w-8 h-px bg-accent" />
            <div className="space-y-4 text-text-secondary leading-relaxed">
              <p>
                Swarnima is a contemporary artist whose work explores the
                interplay between color, emotion, and form. Drawing inspiration
                from the natural world and human experience, each piece invites
                the viewer into a moment of contemplation.
              </p>
              <p>
                Working across multiple mediums — from oil on canvas to mixed
                media — Swarnima&apos;s art is characterized by its rich textures,
                evocative palette, and an innate sense of balance between
                abstraction and representation.
              </p>
              <p>
                Every artwork is an original creation, crafted with intention
                and care. Swarnima believes that art should move you — whether
                it finds its home in a gallery, a living room, or the quiet
                corner of someone&apos;s world.
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
