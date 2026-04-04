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
      <div className="text-center py-24">
        <p className="text-text-secondary text-lg">No artworks to display yet.</p>
      </div>
    );
  }

  return (
    <Masonry
      breakpointCols={breakpointColumns}
      className="flex -ml-6 w-auto"
      columnClassName="pl-6 bg-clip-padding"
    >
      {artworks.map((artwork, index) => (
        <div key={artwork.id} className="mb-6">
          <ArtworkCard artwork={artwork} index={index} />
        </div>
      ))}
    </Masonry>
  );
}
