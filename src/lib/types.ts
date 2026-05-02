export interface Artwork {
  id: string;
  title: string;
  description: string | null;
  medium: string | null;
  dimensions: string | null;
  year: number | null;
  price: number | null;
  image_path: string;
  thumbnail_path: string | null;
  category: string | null;
  artist: string | null;
  additional_images: string[] | null;
  is_sold: boolean;
  is_featured: boolean;
  display_order: number;
  created_at: string;
  updated_at: string;
}

export interface ArtworkFormData {
  title: string;
  description: string;
  medium: string;
  dimensions: string;
  price: string;
  artist: string;
  is_featured: boolean;
}

export const ARTISTS = ["Swarnima", "Samana"] as const;
export type ArtistName = (typeof ARTISTS)[number];
