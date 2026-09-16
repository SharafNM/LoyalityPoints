import { error, redirect } from '@sveltejs/kit';
import { supabaseAdmin } from '$lib/server/supabase';

export const load = async ({ url, locals }) => {
	const shopId = url.searchParams.get('shop');
	const token = url.searchParams.get('token');

	const missingParams = !shopId || !token;

	const { session } = await locals.safeGetSession();

	// If unauthenticated, they'll see the page and be prompted to sign in / create passkey
	if (!session) {
		return {
			authenticated: false,
			missingParams,
			shopId,
			token
		};
	}

	return {
		authenticated: true,
		missingParams,
		shopId,
		token
	};
};

export const actions = {
	claim: async ({ request, locals }) => {
		const data = await request.formData();
		const shopId = data.get('shopId');
		const token = data.get('token'); // In a real app, you would validate this token against a database of issued claims
		
		const { session, user } = await locals.safeGetSession();
		
		if (!session || !user) {
			throw error(401, 'You must be logged in to claim points.');
		}
		
		if (!shopId) {
			throw error(400, 'Invalid shop.');
		}

		// Validation of token logic here...
		// e.g. check if token is valid and unused in `claim_tokens` table.
		// For this example, let's assume it's valid and grants 10 points.
		const pointsToAward = 10; 

		// Check if we are using the placeholder database url
		if (supabaseAdmin.supabaseUrl && supabaseAdmin.supabaseUrl.includes('placeholder')) {
			console.log('Demo Mode: Bypassing actual database point claim');
		} else {
			// Use the admin client to call the secure RPC.
			const { error: rpcError } = await supabaseAdmin.rpc('award_points', {
				p_user_id: user.id,
				p_shop_id: shopId,
				p_points: pointsToAward
			});

			if (rpcError) {
				console.error('Error awarding points:', rpcError);
				throw error(500, 'Failed to claim points.');
			}
		}

		// Invalidate token logic would go here.

		throw redirect(303, '/dashboard?claim=success');
	}
};
