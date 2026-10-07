import * as server from '../entries/pages/_page.server.js';

export const index = 2;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/+page.server.js";
export const imports = ["_app/immutable/nodes/2.AbSenZ1I.js","_app/immutable/chunks/Bzak7iHL.js","_app/immutable/chunks/BzCxegi6.js","_app/immutable/chunks/D6gr4BK9.js","_app/immutable/chunks/TVMP_qNE.js","_app/immutable/chunks/DPvgOvNV.js"];
export const stylesheets = [];
export const fonts = [];
