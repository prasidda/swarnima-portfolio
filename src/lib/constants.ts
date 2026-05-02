export const SITE_NAME = "Swarnima and Samana";
export const SITE_DESCRIPTION = "Handmade paintings and artwork by Swarnima and Samana.";

export function getImageUrl(path: string): string {
  return `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/artworks/${path}`;
}
