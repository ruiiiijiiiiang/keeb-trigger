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
    extend: {
      spacing: {},
    },
  },
  plugins: [
    // Append the Skeleton plugin (after other plugins)
    skeleton({
      themes: {
        preset: [{ name: "seafoam", enhancements: true }, "vintage", "rocket"],
      },
    }),
  ],
} satisfies Config;

export default config;
