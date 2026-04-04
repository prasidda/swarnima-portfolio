"use client";

import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import Link from "next/link";

export default function HeroSection() {
  const nameLetters = "SWARNIMA".split("");

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Subtle gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-bg-primary via-bg-primary to-bg-secondary" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(201,169,110,0.04),transparent_70%)]" />

      <div className="relative z-10 text-center px-6">
        {/* Animated name */}
        <h1 className="font-serif text-6xl sm:text-7xl md:text-8xl lg:text-9xl tracking-[0.25em] mb-6">
          {nameLetters.map((letter, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.8,
                delay: 0.3 + i * 0.08,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
              className="inline-block"
            >
              {letter}
            </motion.span>
          ))}
        </h1>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
          className="space-y-8"
        >
          <p className="text-text-secondary text-lg sm:text-xl tracking-[0.3em] uppercase">
            Fine Art Portfolio
          </p>

          <Link
            href="/gallery"
            className="inline-block text-sm tracking-[0.2em] uppercase text-accent border border-accent/30 px-8 py-3 hover:bg-accent/10 hover:border-accent transition-all duration-500"
          >
            View Collection
          </Link>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown size={24} className="text-text-secondary/50" />
        </motion.div>
      </motion.div>
    </section>
  );
}
