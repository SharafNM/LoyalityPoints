import { init } from '../serverless.js';

export const handler = init((() => {
function __memo(fn) {
	let value;
	return () => value ??= (value = fn());
}

return {
	appDir: "_app",
	appPath: "_app",
	assets: new Set([]),
	mimeTypes: {},
	_: {
		client: {start:"_app/immutable/entry/start.DdsW7BZB.js",app:"_app/immutable/entry/app.DMrPUekI.js",imports:["_app/immutable/entry/start.DdsW7BZB.js","_app/immutable/chunks/ZscYzhow.js","_app/immutable/chunks/DTXiNgJt.js","_app/immutable/chunks/BzCxegi6.js","_app/immutable/chunks/CDcuBo6y.js","_app/immutable/entry/app.DMrPUekI.js","_app/immutable/chunks/Dp1pzeXC.js","_app/immutable/chunks/BzCxegi6.js","_app/immutable/chunks/Bzak7iHL.js","_app/immutable/chunks/DTXiNgJt.js","_app/immutable/chunks/D6gr4BK9.js"],stylesheets:[],fonts:[],uses_env_dynamic_public:true},
		nodes: [
			__memo(() => import('../server/nodes/0.js')),
			__memo(() => import('../server/nodes/1.js')),
			__memo(() => import('../server/nodes/2.js')),
			__memo(() => import('../server/nodes/3.js')),
			__memo(() => import('../server/nodes/4.js')),
			__memo(() => import('../server/nodes/5.js')),
			__memo(() => import('../server/nodes/6.js'))
		],
		remotes: {
			
		},
		routes: [
			{
				id: "/",
				pattern: /^\/$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 2 },
				endpoint: null
			},
			{
				id: "/api/auth/initiate",
				pattern: /^\/api\/auth\/initiate\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('../server/entries/endpoints/api/auth/initiate/_server.js'))
			},
			{
				id: "/api/auth/verify",
				pattern: /^\/api\/auth\/verify\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('../server/entries/endpoints/api/auth/verify/_server.js'))
			},
			{
				id: "/auth/confirm",
				pattern: /^\/auth\/confirm\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('../server/entries/endpoints/auth/confirm/_server.js'))
			},
			{
				id: "/claim",
				pattern: /^\/claim\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 3 },
				endpoint: null
			},
			{
				id: "/dashboard",
				pattern: /^\/dashboard\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 4 },
				endpoint: null
			},
			{
				id: "/merchant",
				pattern: /^\/merchant\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 5 },
				endpoint: null
			},
			{
				id: "/merchant/award",
				pattern: /^\/merchant\/award\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 6 },
				endpoint: null
			}
		],
		prerendered_routes: new Set([]),
		matchers: async () => {
			
			return {  };
		},
		server_assets: {}
	}
}
})());
