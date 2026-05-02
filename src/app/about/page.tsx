import { Metadata } from "next";
import Image from "next/image";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "About",
  description: "About Swarnima and Samana.",
};

const artists = [
  {
    name: "Swarnima",
    photo: "/swarnima.jpg",
    bio: "I am a visual artist who explores culture, place, and everyday life through my work. My art ranges from detailed cultural scenes to city landscapes and more contemporary subjects, often focusing on atmosphere, emotion, and storytelling. I enjoy capturing both traditional and modern environments, drawing inspiration from different places and experiences that shape how I see the world.",
  },
  {
    name: "Samana",
    photo: "/samana.jpg",
    bio: "I am a visual artist who creates work inspired by a mix of cultural heritage, urban life, and natural environments. My pieces often reflect scenes from cities, everyday moments, and meaningful cultural details, blending tradition with a more modern perspective. Through my art, I aim to express stories of place, identity, and the small details that make each environment unique.",
  },
];

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-24 pb-16 px-6 lg:px-8 max-w-5xl mx-auto">
        <div className="text-center mb-14">
          <h1 className="font-serif text-4xl sm:text-5xl text-text-primary mb-3">
            About Us
          </h1>
          <p className="text-text-secondary">A bit about each of us</p>
        </div>

        <div className="space-y-16 sm:space-y-20">
          {artists.map((artist, idx) => (
            <div
              key={artist.name}
              className={`grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center ${
                idx % 2 === 1 ? "md:[&>:first-child]:order-2" : ""
              }`}
            >
              <div className="relative aspect-square w-full max-w-sm mx-auto overflow-hidden rounded-2xl bg-bg-secondary shadow-sm">
                <Image
                  src={artist.photo}
                  alt={artist.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 384px"
                />
              </div>
              <div className="space-y-4">
                <h2 className="font-serif text-3xl text-text-primary">
                  {artist.name}
                </h2>
                <p className="text-text-secondary leading-relaxed">
                  {artist.bio}
                </p>
              </div>
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
}
