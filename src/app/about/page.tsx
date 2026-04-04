import { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "About",
  description: "Learn more about Swarnima and her love for painting.",
};

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-24 pb-16 px-6 lg:px-8 max-w-4xl mx-auto">
        <div className="text-center mb-14">
          <h1 className="font-serif text-4xl sm:text-5xl text-text-primary mb-3">
            About Me
          </h1>
          <p className="text-text-secondary">A bit about me</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
          {/* Photo placeholder */}
          <div className="aspect-[3/4] bg-bg-secondary rounded-2xl flex items-center justify-center shadow-sm">
            <p className="text-text-secondary text-sm">My Photo</p>
          </div>

          {/* Bio */}
          <div className="space-y-5">
            <h2 className="font-serif text-2xl text-text-primary">
              Hi, I&apos;m Swarnima!
            </h2>
            <div className="space-y-4 text-text-secondary leading-relaxed">
              <p>
                I&apos;m a self-taught artist who paints from home. I work
                with whatever medium fits the idea — watercolors, acrylics,
                mixed media, or just pencil on paper.
              </p>
              <p>
                Every piece here is handmade and one of a kind. Painting is
                something I do because I genuinely enjoy it, and this site
                is where I share the results.
              </p>
              <p>
                If something catches your eye or you have any questions,
                feel free to reach out through the contact page.
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
