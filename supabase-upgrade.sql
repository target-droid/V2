-- Existing V2 cloud users who ALREADY ran supabase-setup.sql can run this ONCE.
-- New users should run ONLY the complete supabase-setup.sql instead.
create table if not exists public.learner_meta (
  user_id uuid primary key references auth.users(id) on delete cascade,
  projects jsonb not null default '{}'::jsonb,
  video_status jsonb not null default '{}'::jsonb,
  active_day integer not null default 1 check (active_day between 1 and 120),
  updated_at timestamptz not null default now()
);
revoke all on public.learner_meta from anon;
grant select, insert, update, delete on public.learner_meta to authenticated;
alter table public.learner_meta enable row level security;
drop policy if exists meta_select on public.learner_meta;
drop policy if exists meta_insert on public.learner_meta;
drop policy if exists meta_update on public.learner_meta;
drop policy if exists meta_delete on public.learner_meta;
create policy meta_select on public.learner_meta for select to authenticated using (public.can_view_profile(user_id));
create policy meta_insert on public.learner_meta for insert to authenticated with check (user_id = (select auth.uid()));
create policy meta_update on public.learner_meta for update to authenticated using (user_id = (select auth.uid())) with check (user_id = (select auth.uid()));
create policy meta_delete on public.learner_meta for delete to authenticated using (user_id = (select auth.uid()));
