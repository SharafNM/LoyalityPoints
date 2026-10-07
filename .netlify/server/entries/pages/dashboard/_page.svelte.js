import { e as ensure_array_like, a as attr_class } from "../../../chunks/index.js";
import { e as escape_html } from "../../../chunks/attributes.js";
import "@sveltejs/kit/internal";
import "../../../chunks/exports.js";
import "../../../chunks/utils2.js";
import "@sveltejs/kit/internal/server";
import "../../../chunks/root.js";
import "../../../chunks/state.svelte.js";
function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let { data } = $$props;
    $$renderer2.push(`<div class="max-w-3xl mx-auto p-4 space-y-6"><header class="flex justify-between items-center py-4 border-b"><h1 class="text-2xl font-bold">My Rewards</h1> <div class="flex items-center gap-3"><div class="text-sm text-gray-500">${escape_html(data.user.email)}</div> <form method="POST" action="?/signout"><button type="submit" class="text-sm px-3 py-1.5 rounded-lg border border-gray-300 hover:bg-gray-100 transition">Sign out</button></form></div></header> <section class="bg-blue-50 p-6 rounded-xl border border-blue-100 flex flex-col items-center"><h2 class="text-lg font-semibold text-blue-900 mb-2">My Member QR Code</h2> <div class="w-48 h-48 bg-white p-2 rounded-lg flex items-center justify-center">`);
    {
      $$renderer2.push(`<!--[-1--><span class="text-gray-400 text-sm">Loading…</span>`);
    }
    $$renderer2.push(`<!--]--></div> <p class="text-xs text-center text-gray-500 mt-3">Show this code to merchants to claim points manually.</p></section> <section><h2 class="text-xl font-bold mb-4">Points Balance</h2> `);
    if (data.balances.length === 0) {
      $$renderer2.push(`<!--[0--><p class="text-gray-500 italic">You don't have any points yet. Visit a local shop to start earning!</p>`);
    } else {
      $$renderer2.push(`<!--[-1--><div class="grid gap-4 md:grid-cols-2"><!--[-->`);
      const each_array = ensure_array_like(data.balances);
      for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
        let balance = each_array[$$index];
        $$renderer2.push(`<div class="bg-white p-4 rounded-lg shadow-sm border border-gray-200"><h3 class="font-semibold text-lg">${escape_html(balance.shops.name)}</h3> <div class="mt-2 flex items-baseline gap-2"><span class="text-3xl font-bold text-blue-600">${escape_html(balance.points_balance)}</span> <span class="text-gray-500 font-medium">pts</span></div></div>`);
      }
      $$renderer2.push(`<!--]--></div>`);
    }
    $$renderer2.push(`<!--]--></section> <section><h2 class="text-xl font-bold mb-4">Recent Transactions</h2> <div class="bg-white rounded-lg shadow-sm border border-gray-200 divide-y">`);
    if (data.transactions.length === 0) {
      $$renderer2.push(`<!--[0--><p class="p-4 text-gray-500">No recent transactions.</p>`);
    } else {
      $$renderer2.push(`<!--[-1--><!--[-->`);
      const each_array_1 = ensure_array_like(data.transactions);
      for (let $$index_1 = 0, $$length = each_array_1.length; $$index_1 < $$length; $$index_1++) {
        let tx = each_array_1[$$index_1];
        $$renderer2.push(`<div class="p-4 flex justify-between items-center"><div><p class="font-medium text-gray-900">${escape_html(tx.shops.name)}</p> <p class="text-sm text-gray-500">${escape_html(new Date(tx.created_at).toLocaleDateString())}</p></div> <div${attr_class(`font-bold ${tx.type === "EARNED" ? "text-green-600" : "text-red-500"}`)}>${escape_html(tx.type === "EARNED" ? "+" : "-")}${escape_html(tx.points_changed)}</div></div>`);
      }
      $$renderer2.push(`<!--]-->`);
    }
    $$renderer2.push(`<!--]--></div></section></div>`);
  });
}
export {
  _page as default
};
