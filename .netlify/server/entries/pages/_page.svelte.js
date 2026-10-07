import { a as attr } from "../../chunks/attributes.js";
import "../../chunks/supabaseClient.js";
function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let email = "";
    $$renderer2.push(`<div class="flex flex-col items-center justify-center min-h-screen p-6 bg-gray-50"><div class="w-full max-w-md p-8 bg-white rounded-xl shadow-lg border border-gray-100 text-center"><div class="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-4"><svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4"></path></svg></div> `);
    {
      $$renderer2.push(`<!--[0--><h1 class="text-2xl font-bold mb-2">Welcome</h1> <p class="text-gray-500 mb-8">Enter your email to continue.</p> <div class="space-y-4 text-left"><div><label for="email" class="block text-sm font-medium text-gray-700 mb-1">Email Address</label> <input id="email" type="email"${attr("value", email)} placeholder="you@example.com" class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition"/></div> <button${attr("disabled", !email, true)} class="w-full py-3 px-4 bg-gray-900 text-white rounded-lg font-medium hover:bg-gray-800 transition disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center gap-2">`);
      {
        $$renderer2.push(`<!--[-1-->Continue`);
      }
      $$renderer2.push(`<!--]--></button></div>`);
    }
    $$renderer2.push(`<!--]--> `);
    {
      $$renderer2.push("<!--[-1-->");
    }
    $$renderer2.push(`<!--]--></div></div>`);
  });
}
export {
  _page as default
};
