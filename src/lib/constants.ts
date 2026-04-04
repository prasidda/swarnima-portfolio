export const SITE_NAME = "Swarnima";
export const SITE_DESCRIPTION = "Handmade paintings and artwork by Swarnima — made with love, one brushstroke at a time.";

export const CATEGORIES = [
  "All",
  "Paintings",
  "Sketches",
  "Watercolor",
  "Abstract",
  "Mixed Media",
] as const;

export type Category = (typeof CATEGORIES)[number];

export function getImageUrl(path: string): string {
  return `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/artworks/${path}`;
}
