"use client";

import { motion } from "framer-motion";

interface ArtistFilterProps {
  selected: string;
  onSelect: (artist: string) => void;
  availableArtists: string[];
}

export default function ArtistFilter({
  selected,
  onSelect,
  availableArtists,
}: ArtistFilterProps) {
  const options = ["All", ...availableArtists];

  return (
    <div className="flex flex-wrap gap-2 justify-center">
      {options.map((option) => (
        <button
          key={option}
          onClick={() => onSelect(option)}
          className={`relative px-5 py-2 text-sm rounded-full transition-all duration-300 ${
            selected === option
              ? "text-white"
              : "text-text-secondary hover:text-text-primary bg-bg-secondary border border-border"
          }`}
        >
          {selected === option && (
            <motion.span
              layoutId="artist-pill"
              className="absolute inset-0 bg-accent rounded-full"
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            />
          )}
          <span className="relative z-10">{option}</span>
        </button>
      ))}
    </div>
  );
}
