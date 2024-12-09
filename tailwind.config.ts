import { createRequire } from "node:module";
import { join } from "node:path";
import type { Config } from "npm:tailwindcss";

const require = createRequire(import.meta.url);

import { skeleton } from "@skeletonlabs/tw-plugin";

const config = {
  // Opt for dark mode to be handled via the class method
  darkMode: "class",
  content: [
    "index.html",
    "./src/**/*.{html,js,svelte,ts}",
    join(
      require.resolve("@skeletonlabs/skeleton"),
      "../**/*.{html,js,svelte,ts}",
    ),
  ],
  theme: {
    fontFamily: {
      mono: "SpaceMono",
      display: "Electrolize",
    },
    extend: {
      keyframes: {
        blink: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.3", filter: "blur(1px)" },
        },
      },
      animation: {
        cursor: "blink 0.6s ease infinite"
      },
    },
  },
  plugins: [
    // Append the Skeleton plugin (after other plugins)
    skeleton({
      themes: {
        preset: [
          { name: "skeleton", enhancements: true },
          { name: "wintry", enhancements: true },
          { name: "modern", enhancements: true },
          { name: "rocket", enhancements: true },
          { name: "seafoam", enhancements: true },
          { name: "vintage", enhancements: true },
          { name: "hamlindigo", enhancements: true },
        ],
      },
    }),
  ],
} satisfies Config;

export default config;
