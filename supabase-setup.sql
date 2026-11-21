-- Optional cloud sync for V2, run ONCE in your own Supabase SQL editor.
-- Supabase Auth email/password sign-in must be enabled. Email verification is recommended.

create table if not exists public.teams (
  id uuid primary key default gen_random_uuid(),
  invite_code text unique not null check (char_length(invite_code) between 8 and 24),
  owner_id uuid not null references auth.users(id) on delete cascade,
  created_at timestamptz not null default now()
);
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  display_name text not null default 'Learner',
  team_id uuid references public.teams(id) on delete set null,
  updated_at timestamptz not null default now()
);
create table if not exists public.day_progress (
  user_id uuid not null references auth.users(id) on delete cascade,
  day integer not null check (day between 1 and 120),
  payload jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now(),
  primary key (user_id,day)
);
-- Additional per-user milestone records for shared project scores and video completion.
-- Partner can read these records, but only their owner can edit them.
create table if not exists public.learner_meta (
  user_id uuid primary key references auth.users(id) on delete cascade,
  projects jsonb not null default '{}'::jsonb,
  video_status jsonb not null default '{}'::jsonb,
  active_day integer not null default 1 check (active_day between 1 and 120),
  updated_at timestamptz not null default now()
);
create index if not exists ix_profiles_team on public.profiles(team_id);
create index if not exists ix_day_progress_owner on public.day_progress(user_id);

-- Security-definer checks bypass recursive RLS lookups. Never expose service role keys in a browser.
create or replace function public.can_view_profile(owner_uid uuid)
returns boolean language sql stable security definer set search_path = '' as $$
  select owner_uid = (select auth.uid()) or exists (
    select 1 from public.profiles viewer
    join public.profiles peer on viewer.team_id=peer.team_id
    where viewer.id=(select auth.uid()) and peer.id=owner_uid and viewer.team_id is not null
  );
$$;
create or replace function public.can_view_team(team_uid uuid)
returns boolean language sql stable security definer set search_path = '' as $$
  select exists (select 1 from public.profiles where id=(select auth.uid()) and team_id=team_uid);
$$;

create or replace function public.join_team(invite text)
returns uuid language plpgsql security definer set search_path = '' as $$
declare team_uuid uuid; member_count integer; current_name text;
begin
  if (select auth.uid()) is null then raise exception 'Authentication required'; end if;
  select id into team_uuid from public.teams where invite_code=upper(trim(invite)) for update;
  if team_uuid is null then raise exception 'Invite code not found'; end if;
  select count(*) into member_count from public.profiles where team_id=team_uuid;
  if member_count >= 2 and not exists (select 1 from public.profiles where id=(select auth.uid()) and team_id=team_uuid)
  then raise exception 'This study duo already has two members'; end if;
  select display_name into current_name from public.profiles where id=(select auth.uid());
  insert into public.profiles(id,display_name,team_id) values((select auth.uid()),coalesce(current_name,'Learner'),team_uuid)
  on conflict (id) do update set team_id=excluded.team_id,updated_at=now();
  return team_uuid;
end;
$$;
revoke all on function public.can_view_profile(uuid) from public, anon;
revoke all on function public.can_view_team(uuid) from public, anon;
revoke all on function public.join_team(text) from public, anon;
grant execute on function public.can_view_profile(uuid) to authenticated;
grant execute on function public.can_view_team(uuid) to authenticated;
grant execute on function public.join_team(text) to authenticated;


-- A client may change its display name, but only trusted RPC functions may change team_id.
create or replace function public.block_unsafe_team_edit()
returns trigger language plpgsql set search_path = '' as $$
begin
  if current_user = 'authenticated' then
    if TG_OP = 'INSERT' and new.team_id is not null then raise exception 'Use a study duo invite to join'; end if;
    if TG_OP = 'UPDATE' and new.team_id is distinct from old.team_id then raise exception 'Team changes require an invitation'; end if;
  end if;
  return new;
end;
$$;
drop trigger if exists protect_team_id on public.profiles;
create trigger protect_team_id before insert or update on public.profiles
for each row execute function public.block_unsafe_team_edit();

-- Join or create a duo through SECURITY DEFINER functions, not arbitrary client team_id updates.
create or replace function public.create_team()
returns text language plpgsql security definer set search_path = '' as $$
declare new_code text; team_uuid uuid; previous_team uuid;
begin
  if (select auth.uid()) is null then raise exception 'Authentication required'; end if;
  select team_id into previous_team from public.profiles where id=(select auth.uid());
  if previous_team is not null then
    select invite_code into new_code from public.teams where id=previous_team;
    return new_code;
  end if;
  new_code := upper(substr(replace(pg_catalog.gen_random_uuid()::text,'-',''),1,12));
  insert into public.teams(owner_id, invite_code) values((select auth.uid()),new_code) returning id into team_uuid;
  insert into public.profiles(id, display_name, team_id) values((select auth.uid()),'Learner',team_uuid)
  on conflict (id) do update set team_id=excluded.team_id,updated_at=now();
  return new_code;
end;
$$;
revoke all on function public.create_team() from public, anon;
grant execute on function public.create_team() to authenticated;

-- Give authenticated clients only the table privileges required by this app.
-- RLS policies below restrict these privileges further to the account/duo.
revoke all on public.teams, public.profiles, public.day_progress, public.learner_meta from anon;
grant select on public.teams to authenticated;
grant select,insert,update on public.profiles to authenticated;
grant select,insert,update,delete on public.day_progress to authenticated;
grant select,insert,update,delete on public.learner_meta to authenticated;

alter table public.teams enable row level security;
alter table public.profiles enable row level security;
alter table public.day_progress enable row level security;
alter table public.learner_meta enable row level security;

drop policy if exists teams_select on public.teams;
drop policy if exists teams_insert on public.teams;
drop policy if exists profiles_select on public.profiles;
drop policy if exists profiles_insert on public.profiles;
drop policy if exists profiles_update on public.profiles;
drop policy if exists progress_select on public.day_progress;
drop policy if exists progress_insert on public.day_progress;
drop policy if exists progress_update on public.day_progress;
drop policy if exists progress_delete on public.day_progress;
drop policy if exists meta_select on public.learner_meta;
drop policy if exists meta_insert on public.learner_meta;
drop policy if exists meta_update on public.learner_meta;
drop policy if exists meta_delete on public.learner_meta;

create policy teams_select on public.teams for select to authenticated using(public.can_view_team(id) or owner_id=(select auth.uid()));
create policy teams_insert on public.teams for insert to authenticated with check(owner_id=(select auth.uid()));
create policy profiles_select on public.profiles for select to authenticated using(public.can_view_profile(id));
create policy profiles_insert on public.profiles for insert to authenticated with check(id=(select auth.uid()));
create policy profiles_update on public.profiles for update to authenticated using(id=(select auth.uid())) with check(id=(select auth.uid()));
create policy progress_select on public.day_progress for select to authenticated using(public.can_view_profile(user_id));
create policy progress_insert on public.day_progress for insert to authenticated with check(user_id=(select auth.uid()));
create policy progress_update on public.day_progress for update to authenticated using(user_id=(select auth.uid())) with check(user_id=(select auth.uid()));
create policy progress_delete on public.day_progress for delete to authenticated using(user_id=(select auth.uid()));

-- Important: do not grant INSERT/UPDATE/DELETE on peers' data or publicly open these tables.

-- V2 Competition: allow team peers to view achievements but never modify them.
create policy meta_select on public.learner_meta for select to authenticated
  using (public.can_view_profile(user_id));
create policy meta_insert on public.learner_meta for insert to authenticated
  with check (user_id = (select auth.uid()));
create policy meta_update on public.learner_meta for update to authenticated
  using (user_id = (select auth.uid())) with check (user_id = (select auth.uid()));
create policy meta_delete on public.learner_meta for delete to authenticated
  using (user_id = (select auth.uid()));
