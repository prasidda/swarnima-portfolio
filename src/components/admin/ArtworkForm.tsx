"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { createClient } from "@/lib/supabase/client";
import { Artwork, ArtworkFormData } from "@/lib/types";
import { CATEGORIES, getImageUrl } from "@/lib/constants";
import ImageUploader from "./ImageUploader";
import LoadingSpinner from "@/components/ui/LoadingSpinner";

interface ArtworkFormProps {
  mode: "create" | "edit";
  artwork?: Artwork;
}

export default function ArtworkForm({ mode, artwork }: ArtworkFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [formData, setFormData] = useState<ArtworkFormData>({
    title: artwork?.title ?? "",
    description: artwork?.description ?? "",
    medium: artwork?.medium ?? "",
    dimensions: artwork?.dimensions ?? "",
    year: artwork?.year?.toString() ?? "",
    price: artwork?.price?.toString() ?? "",
    category: artwork?.category ?? "",
    is_featured: artwork?.is_featured ?? false,
  });

  const updateField = (
    field: keyof ArtworkFormData,
    value: string | boolean
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (mode === "create" && !imageFile) {
      toast.error("Please select an image");
      return;
    }

    setLoading(true);
    const supabase = createClient();

    try {
      let imagePath = artwork?.image_path ?? "";

      // Upload image if a new file is selected
      if (imageFile) {
        const timestamp = Date.now();
        const sanitizedName = imageFile.name.replace(/[^a-zA-Z0-9.-]/g, "_");
        const filePath = `${timestamp}-${sanitizedName}`;

        const { error: uploadError } = await supabase.storage
          .from("artworks")
          .upload(filePath, imageFile);

        if (uploadError) throw uploadError;

        // Delete old image if editing
        if (mode === "edit" && artwork?.image_path) {
          await supabase.storage
            .from("artworks")
            .remove([artwork.image_path]);
        }

        imagePath = filePath;
      }

      const artworkData = {
        title: formData.title,
        description: formData.description || null,
        medium: formData.medium || null,
        dimensions: formData.dimensions || null,
        year: formData.year ? parseInt(formData.year) : null,
        price: formData.price ? parseFloat(formData.price) : null,
        category: formData.category || null,
        is_featured: formData.is_featured,
        image_path: imagePath,
      };

      if (mode === "create") {
        const { error } = await supabase.from("artworks").insert(artworkData);
        if (error) throw error;
        toast.success("Artwork uploaded successfully!");
      } else {
        const { error } = await supabase
          .from("artworks")
          .update(artworkData)
          .eq("id", artwork!.id);
        if (error) throw error;
        toast.success("Artwork updated successfully!");
      }

      router.push("/admin");
      router.refresh();
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  };

  const inputClasses =
    "w-full bg-bg-tertiary border border-border rounded-sm px-4 py-3 text-text-primary placeholder:text-text-secondary/50 focus:outline-none focus:border-accent/50 transition-colors";

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl space-y-6">
      <div>
        <label className="block text-xs tracking-[0.2em] uppercase text-text-secondary mb-2">
          Image *
        </label>
        <ImageUploader
          file={imageFile}
          onFileSelect={setImageFile}
          currentImageUrl={
            artwork?.image_path ? getImageUrl(artwork.image_path) : undefined
          }
        />
      </div>

      <div>
        <label className="block text-xs tracking-[0.2em] uppercase text-text-secondary mb-2">
          Title *
        </label>
        <input
          type="text"
          required
          value={formData.title}
          onChange={(e) => updateField("title", e.target.value)}
          className={inputClasses}
          placeholder="Artwork title"
        />
      </div>

      <div>
        <label className="block text-xs tracking-[0.2em] uppercase text-text-secondary mb-2">
          Description
        </label>
        <textarea
          value={formData.description}
          onChange={(e) => updateField("description", e.target.value)}
          className={`${inputClasses} resize-none`}
          rows={4}
          placeholder="Describe the artwork..."
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <label className="block text-xs tracking-[0.2em] uppercase text-text-secondary mb-2">
            Medium
          </label>
          <input
            type="text"
            value={formData.medium}
            onChange={(e) => updateField("medium", e.target.value)}
            className={inputClasses}
            placeholder="e.g. Oil on Canvas"
          />
        </div>

        <div>
          <label className="block text-xs tracking-[0.2em] uppercase text-text-secondary mb-2">
            Dimensions
          </label>
          <input
            type="text"
            value={formData.dimensions}
            onChange={(e) => updateField("dimensions", e.target.value)}
            className={inputClasses}
            placeholder='e.g. 24 x 36 inches'
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div>
          <label className="block text-xs tracking-[0.2em] uppercase text-text-secondary mb-2">
            Year
          </label>
          <input
            type="number"
            value={formData.year}
            onChange={(e) => updateField("year", e.target.value)}
            className={inputClasses}
            placeholder="2024"
          />
        </div>

        <div>
          <label className="block text-xs tracking-[0.2em] uppercase text-text-secondary mb-2">
            Price ($)
          </label>
          <input
            type="number"
            step="0.01"
            value={formData.price}
            onChange={(e) => updateField("price", e.target.value)}
            className={inputClasses}
            placeholder="Leave empty for 'Price on Request'"
          />
        </div>

        <div>
          <label className="block text-xs tracking-[0.2em] uppercase text-text-secondary mb-2">
            Category
          </label>
          <select
            value={formData.category}
            onChange={(e) => updateField("category", e.target.value)}
            className={inputClasses}
          >
            <option value="">Select category</option>
            {CATEGORIES.filter((c) => c !== "All").map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <input
          type="checkbox"
          id="is_featured"
          checked={formData.is_featured}
          onChange={(e) => updateField("is_featured", e.target.checked)}
          className="w-4 h-4 accent-accent"
        />
        <label htmlFor="is_featured" className="text-sm text-text-secondary">
          Feature this artwork on the home page
        </label>
      </div>

      <div className="flex gap-4 pt-4">
        <button
          type="submit"
          disabled={loading}
          className="flex items-center justify-center gap-2 text-sm tracking-[0.15em] uppercase bg-accent text-bg-primary px-8 py-3 hover:bg-accent-hover transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed min-w-[160px]"
        >
          {loading ? (
            <LoadingSpinner size="sm" />
          ) : mode === "create" ? (
            "Upload Artwork"
          ) : (
            "Save Changes"
          )}
        </button>
        <button
          type="button"
          onClick={() => router.back()}
          className="text-sm tracking-[0.15em] uppercase text-text-secondary px-8 py-3 border border-border hover:border-text-secondary transition-colors duration-300"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
