import * as server from '../entries/pages/merchant/_page.server.js';

export const index = 5;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/merchant/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/merchant/+page.server.js";
export const imports = ["_app/immutable/nodes/5.BVB57FiK.js","_app/immutable/chunks/Bzak7iHL.js","_app/immutable/chunks/BzCxegi6.js","_app/immutable/chunks/D6gr4BK9.js","_app/immutable/chunks/DNgsI2PW.js"];
export const stylesheets = [];
export const fonts = [];
