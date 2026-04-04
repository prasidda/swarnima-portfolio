"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

interface AnimatedImageProps {
  src: string;
  alt: string;
  fill?: boolean;
  width?: number;
  height?: number;
  className?: string;
  priority?: boolean;
}

export default function AnimatedImage({
  src,
  alt,
  fill,
  width,
  height,
  className = "",
  priority = false,
}: AnimatedImageProps) {
  const [loaded, setLoaded] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: loaded ? 1 : 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={fill ? "relative w-full h-full" : ""}
    >
      <Image
        src={src}
        alt={alt}
        fill={fill}
        width={!fill ? width : undefined}
        height={!fill ? height : undefined}
        className={className}
        onLoad={() => setLoaded(true)}
        priority={priority}
        sizes={fill ? "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" : undefined}
      />
    </motion.div>
  );
}
