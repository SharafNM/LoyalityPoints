import * as server from '../entries/pages/claim/_page.server.js';

export const index = 3;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/claim/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/claim/+page.server.js";
export const imports = ["_app/immutable/nodes/3.QsgN2cYa.js","_app/immutable/chunks/Bzak7iHL.js","_app/immutable/chunks/BzCxegi6.js","_app/immutable/chunks/D6gr4BK9.js","_app/immutable/chunks/Zxs4QdYM.js","_app/immutable/chunks/CDcuBo6y.js","_app/immutable/chunks/DTXiNgJt.js","_app/immutable/chunks/ZscYzhow.js","_app/immutable/chunks/TVMP_qNE.js","_app/immutable/chunks/DPvgOvNV.js"];
export const stylesheets = [];
export const fonts = [];
