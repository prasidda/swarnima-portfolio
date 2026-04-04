"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Artwork } from "@/lib/types";
import ArtworkCard from "@/components/gallery/ArtworkCard";

interface FeaturedGalleryProps {
  artworks: Artwork[];
}

export default function FeaturedGallery({ artworks }: FeaturedGalleryProps) {
  if (artworks.length === 0) return null;

  return (
    <section className="py-20 px-6 lg:px-8 max-w-6xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
        className="text-center mb-14"
      >
        <h2 className="font-serif text-3xl sm:text-4xl text-text-primary mb-3">
          Favorites
        </h2>
        <p className="text-text-secondary">A few of my pieces — there&apos;s a lot more</p>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {artworks.map((artwork, index) => (
          <ArtworkCard key={artwork.id} artwork={artwork} index={index} />
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="text-center mt-14"
      >
        <Link
          href="/gallery"
          className="inline-flex items-center gap-2 text-sm text-accent hover:text-accent-hover transition-colors duration-300 group"
        >
          See everything
          <ArrowRight
            size={16}
            className="group-hover:translate-x-1 transition-transform duration-300"
          />
        </Link>
      </motion.div>
    </section>
  );
}
