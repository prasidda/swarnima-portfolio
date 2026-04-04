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
    <div className="min-h-screen pt-28 pb-16 px-6 lg:px-8 max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
      >
        <Link
          href="/gallery"
          className="inline-flex items-center gap-2 text-sm text-text-secondary hover:text-accent transition-colors duration-300 mb-10"
        >
          <ArrowLeft size={16} />
          <span className="tracking-[0.1em] uppercase">Back to Gallery</span>
        </Link>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
        {/* Image */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="relative aspect-[3/4] bg-bg-secondary rounded-sm overflow-hidden"
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
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
          className="flex flex-col justify-center"
        >
          <h1 className="font-serif text-4xl sm:text-5xl tracking-wide mb-4">
            {artwork.title}
          </h1>

          <div className="w-10 h-px bg-accent mb-8" />

          <div className="space-y-4 mb-8">
            {artwork.medium && (
              <div>
                <span className="text-xs tracking-[0.2em] uppercase text-text-secondary">
                  Medium
                </span>
                <p className="text-text-primary mt-1">{artwork.medium}</p>
              </div>
            )}
            {artwork.dimensions && (
              <div>
                <span className="text-xs tracking-[0.2em] uppercase text-text-secondary">
                  Dimensions
                </span>
                <p className="text-text-primary mt-1">{artwork.dimensions}</p>
              </div>
            )}
            {artwork.year && (
              <div>
                <span className="text-xs tracking-[0.2em] uppercase text-text-secondary">
                  Year
                </span>
                <p className="text-text-primary mt-1">{artwork.year}</p>
              </div>
            )}
            {artwork.category && (
              <div>
                <span className="text-xs tracking-[0.2em] uppercase text-text-secondary">
                  Category
                </span>
                <p className="text-text-primary mt-1">{artwork.category}</p>
              </div>
            )}
          </div>

          <div className="mb-8">
            <span className="font-serif text-2xl text-accent">
              {priceDisplay}
            </span>
          </div>

          {artwork.description && (
            <p className="text-text-secondary leading-relaxed mb-10">
              {artwork.description}
            </p>
          )}

          {!artwork.is_sold && (
            <Link
              href={`/contact?artwork=${artwork.id}`}
              className="inline-block text-sm tracking-[0.2em] uppercase text-center bg-accent text-bg-primary px-8 py-4 hover:bg-accent-hover transition-colors duration-300 w-full sm:w-auto"
            >
              Inquire About This Piece
            </Link>
          )}
        </motion.div>
      </div>
    </div>
  );
}
