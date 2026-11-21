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

-- Add shared study day for existing study pairs. Keep existing accounts and progress.
alter table public.teams add column if not exists study_day integer not null default 1;

-- Shared lesson selector. Any joined team member may choose the common study day.
-- Neither member may write to the other member's individual progress.
create or replace function public.set_study_day(selected_day integer)
returns integer language plpgsql security definer set search_path = '' as $$
declare team_uuid uuid;
begin
  if (select auth.uid()) is null then raise exception 'Authentication required'; end if;
  if selected_day is null or selected_day < 1 or selected_day > 120 then raise exception 'Study day must be 1–120'; end if;
  select team_id into team_uuid from public.profiles where id=(select auth.uid());
  if team_uuid is null then raise exception 'Join a study pair first'; end if;
  update public.teams set study_day=selected_day where id=team_uuid;
  if not found then raise exception 'Study pair no longer exists'; end if;
  return selected_day;
end;
$$;
revoke all on function public.set_study_day(integer) from public, anon;
grant execute on function public.set_study_day(integer) to authenticated;
