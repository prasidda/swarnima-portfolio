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
    <div className="flex flex-wrap gap-3 justify-center">
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => onSelect(category)}
          className={`relative px-5 py-2 text-sm tracking-[0.12em] uppercase transition-colors duration-300 ${
            selected === category
              ? "text-accent"
              : "text-text-secondary hover:text-text-primary"
          }`}
        >
          {selected === category && (
            <motion.span
              layoutId="category-pill"
              className="absolute inset-0 border border-accent rounded-full"
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            />
          )}
          {category}
        </button>
      ))}
    </div>
  );
}
