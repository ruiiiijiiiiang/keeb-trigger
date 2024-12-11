import { resolve } from "node:path";
import { defineConfig } from "vite";
import deno from "@deno/vite-plugin";
import { svelte } from "@sveltejs/vite-plugin-svelte";
import { purgeCss } from "vite-plugin-tailwind-purgecss";
import { sveltePhosphorOptimize } from "phosphor-svelte/vite";

// https://vite.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      $fonts: resolve("./public/assets/fonts/"),
    },
  },
  plugins: [deno(), svelte(), purgeCss(), sveltePhosphorOptimize()],
});
