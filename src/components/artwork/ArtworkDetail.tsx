"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { Artwork } from "@/lib/types";
import { getImageUrl } from "@/lib/constants";

export default function ArtworkDetail({ artwork }: { artwork: Artwork }) {
  const allImages = useMemo(() => {
    const extras = artwork.additional_images ?? [];
    return [artwork.image_path, ...extras.filter(Boolean)];
  }, [artwork.image_path, artwork.additional_images]);

  const [activeIdx, setActiveIdx] = useState(0);
  const activePath = allImages[activeIdx] ?? artwork.image_path;

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

      <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-10 lg:gap-14">
        {/* Image gallery */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="space-y-4"
        >
          <div className="relative w-full overflow-hidden rounded-2xl shadow-sm">
            <AnimatePresence mode="wait">
              <motion.img
                key={activePath}
                src={getImageUrl(activePath)}
                alt={artwork.title}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="block w-full h-auto"
              />
            </AnimatePresence>
          </div>

          {allImages.length > 1 && (
            <div className="flex gap-2 sm:gap-3 overflow-x-auto pb-1 -mx-1 px-1 snap-x">
              {allImages.map((path, idx) => (
                <button
                  key={path + idx}
                  onClick={() => setActiveIdx(idx)}
                  className={`relative shrink-0 w-20 h-20 sm:w-24 sm:h-24 overflow-hidden rounded-lg snap-start transition-all duration-200 ${
                    idx === activeIdx
                      ? "ring-2 ring-accent ring-offset-2 ring-offset-bg-primary"
                      : "opacity-70 hover:opacity-100"
                  }`}
                  aria-label={`View image ${idx + 1}`}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={getImageUrl(path)}
                    alt=""
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}
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
            {artwork.artist && (
              <div className="bg-bg-tertiary rounded-lg p-4">
                <span className="text-xs text-text-secondary block mb-1">
                  Artist
                </span>
                <p className="text-sm text-text-primary">{artwork.artist}</p>
              </div>
            )}
            {artwork.medium && (
              <div className="bg-bg-tertiary rounded-lg p-4">
                <span className="text-xs text-text-secondary block mb-1">
                  Medium
                </span>
                <p className="text-sm text-text-primary">{artwork.medium}</p>
              </div>
            )}
            {artwork.dimensions && (
              <div className="bg-bg-tertiary rounded-lg p-4 col-span-2">
                <span className="text-xs text-text-secondary block mb-1">
                  Size
                </span>
                <p className="text-sm text-text-primary">
                  {artwork.dimensions}
                </p>
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
