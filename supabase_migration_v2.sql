-- ============================================
-- Migration v2 — Add artist and additional images
-- Run this in the Supabase SQL Editor
-- ============================================

-- Artist field (Swarnima or Samana)
alter table public.artworks
  add column if not exists artist text;

-- Array of additional image paths (the main image stays in image_path)
alter table public.artworks
  add column if not exists additional_images text[] default '{}';
