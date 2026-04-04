"use client";

import Masonry from "react-masonry-css";
import { Artwork } from "@/lib/types";
import ArtworkCard from "./ArtworkCard";

interface MasonryGridProps {
  artworks: Artwork[];
}

const breakpointColumns = {
  default: 3,
  1024: 2,
  640: 1,
};

export default function MasonryGrid({ artworks }: MasonryGridProps) {
  if (artworks.length === 0) {
    return (
      <div className="text-center py-20">
        <p className="text-text-secondary text-lg">
          Nothing here yet — check back soon!
        </p>
      </div>
    );
  }

  return (
    <Masonry
      breakpointCols={breakpointColumns}
      className="flex -ml-8 w-auto"
      columnClassName="pl-8 bg-clip-padding"
    >
      {artworks.map((artwork, index) => (
        <div key={artwork.id} className="mb-8">
          <ArtworkCard artwork={artwork} index={index} />
        </div>
      ))}
    </Masonry>
  );
}
