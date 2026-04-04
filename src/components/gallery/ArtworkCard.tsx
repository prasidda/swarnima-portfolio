"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Artwork } from "@/lib/types";
import { getImageUrl } from "@/lib/constants";
import AnimatedImage from "@/components/ui/AnimatedImage";

interface ArtworkCardProps {
  artwork: Artwork;
  index: number;
}

export default function ArtworkCard({ artwork, index }: ArtworkCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.05, ease: "easeOut" }}
    >
      <Link href={`/artwork/${artwork.id}`} className="group block">
        <div className="relative overflow-hidden rounded-sm bg-bg-secondary">
          <div className="aspect-[3/4] relative">
            <AnimatedImage
              src={getImageUrl(artwork.image_path)}
              alt={artwork.title}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            {/* Hover overlay */}
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-500 flex items-end">
              <div className="p-6 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                <h3 className="font-serif text-lg text-white">{artwork.title}</h3>
                {artwork.medium && (
                  <p className="text-sm text-white/70 mt-1">{artwork.medium}</p>
                )}
              </div>
            </div>
            {/* Sold badge */}
            {artwork.is_sold && (
              <div className="absolute top-4 right-4 bg-bg-primary/90 text-accent text-xs tracking-[0.2em] uppercase px-3 py-1.5 rounded-sm">
                Sold
              </div>
            )}
          </div>
        </div>
        {/* Title below card on mobile */}
        <div className="mt-3 md:hidden">
          <h3 className="font-serif text-base text-text-primary">{artwork.title}</h3>
          {artwork.medium && (
            <p className="text-sm text-text-secondary mt-0.5">{artwork.medium}</p>
          )}
        </div>
      </Link>
    </motion.div>
  );
}
