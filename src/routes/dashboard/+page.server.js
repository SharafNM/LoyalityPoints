import { redirect } from '@sveltejs/kit';

export const load = async ({ locals }) => {
	const { session, user } = await locals.safeGetSession();
	const supabase = locals.supabase;

	if (!session) {
		throw redirect(303, '/claim'); // or a dedicated login page
	}

	// If using placeholder DB, return dummy data
	if (supabase.supabaseUrl && supabase.supabaseUrl.includes('placeholder')) {
		return {
			user,
			balances: [{ points_balance: 10, shops: { id: 'sample', name: 'Demo Coffee Shop' } }],
			transactions: [{ points_changed: 10, type: 'EARNED', created_at: new Date().toISOString(), shops: { name: 'Demo Coffee Shop' } }]
		};
	}

	// Fetch user's loyalty balances with shop details
	const { data: balances, error: balancesError } = await supabase
		.from('loyalty_balances')
		.select('points_balance, shops(id, name)')
		.eq('user_id', user.id);

	// Fetch recent transactions
	const { data: transactions, error: txError } = await supabase
		.from('point_transactions')
		.select('points_changed, type, created_at, shops(name)')
		.eq('user_id', user.id)
		.order('created_at', { ascending: false })
		.limit(10);

	return {
		user,
		balances: balances || [],
		transactions: transactions || []
	};
};
