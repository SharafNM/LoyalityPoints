import * as server from '../entries/pages/dashboard/_page.server.js';

export const index = 4;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/dashboard/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/dashboard/+page.server.js";
export const imports = ["_app/immutable/nodes/4.DAcpwUQq.js","_app/immutable/chunks/Dp1pzeXC.js","_app/immutable/chunks/Bzak7iHL.js","_app/immutable/chunks/DTXiNgJt.js","_app/immutable/chunks/BzCxegi6.js","_app/immutable/chunks/D6gr4BK9.js","_app/immutable/chunks/DNgsI2PW.js","_app/immutable/chunks/Zxs4QdYM.js","_app/immutable/chunks/CDcuBo6y.js","_app/immutable/chunks/ZscYzhow.js","_app/immutable/chunks/TVMP_qNE.js"];
export const stylesheets = [];
export const fonts = [];
