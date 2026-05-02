"use client";

import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { Upload, X } from "lucide-react";
import Image from "next/image";

export interface ExtraImage {
  id: string;
  file?: File;
  existingPath?: string;
  previewUrl: string;
}

interface MultiImageUploaderProps {
  images: ExtraImage[];
  onChange: (images: ExtraImage[]) => void;
}

export default function MultiImageUploader({
  images,
  onChange,
}: MultiImageUploaderProps) {
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const additions: ExtraImage[] = acceptedFiles.map((file) => ({
        id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
        file,
        previewUrl: URL.createObjectURL(file),
      }));
      onChange([...images, ...additions]);
    },
    [images, onChange]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/jpeg": [".jpg", ".jpeg"],
      "image/png": [".png"],
      "image/webp": [".webp"],
    },
    maxSize: 10 * 1024 * 1024,
  });

  const remove = (id: string) => {
    onChange(images.filter((img) => img.id !== id));
  };

  return (
    <div className="space-y-3">
      {images.length > 0 && (
        <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
          {images.map((img) => (
            <div
              key={img.id}
              className="relative group aspect-square rounded-lg overflow-hidden bg-bg-tertiary"
            >
              <Image
                src={img.previewUrl}
                alt="Additional"
                fill
                className="object-cover"
                unoptimized={!!img.file}
                sizes="120px"
              />
              <button
                type="button"
                onClick={() => remove(img.id)}
                className="absolute top-1.5 right-1.5 p-1 bg-bg-primary/90 rounded-full text-text-secondary hover:text-text-primary opacity-0 group-hover:opacity-100 transition-opacity"
                aria-label="Remove image"
              >
                <X size={14} />
              </button>
            </div>
          ))}
        </div>
      )}

      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition-colors ${
          isDragActive
            ? "border-accent bg-accent-light/30"
            : "border-border hover:border-accent/40"
        }`}
      >
        <input {...getInputProps()} />
        <Upload size={20} className="mx-auto text-text-secondary mb-2" />
        <p className="text-text-secondary text-sm">
          {isDragActive
            ? "Drop images here..."
            : "Drag & drop more images, or click to select"}
        </p>
        <p className="text-text-secondary/50 text-xs mt-1">
          Add as many as you like — JPG, PNG, or WebP up to 10MB each
        </p>
      </div>
    </div>
  );
}
