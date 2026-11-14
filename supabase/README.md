# Sunday voting backend

Votes are stored in Supabase (managed Postgres). The browser never touches the
`votes` table directly — row-level security blocks it — and instead calls four
`SECURITY DEFINER` functions:

| Function | Purpose |
|---|---|
| `cast_vote(p_date, p_activity, p_token)` | Insert a vote; duplicates are ignored |
| `retract_vote(p_date, p_activity, p_token)` | Withdraw *your own* vote |
| `vote_summary()` | Aggregated counts, ranked per Sunday |
| `my_votes(p_token)` | Which activities this browser already voted for |

De-duplication is enforced by a unique constraint on
`(sunday_date, activity, voter_token)`. `voter_token` is a random UUID created
once per browser — it stops accidental double-votes from one device, but it is
not authentication.

## One-time setup

1. **Create a project** at [supabase.com](https://supabase.com) (free tier is
   enough). Pick a region close to your visitors.

2. **Run the migration.** Open the project → **SQL Editor** → New query, paste
   the whole of [`migrations/001_votes.sql`](./migrations/001_votes.sql), and
   run it. It creates the table, locks it down, and defines the four functions.

3. **Copy your keys.** Project Settings → API:
   - Project URL, e.g. `https://abcdefgh.supabase.co`
   - `anon` `public` key

4. **Give the build the keys.**

   Local development — create `.env` (git-ignored) from the example:

   ```bash
   cp .env.example .env
   # then paste both values in
   ```

   Production — add them as repository secrets so the deploy workflow can
   inject them:

   ```bash
   gh secret set VITE_SUPABASE_URL
   gh secret set VITE_SUPABASE_ANON_KEY
   ```

   Or in the GitHub UI: **Settings → Secrets and variables → Actions → New
   repository secret**, with exactly those two names.

5. **Rebuild.** Push to `main` (or re-run the deploy workflow). Until the
   secrets exist, the site builds with the localStorage fallback and voting
   keeps working the old way, one device at a time.

## Verifying it works

Open `/votes` after voting. If the counts appear across two different browsers,
the backend is live. If each browser only ever shows its own votes, the site was
built without the env vars — check the secrets and re-run the workflow.

## Why the functions and not plain REST

Supabase would let the browser `SELECT` from `votes` directly. It is disabled on
purpose: rows contain `voter_token`, and exposing them would let anyone list
everyone's voting history. Aggregation happens inside Postgres so the browser
receives counts and nothing else.
