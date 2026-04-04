-- ============================================
-- Messages table for contact form
-- Run this in the Supabase SQL Editor
-- ============================================

create table public.messages (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  email text not null,
  message text not null,
  artwork_id uuid references public.artworks(id) on delete set null,
  is_read boolean default false,
  created_at timestamptz default now()
);

-- Anyone can submit a message (public insert)
alter table public.messages enable row level security;

create policy "Anyone can send a message"
  on public.messages for insert
  with check (true);

-- Only authenticated admin can read/update/delete
create policy "Admin can view messages"
  on public.messages for select
  to authenticated
  using (true);

create policy "Admin can update messages"
  on public.messages for update
  to authenticated
  using (true);

create policy "Admin can delete messages"
  on public.messages for delete
  to authenticated
  using (true);
