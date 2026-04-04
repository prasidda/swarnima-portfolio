"use client";

import { useState } from "react";
import { Artwork } from "@/lib/types";
import CategoryFilter from "@/components/gallery/CategoryFilter";
import MasonryGrid from "@/components/gallery/MasonryGrid";
import PageTransition from "@/components/ui/PageTransition";

interface GalleryContentProps {
  artworks: Artwork[];
  availableCategories: string[];
}

export default function GalleryContent({
  artworks,
  availableCategories,
}: GalleryContentProps) {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filtered =
    selectedCategory === "All"
      ? artworks
      : artworks.filter((a) => a.category === selectedCategory);

  return (
    <PageTransition>
      {availableCategories.length > 1 && (
        <div className="mb-12">
          <CategoryFilter
            selected={selectedCategory}
            onSelect={setSelectedCategory}
            availableCategories={availableCategories}
          />
        </div>
      )}
      <MasonryGrid artworks={filtered} />
    </PageTransition>
  );
}
