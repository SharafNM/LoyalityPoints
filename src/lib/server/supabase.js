import { createClient } from '@supabase/supabase-js';
import { env } from '$env/dynamic/private';
import { env as publicEnv } from '$env/dynamic/public';

/**
 * Server-only Supabase client initialized with the Service Role key.
 * 
 * IMPORTANT: This client bypasses Row Level Security (RLS). 
 * Use ONLY for server-side administrative tasks where you need full database access.
 * For user-specific operations, always use `event.locals.supabase` from hooks.server.js.
 */
export const supabaseAdmin = createClient(
	publicEnv.PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co',
	env.SUPABASE_SERVICE_ROLE_KEY || 'placeholder-service-role-key',
	{
		auth: {
			autoRefreshToken: false,
			persistSession: false
		}
	}
);
