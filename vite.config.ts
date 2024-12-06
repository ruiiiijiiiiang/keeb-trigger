import { defineConfig } from "vite";
import deno from "@deno/vite-plugin";
import { svelte } from "@sveltejs/vite-plugin-svelte";
import { resolve } from "node:path";

// https://vite.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      $fonts: resolve("./public/assets/fonts/")
    },
  },
  plugins: [deno(), svelte()],
});
