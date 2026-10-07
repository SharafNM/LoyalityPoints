import { createServerClient } from "@supabase/ssr";
import { p as public_env } from "../chunks/shared-server.js";
const handle = async ({ event, resolve }) => {
  const supabaseUrl = public_env.PUBLIC_SUPABASE_URL || "https://placeholder.supabase.co";
  const supabaseAnonKey = public_env.PUBLIC_SUPABASE_PUBLISHABLE_KEY || public_env.PUBLIC_SUPABASE_ANON_KEY || "placeholder-anon-key";
  event.locals.supabase = createServerClient(supabaseUrl, supabaseAnonKey, {
    cookies: {
      getAll: () => event.cookies.getAll(),
      /**
       * SvelteKit's cookies API requires `path` to be explicitly set in
       * the cookie options. Setting a path ensures that the cookie, as well
       * as any of its subpaths, can be accessed.
       */
      setAll: (cookiesToSet) => {
        try {
          cookiesToSet.forEach(({ name, value, options }) => {
            event.cookies.set(name, value, { ...options, path: "/" });
          });
        } catch (error) {
        }
      }
    }
  });
  event.locals.safeGetSession = async () => {
    if (supabaseUrl.includes("placeholder")) {
      return {
        session: { user: { id: "demo-user-123", email: "demo@example.com" } },
        user: { id: "demo-user-123", email: "demo@example.com" }
      };
    }
    const {
      data: { session }
    } = await event.locals.supabase.auth.getSession();
    if (!session) {
      return { session: null, user: null };
    }
    const {
      data: { user },
      error
    } = await event.locals.supabase.auth.getUser();
    if (error) {
      return { session: null, user: null };
    }
    return { session, user };
  };
  return resolve(event, {
    filterSerializedResponseHeaders(name) {
      return name === "content-range" || name === "x-supabase-api-version";
    }
  });
};
export {
  handle
};
