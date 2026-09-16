import { redirect } from '@sveltejs/kit';

export const load = async ({ locals }) => {
	const { session, user } = await locals.safeGetSession();
	const supabase = locals.supabase;

	if (session) {
		// Determine role
		// For demo placeholder:
		if (supabase.supabaseUrl && supabase.supabaseUrl.includes('placeholder')) {
			// Redirect to customer dashboard in demo mode by default
			throw redirect(303, '/dashboard');
		}

		// Fetch the user's role from their profile
		const { data: profile } = await supabase
			.from('profiles')
			.select('role')
			.eq('id', user.id)
			.single();

		if (profile?.role === 'admin') {
			throw redirect(303, '/merchant');
		} else {
			throw redirect(303, '/dashboard');
		}
	}

	return {
		authenticated: false
	};
};

