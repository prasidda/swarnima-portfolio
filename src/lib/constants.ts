export const SITE_NAME = "Swarnima";
export const SITE_DESCRIPTION = "Original artwork by Swarnima — exploring color, emotion, and form.";

export const CATEGORIES = [
  "All",
  "Portraits",
  "Landscapes",
  "Abstract",
  "Still Life",
  "Mixed Media",
] as const;

export type Category = (typeof CATEGORIES)[number];

export function getImageUrl(path: string): string {
  return `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/artworks/${path}`;
}
