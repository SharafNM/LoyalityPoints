import { createBrowserClient } from "@supabase/ssr";
import { p as public_env } from "./shared-server.js";
createBrowserClient(
  public_env.PUBLIC_SUPABASE_URL || "https://placeholder.supabase.co",
  public_env.PUBLIC_SUPABASE_PUBLISHABLE_KEY || public_env.PUBLIC_SUPABASE_ANON_KEY || "placeholder-anon-key"
);
