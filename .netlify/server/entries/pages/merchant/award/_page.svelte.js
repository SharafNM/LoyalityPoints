import { e as escape_html, a as attr } from "../../../../chunks/attributes.js";
import "@sveltejs/kit/internal";
import "../../../../chunks/exports.js";
import "../../../../chunks/utils2.js";
import "@sveltejs/kit/internal/server";
import "../../../../chunks/root.js";
import "../../../../chunks/state.svelte.js";
function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let { data } = $$props;
    $$renderer2.push(`<div class="max-w-lg mx-auto p-4 space-y-6"><header class="flex justify-between items-center py-4 border-b"><div><h1 class="text-2xl font-bold text-gray-900">Award Points</h1> <p class="text-gray-500">${escape_html(data.shop?.name || "No shop configured")}</p></div> <a href="/merchant" class="text-sm text-gray-500 hover:text-gray-700">← Back</a></header> `);
    if (data.success) {
      $$renderer2.push(`<!--[0--><p class="p-3 rounded-lg bg-green-50 text-green-800 border border-green-100">Awarded ${escape_html(data.success)} points successfully!</p>`);
    } else {
      $$renderer2.push("<!--[-1-->");
    }
    $$renderer2.push(`<!--]--> `);
    if (data.customer) {
      $$renderer2.push(`<!--[0--><section class="bg-white p-6 rounded-xl border border-gray-200 space-y-4"><div><h2 class="font-semibold text-lg">${escape_html(data.customer.full_name || "Customer")}</h2> <p class="text-sm text-gray-500 break-all">${escape_html(data.customer.id)}</p></div> <form method="POST" action="?/award" class="space-y-4"><input type="hidden" name="customerId"${attr("value", data.customer.id)}/> <div><label for="points" class="block text-sm font-medium text-gray-700 mb-1">Points to award</label> <input id="points" name="points" type="number" min="1" required="" class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition"/></div> <button type="submit" class="w-full py-3 px-4 bg-gray-900 text-white rounded-lg font-medium hover:bg-gray-800 transition">Award Points</button></form></section>`);
    } else {
      $$renderer2.push(`<!--[-1--><section class="bg-white p-6 rounded-xl border border-gray-200 space-y-4"><p class="text-gray-600 text-sm">Scan a customer's QR code, or enter their member ID below.</p> <form method="GET" action="/merchant/award" class="space-y-4"><div><label for="customer" class="block text-sm font-medium text-gray-700 mb-1">Customer ID</label> <input id="customer" name="customer" type="text" placeholder="Paste customer ID" class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition"/></div> <button type="submit" class="w-full py-3 px-4 bg-gray-900 text-white rounded-lg font-medium hover:bg-gray-800 transition">Look Up Customer</button></form></section>`);
    }
    $$renderer2.push(`<!--]--></div>`);
  });
}
export {
  _page as default
};
