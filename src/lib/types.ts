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
  year: string;
  price: string;
  category: string;
  is_featured: boolean;
}
