import { supabase, isConfigured } from "./supabase";

// Per-browser identity for vote de-duplication. Not authentication.
const TOKEN_KEY = "voter_token";

// Fallback store used only when no Supabase project is configured, so that a
// build without env vars still behaves the way the old site did. Not year
// specific: the Sunday date itself is part of every entry.
const LOCAL_KEY = "parent_votes_fallback";

export function getVoterToken() {
  let token = localStorage.getItem(TOKEN_KEY);
  if (!token) {
    token =
      typeof crypto !== "undefined" && crypto.randomUUID
        ? crypto.randomUUID()
        : `fallback-${Date.now()}-${Math.random().toString(16).slice(2)}`;
    localStorage.setItem(TOKEN_KEY, token);
  }
  return token;
}

function readLocal() {
  try {
    return JSON.parse(localStorage.getItem(LOCAL_KEY) || "{}");
  } catch {
    return {};
  }
}

function writeLocal(value) {
  localStorage.setItem(LOCAL_KEY, JSON.stringify(value));
}

/**
 * Aggregated counts, newest Sunday first.
 * Returns [{ sunday_date: "2026-01-04", activity: "Zoo", votes: 3 }]
 */
export async function getSummary() {
  if (!isConfigured) {
    const local = readLocal();
    const rows = [];
    for (const [sunday_date, activities] of Object.entries(local)) {
      for (const [activity, votes] of Object.entries(activities)) {
        rows.push({ sunday_date, activity, votes });
      }
    }
    return rows.sort(
      (a, b) =>
        a.sunday_date.localeCompare(b.sunday_date) || b.votes - a.votes
    );
  }

  const { data, error } = await supabase.rpc("vote_summary");
  if (error) throw new Error(error.message);
  return data ?? [];
}

/**
 * The activities this browser has already voted for, as `date|activity` keys.
 */
export async function getMyVotes() {
  if (!isConfigured) {
    const local = readLocal();
    const keys = new Set();
    for (const [sunday_date, activities] of Object.entries(local)) {
      for (const activity of Object.keys(activities)) {
        keys.add(`${sunday_date}|${activity}`);
      }
    }
    return keys;
  }

  const { data, error } = await supabase.rpc("my_votes", {
    p_token: getVoterToken(),
  });
  if (error) throw new Error(error.message);
  return new Set((data ?? []).map((r) => `${r.sunday_date}|${r.activity}`));
}

export async function castVote(sundayDate, activity) {
  if (!isConfigured) {
    const local = readLocal();
    if (!local[sundayDate]) local[sundayDate] = {};
    local[sundayDate][activity] = (local[sundayDate][activity] || 0) + 1;
    writeLocal(local);
    return;
  }

  const { error } = await supabase.rpc("cast_vote", {
    p_date: sundayDate,
    p_activity: activity,
    p_token: getVoterToken(),
  });
  if (error) throw new Error(error.message);
}

export async function retractVote(sundayDate, activity) {
  if (!isConfigured) {
    const local = readLocal();
    const count = local[sundayDate]?.[activity];
    if (count) {
      if (count <= 1) delete local[sundayDate][activity];
      else local[sundayDate][activity] = count - 1;
      if (Object.keys(local[sundayDate]).length === 0) delete local[sundayDate];
      writeLocal(local);
    }
    return;
  }

  const { error } = await supabase.rpc("retract_vote", {
    p_date: sundayDate,
    p_activity: activity,
    p_token: getVoterToken(),
  });
  if (error) throw new Error(error.message);
}
