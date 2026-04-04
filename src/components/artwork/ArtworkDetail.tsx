"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { Artwork } from "@/lib/types";
import { getImageUrl } from "@/lib/constants";
import AnimatedImage from "@/components/ui/AnimatedImage";

export default function ArtworkDetail({ artwork }: { artwork: Artwork }) {
  const priceDisplay = artwork.is_sold
    ? "Sold"
    : artwork.price
      ? `$${artwork.price.toLocaleString()}`
      : "Price on Request";

  return (
    <div className="min-h-screen pt-24 pb-16 px-6 lg:px-8 max-w-6xl mx-auto">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
      >
        <Link
          href="/gallery"
          className="inline-flex items-center gap-2 text-sm text-text-secondary hover:text-accent transition-colors duration-300 mb-8"
        >
          <ArrowLeft size={16} />
          Back to Gallery
        </Link>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
        {/* Image */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="relative aspect-[3/4] bg-bg-secondary rounded-2xl overflow-hidden shadow-sm"
        >
          <AnimatedImage
            src={getImageUrl(artwork.image_path)}
            alt={artwork.title}
            fill
            className="object-contain"
            priority
          />
        </motion.div>

        {/* Details */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15, ease: "easeOut" }}
          className="flex flex-col justify-center"
        >
          <h1 className="font-serif text-3xl sm:text-4xl text-text-primary mb-2">
            {artwork.title}
          </h1>

          <p className="text-accent text-xl mb-6">{priceDisplay}</p>

          {artwork.description && (
            <p className="text-text-secondary leading-relaxed mb-8">
              {artwork.description}
            </p>
          )}

          <div className="grid grid-cols-2 gap-4 mb-8">
            {artwork.medium && (
              <div className="bg-bg-tertiary rounded-lg p-4">
                <span className="text-xs text-text-secondary block mb-1">Medium</span>
                <p className="text-sm text-text-primary">{artwork.medium}</p>
              </div>
            )}
            {artwork.dimensions && (
              <div className="bg-bg-tertiary rounded-lg p-4">
                <span className="text-xs text-text-secondary block mb-1">Size</span>
                <p className="text-sm text-text-primary">{artwork.dimensions}</p>
              </div>
            )}
            {artwork.year && (
              <div className="bg-bg-tertiary rounded-lg p-4">
                <span className="text-xs text-text-secondary block mb-1">Year</span>
                <p className="text-sm text-text-primary">{artwork.year}</p>
              </div>
            )}
            {artwork.category && (
              <div className="bg-bg-tertiary rounded-lg p-4">
                <span className="text-xs text-text-secondary block mb-1">Category</span>
                <p className="text-sm text-text-primary">{artwork.category}</p>
              </div>
            )}
          </div>

          {!artwork.is_sold && (
            <Link
              href={`/contact?artwork=${artwork.id}`}
              className="inline-block text-sm text-center bg-accent text-white px-8 py-3.5 rounded-full hover:bg-accent-hover transition-colors duration-300 shadow-sm"
            >
              I&apos;m Interested in This Piece
            </Link>
          )}
        </motion.div>
      </div>
    </div>
  );
}
