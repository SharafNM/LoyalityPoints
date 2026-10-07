import { a as attr, e as escape_html } from "../../../chunks/attributes.js";
import "@sveltejs/kit/internal";
import "../../../chunks/exports.js";
import "../../../chunks/utils2.js";
import "@sveltejs/kit/internal/server";
import "../../../chunks/root.js";
import "../../../chunks/state.svelte.js";
import "../../../chunks/supabaseClient.js";
function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let { data } = $$props;
    let email = "";
    $$renderer2.push(`<div class="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-50"><div class="w-full max-w-md p-6 bg-white rounded-xl shadow-md"><h1 class="text-2xl font-bold text-center mb-4">Claim Your Points</h1> `);
    if (data.authenticated) {
      $$renderer2.push("<!--[0-->");
      if (data.missingParams) {
        $$renderer2.push(`<!--[0--><p class="text-center text-gray-600 mb-6">You are authenticated, but no valid point claim token was provided. Visit a shop to scan a valid QR code!</p> <a href="/dashboard" class="block text-center w-full py-3 px-4 bg-gray-900 text-white rounded-lg font-medium hover:bg-gray-800 transition">Go to Dashboard</a>`);
      } else {
        $$renderer2.push(`<!--[-1--><p class="text-center text-gray-600 mb-6">You are authenticated! Click below to claim your points.</p> <form method="POST" action="?/claim"><input type="hidden" name="shopId"${attr("value", data.shopId)}/> <input type="hidden" name="token"${attr("value", data.token)}/> <button type="submit" class="w-full py-3 px-4 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition">Claim Points Now</button></form>`);
      }
      $$renderer2.push(`<!--]-->`);
    } else {
      $$renderer2.push(`<!--[-1--><p class="text-center text-gray-600 mb-6">`);
      if (data.missingParams) {
        $$renderer2.push(`<!--[0-->Sign in with a Passkey (No password needed) to view your dashboard!`);
      } else {
        $$renderer2.push(`<!--[-1-->Sign in with a Passkey (No password needed) to claim your points!`);
      }
      $$renderer2.push(`<!--]--></p> <div class="space-y-4"><input type="email"${attr("value", email)} placeholder="Enter your email" class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"/> <button${attr("disabled", !email, true)} class="w-full py-3 px-4 bg-gray-900 text-white rounded-lg font-medium hover:bg-gray-800 transition disabled:opacity-50">${escape_html("Sign in with Passkey")}</button> `);
      {
        $$renderer2.push("<!--[-1-->");
      }
      $$renderer2.push(`<!--]--></div>`);
    }
    $$renderer2.push(`<!--]--></div></div>`);
  });
}
export {
  _page as default
};
