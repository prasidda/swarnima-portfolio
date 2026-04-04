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
          <p className="text-text-secondary">The person behind the paintbrush</p>
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
                I&apos;m a self-taught artist who paints from home. For me,
                art isn&apos;t about being in a fancy studio — it&apos;s about
                picking up a brush after a long day and losing myself in
                colors and shapes.
              </p>
              <p>
                I work with whatever inspires me in the moment — watercolors,
                acrylics, mixed media, sometimes just pencil on paper. Every
                piece is unique and made entirely by hand.
              </p>
              <p>
                When I&apos;m not painting, you can probably find me with a
                cup of chai, daydreaming about my next piece. I hope my art
                brings a little warmth and joy to your space, the way
                creating it brings joy to mine.
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
