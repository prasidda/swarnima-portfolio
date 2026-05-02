"use client";

import { useState } from "react";
import { Artwork } from "@/lib/types";
import ArtistFilter from "@/components/gallery/ArtistFilter";
import MasonryGrid from "@/components/gallery/MasonryGrid";
import PageTransition from "@/components/ui/PageTransition";

interface GalleryContentProps {
  artworks: Artwork[];
  availableArtists: string[];
}

export default function GalleryContent({
  artworks,
  availableArtists,
}: GalleryContentProps) {
  const [selected, setSelected] = useState("All");

  const filtered =
    selected === "All"
      ? artworks
      : artworks.filter((a) => a.artist === selected);

  return (
    <PageTransition>
      {availableArtists.length > 1 && (
        <div className="mb-12">
          <ArtistFilter
            selected={selected}
            onSelect={setSelected}
            availableArtists={availableArtists}
          />
        </div>
      )}
      <MasonryGrid artworks={filtered} />
    </PageTransition>
  );
}
