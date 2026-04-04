-- ============================================
-- Swarnima Portfolio — Supabase Setup Script
-- Run this in the Supabase SQL Editor
-- ============================================

-- 1. Enable UUID generation
create extension if not exists "uuid-ossp";

-- 2. Create artworks table
create table public.artworks (
  id uuid primary key default uuid_generate_v4(),
  title text not null,
  description text,
  medium text,
  dimensions text,
  year integer,
  price decimal(10, 2),
  image_path text not null,
  thumbnail_path text,
  category text,
  is_sold boolean default false,
  is_featured boolean default false,
  display_order integer default 0,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- 3. Indexes
create index idx_artworks_display_order on public.artworks(display_order);
create index idx_artworks_category on public.artworks(category);

-- 4. Row Level Security
alter table public.artworks enable row level security;

-- Public can read all artworks
create policy "Public can view artworks"
  on public.artworks for select
  using (true);

-- Authenticated users (admin) can insert
create policy "Admin can insert artworks"
  on public.artworks for insert
  to authenticated
  with check (true);

-- Authenticated users (admin) can update
create policy "Admin can update artworks"
  on public.artworks for update
  to authenticated
  using (true);

-- Authenticated users (admin) can delete
create policy "Admin can delete artworks"
  on public.artworks for delete
  to authenticated
  using (true);

-- 5. Auto-update updated_at trigger
create or replace function update_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger artworks_updated_at
  before update on public.artworks
  for each row execute function update_updated_at();

-- 6. Create storage bucket for artwork images
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'artworks',
  'artworks',
  true,
  10485760,
  array['image/jpeg', 'image/png', 'image/webp']
);

-- 7. Storage policies
create policy "Public can view artwork images"
  on storage.objects for select
  using (bucket_id = 'artworks');

create policy "Admin can upload artwork images"
  on storage.objects for insert
  to authenticated
  with check (bucket_id = 'artworks');

create policy "Admin can update artwork images"
  on storage.objects for update
  to authenticated
  using (bucket_id = 'artworks');

create policy "Admin can delete artwork images"
  on storage.objects for delete
  to authenticated
  using (bucket_id = 'artworks');
