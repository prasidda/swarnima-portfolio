"use client";

import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import Link from "next/link";

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Soft gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-accent-light/30 via-bg-primary to-bg-primary" />

      <div className="relative z-10 text-center px-6 max-w-2xl">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <p className="text-accent text-sm tracking-[0.2em] uppercase mb-4">
            Welcome to my art portfolio
          </p>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="font-serif text-5xl sm:text-6xl md:text-7xl font-light text-text-primary mb-6"
        >
          Swarnima
        </motion.h1>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="space-y-8"
        >
          <p className="text-text-secondary text-lg leading-relaxed">
            Handmade paintings, each piece is unique and tells its own story.
          </p>

          <Link
            href="/gallery"
            className="inline-block text-sm tracking-wider bg-accent text-white px-8 py-3.5 rounded-full hover:bg-accent-hover transition-all duration-300 shadow-sm hover:shadow-md"
          >
            See My Work
          </Link>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown size={22} className="text-text-secondary/40" />
        </motion.div>
      </motion.div>
    </section>
  );
}
