import { h as head } from "../../chunks/index.js";
function html(value) {
  var html2 = String(value);
  var open = "<!---->";
  return open + html2 + "<!---->";
}
const pwaInfo = { "webManifest": { "linkTag": '<link rel="manifest" href="/manifest.webmanifest">' } };
function _layout($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let { children } = $$props;
    head("12qhfyh", $$renderer2, ($$renderer3) => {
      if (pwaInfo) {
        $$renderer3.push(`<!--[0-->${html(pwaInfo.webManifest.linkTag)}`);
      } else {
        $$renderer3.push("<!--[-1-->");
      }
      $$renderer3.push(`<!--]-->`);
    });
    $$renderer2.push(`<main class="min-h-screen bg-gray-50 text-gray-900 font-sans">`);
    children($$renderer2);
    $$renderer2.push(`<!----></main>`);
  });
}
export {
  _layout as default
};
