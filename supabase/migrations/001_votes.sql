-- 001_votes.sql
-- Sunday activity voting: schema, row-level security, and the functions the
-- frontend is allowed to call.
--
-- Design notes
-- ------------
-- * Row-level security is enabled with NO policies, and anon is explicitly
--   revoked on the table. The browser therefore cannot read, write, or delete
--   rows directly. Everything goes through the SECURITY DEFINER functions
--   below, which is what keeps voter tokens private while still exposing
--   aggregate counts.
-- * The unique constraint on (sunday_date, activity, voter_token) is the
--   de-duplication rule. cast_vote uses ON CONFLICT DO NOTHING, so retries and
--   double taps are idempotent instead of inflating the count.
-- * voter_token is a random UUID minted once per browser. It prevents
--   accidental double-voting from one device. It is NOT authentication and it
--   does not stop someone deliberately voting from several devices.

begin;

create table if not exists public.votes (
  id          bigint generated always as identity primary key,
  sunday_date date        not null,
  activity    text        not null check (length(activity) between 1 and 200),
  voter_token uuid        not null,
  created_at  timestamptz not null default now(),
  constraint votes_one_per_token unique (sunday_date, activity, voter_token)
);

comment on table  public.votes                is 'One row per family vote on a Sunday activity.';
comment on column public.votes.voter_token    is 'Random per-browser UUID; not an identity, only anti-double-tap.';

-- Lock the table down. Without policies, RLS denies everything for anon.
alter table public.votes enable row level security;
revoke all on table public.votes from anon, authenticated;

-- Cast (or ignore a duplicate) vote.
create or replace function public.cast_vote(
  p_date     date,
  p_activity text,
  p_token    uuid
)
returns void
language sql
security definer
set search_path = public
as $$
  insert into public.votes (sunday_date, activity, voter_token)
  values (p_date, p_activity, p_token)
  on conflict on constraint votes_one_per_token do nothing;
$$;

-- Withdraw a vote. Scoped to the token, so a family can only remove its own.
create or replace function public.retract_vote(
  p_date     date,
  p_activity text,
  p_token    uuid
)
returns void
language sql
security definer
set search_path = public
as $$
  delete from public.votes
   where sunday_date = p_date
     and activity    = p_activity
     and voter_token = p_token;
$$;

-- Aggregated results, ranked per Sunday. Never exposes voter tokens.
create or replace function public.vote_summary()
returns table (sunday_date date, activity text, votes bigint)
language sql
security definer
set search_path = public
as $$
  select v.sunday_date,
         v.activity,
         count(*)::bigint as votes
    from public.votes v
   group by v.sunday_date, v.activity
   order by v.sunday_date, count(*) desc, v.activity;
$$;

-- Which activities this particular token has already voted for, so the UI can
-- render the toggle state on reload.
create or replace function public.my_votes(p_token uuid)
returns table (sunday_date date, activity text)
language sql
security definer
set search_path = public
as $$
  select v.sunday_date, v.activity
    from public.votes v
   where v.voter_token = p_token;
$$;

grant execute on function public.cast_vote(date, text, uuid)     to anon, authenticated;
grant execute on function public.retract_vote(date, text, uuid)  to anon, authenticated;
grant execute on function public.vote_summary()                  to anon, authenticated;
grant execute on function public.my_votes(uuid)                  to anon, authenticated;

commit;
