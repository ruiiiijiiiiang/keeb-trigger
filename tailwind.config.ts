import { createRequire } from "node:module";
const require = createRequire(import.meta.url);

import * as path from "node:path";
import type { Config } from "npm:tailwindcss";

import { skeleton } from "@skeletonlabs/tw-plugin";

const config = {
  // Opt for dark mode to be handled via the class method
  darkMode: "class",
  content: [
    "index.html",
    "./src/**/*.{html,js,svelte,ts}",
    path.join(
      require.resolve("@skeletonlabs/skeleton"),
      "../**/*.{html,js,svelte,ts}",
    ),
  ],
  theme: {
    fontFamily: {
      mono: "SpaceMono",
    },
    extend: {
      keyframes: {
        blink: {
          "0%, 100%": { opacity: 1 },
          "50%": { opacity: 0 }
        },
      },
      animation: {
        blink: "blink 0.7s step-end infinite"
      },
    },
  },
  plugins: [
    // Append the Skeleton plugin (after other plugins)
    skeleton({
      themes: {
        preset: [
          { name: "seafoam", enhancements: true },
          { name: "vintage", enhancements: true },
        ],
      },
    }),
  ],
} satisfies Config;

export default config;
