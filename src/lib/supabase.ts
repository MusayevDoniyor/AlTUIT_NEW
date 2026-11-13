import { createBrowserClient } from "@supabase/ssr";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(
    "Missing Supabase environment variables: NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY",
  );
}

// In the browser, send requests through the same-origin Next.js reverse proxy (/_api/supabase)
// to prevent exposing the raw Supabase backend URL and infrastructure in browser DevTools.
// On the server, connect directly to the upstream Supabase URL.
const resolvedUrl =
  typeof window !== "undefined"
    ? `${window.location.origin}/_api/supabase`
    : supabaseUrl;

export const supabase = createBrowserClient(resolvedUrl, supabaseAnonKey);
