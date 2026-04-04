"use client";

import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { Upload, X } from "lucide-react";
import Image from "next/image";

interface ImageUploaderProps {
  file: File | null;
  onFileSelect: (file: File | null) => void;
  currentImageUrl?: string;
}

export default function ImageUploader({
  file,
  onFileSelect,
  currentImageUrl,
}: ImageUploaderProps) {
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (acceptedFiles.length > 0) {
        onFileSelect(acceptedFiles[0]);
      }
    },
    [onFileSelect]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/jpeg": [".jpg", ".jpeg"],
      "image/png": [".png"],
      "image/webp": [".webp"],
    },
    maxFiles: 1,
    maxSize: 10 * 1024 * 1024, // 10MB
  });

  const previewUrl = file ? URL.createObjectURL(file) : currentImageUrl;

  return (
    <div>
      {previewUrl ? (
        <div className="relative">
          <div className="relative aspect-[3/4] max-w-xs bg-bg-tertiary rounded-xl overflow-hidden">
            <Image
              src={previewUrl}
              alt="Preview"
              fill
              className="object-cover"
              unoptimized={!!file}
            />
          </div>
          <button
            type="button"
            onClick={() => onFileSelect(null)}
            className="absolute top-2 right-2 p-1.5 bg-bg-primary/80 rounded-full text-text-secondary hover:text-text-primary transition-colors"
          >
            <X size={16} />
          </button>
          <p className="text-xs text-text-secondary mt-2">
            {file ? file.name : "Current image"}
          </p>
        </div>
      ) : (
        <div
          {...getRootProps()}
          className={`border-2 border-dashed rounded-xl p-12 text-center cursor-pointer transition-colors ${
            isDragActive
              ? "border-accent bg-accent-light/30"
              : "border-border hover:border-accent/40"
          }`}
        >
          <input {...getInputProps()} />
          <Upload size={32} className="mx-auto text-text-secondary mb-4" />
          <p className="text-text-secondary text-sm">
            {isDragActive
              ? "Drop the image here..."
              : "Drag & drop an image, or click to select"}
          </p>
          <p className="text-text-secondary/50 text-xs mt-2">
            JPG, PNG, or WebP up to 10MB
          </p>
        </div>
      )}
    </div>
  );
}
