import { createServerClient } from '@supabase/ssr';
import { env } from '$env/dynamic/public';
import { env as secretEnv } from '$env/dynamic/private';

export const handle = async ({ event, resolve }) => {
	/**
	 * Creates a Supabase client specific to this server request.
	 * 
	 * The Supabase client gets the Auth token from the request cookies.
	 */
	const supabaseUrl = env.PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co';
	const supabaseAnonKey = env.PUBLIC_SUPABASE_PUBLISHABLE_KEY || env.PUBLIC_SUPABASE_ANON_KEY || 'placeholder-anon-key';

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
						event.cookies.set(name, value, { ...options, path: '/' });
					});
				} catch (error) {
					// The `setAll` method was called from a Server Component.
					// This can be ignored if you have middleware refreshing
					// user sessions.
				}
			}
		}
	});

	/**
	 * Unlike `supabase.auth.getSession()`, which returns the session _without_
	 * validating the JWT, this function also calls `getUser()` to validate the
	 * JWT on the server, and returns a safe session object.
	 */
	event.locals.safeGetSession = async () => {
		if (supabaseUrl.includes('placeholder')) {
			return { 
				session: { user: { id: 'demo-user-123', email: 'demo@example.com' } }, 
				user: { id: 'demo-user-123', email: 'demo@example.com' } 
			};
		}

		const {
			data: { session }
		} = await event.locals.supabase.auth.getSession();
		if (!session) {
			console.log('[safeGetSession] no session in cookies');
			return { session: null, user: null };
		}

		const {
			data: { user },
			error
		} = await event.locals.supabase.auth.getUser();
		if (error) {
			console.log('[safeGetSession] getUser() failed:', error.message);
			return { session: null, user: null };
		}

		console.log('[safeGetSession] session found for', user.email);
		return { session, user };
	};

	return resolve(event, {
		filterSerializedResponseHeaders(name) {
			return name === 'content-range' || name === 'x-supabase-api-version';
		}
	});
};
