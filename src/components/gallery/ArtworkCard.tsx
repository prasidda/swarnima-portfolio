"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Artwork } from "@/lib/types";
import { getImageUrl } from "@/lib/constants";

interface ArtworkCardProps {
  artwork: Artwork;
  index: number;
}

export default function ArtworkCard({ artwork, index }: ArtworkCardProps) {
  const [loaded, setLoaded] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.06, ease: "easeOut" }}
    >
      <Link href={`/artwork/${artwork.id}`} className="group block">
        <div className="relative overflow-hidden rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={getImageUrl(artwork.image_path)}
            alt={artwork.title}
            onLoad={() => setLoaded(true)}
            className={`block w-full h-auto transition-all duration-500 group-hover:scale-[1.03] ${
              loaded ? "opacity-100" : "opacity-0"
            }`}
            loading="lazy"
          />
          {/* Sold badge */}
          {artwork.is_sold && (
            <div className="absolute top-3 right-3 bg-accent text-white text-xs tracking-wider px-3 py-1 rounded-full">
              Sold
            </div>
          )}
        </div>
        {/* Info below card */}
        <div className="mt-3 px-1">
          <h3 className="font-serif text-lg text-text-primary group-hover:text-accent transition-colors">
            {artwork.title}
          </h3>
          {artwork.artist && (
            <p className="text-xs text-text-secondary/80 mt-0.5">
              by {artwork.artist}
            </p>
          )}
          {artwork.medium && (
            <p className="text-sm text-text-secondary mt-0.5">
              {artwork.medium}
            </p>
          )}
          {artwork.price && !artwork.is_sold && (
            <p className="text-sm text-accent mt-1">
              ${artwork.price.toLocaleString()}
            </p>
          )}
        </div>
      </Link>
    </motion.div>
  );
}
