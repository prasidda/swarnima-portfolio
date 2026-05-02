export const SITE_NAME = "The Adhikari Collection";
export const SITE_DESCRIPTION = "The Adhikari Collection — handmade paintings and artwork by Swarnima and Samana.";

export function getImageUrl(path: string): string {
  return `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/artworks/${path}`;
}
