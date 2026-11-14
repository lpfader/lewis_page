import { createClient } from "@supabase/supabase-js";

const url = import.meta.env.VITE_SUPABASE_URL;
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// The anon key is designed to be public: it only grants what row-level
// security allows, which for this project is "call these four functions and
// nothing else". It is still supplied through env vars so that a local build
// without a project configured keeps working.
export const isConfigured = Boolean(url && anonKey);

export const supabase = isConfigured ? createClient(url, anonKey) : null;
