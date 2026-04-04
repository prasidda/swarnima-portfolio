"use client";

import { motion } from "framer-motion";
import { CATEGORIES } from "@/lib/constants";

interface CategoryFilterProps {
  selected: string;
  onSelect: (category: string) => void;
  availableCategories: string[];
}

export default function CategoryFilter({
  selected,
  onSelect,
  availableCategories,
}: CategoryFilterProps) {
  const categories = CATEGORIES.filter(
    (c) => c === "All" || availableCategories.includes(c)
  );

  return (
    <div className="flex flex-wrap gap-2 justify-center">
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => onSelect(category)}
          className={`relative px-5 py-2 text-sm rounded-full transition-all duration-300 ${
            selected === category
              ? "text-white"
              : "text-text-secondary hover:text-text-primary bg-bg-secondary border border-border"
          }`}
        >
          {selected === category && (
            <motion.span
              layoutId="category-pill"
              className="absolute inset-0 bg-accent rounded-full"
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            />
          )}
          <span className="relative z-10">{category}</span>
        </button>
      ))}
    </div>
  );
}
