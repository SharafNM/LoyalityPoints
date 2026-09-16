import { redirect } from '@sveltejs/kit';

export const load = async ({ locals }) => {
	const { session, user } = await locals.safeGetSession();
	const supabase = locals.supabase;

	if (!session) {
		throw redirect(303, '/');
	}

	// For demo placeholder:
	if (supabase.supabaseUrl && supabase.supabaseUrl.includes('placeholder')) {
		return {
			user,
			shop: { name: 'Demo Merchant Shop' },
			recentClaims: []
		};
	}

	// Verify admin role
	const { data: profile } = await supabase
		.from('profiles')
		.select('role')
		.eq('id', user.id)
		.single();

	if (profile?.role !== 'admin') {
		throw redirect(303, '/dashboard');
	}

	// Fetch shop info
	const { data: shop } = await supabase
		.from('shops')
		.select('*')
		.eq('owner_id', user.id)
		.single();

	let recentClaims = [];
	if (shop) {
		const { data } = await supabase
			.from('point_transactions')
			.select('points_changed, created_at, profiles(full_name, phone)')
			.eq('shop_id', shop.id)
			.order('created_at', { ascending: false })
			.limit(10);
		recentClaims = data || [];
	}

	return {
		user,
		shop,
		recentClaims
	};
};
