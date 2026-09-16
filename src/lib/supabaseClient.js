import { createBrowserClient } from '@supabase/ssr';
import { env } from '$env/dynamic/public';

/**
 * Creates a Supabase client for the browser.
 * This is a singleton instance created once per browser session.
 */
export const supabase = createBrowserClient(
	env.PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co',
	env.PUBLIC_SUPABASE_ANON_KEY || 'placeholder-anon-key'
);
