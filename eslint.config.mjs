// eslint.config.mjs
// ESLint 9 flat config for Next.js 16.
// Next.js 16 removed "next lint" — ESLint now runs directly via "eslint ."

import path from "node:path";
import { fileURLToPath } from "node:url";
import js from "@eslint/js";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname  = path.dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
});

export default [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    rules: {
      // Allow plain <img> tags (used for portfolio thumbnails)
      "@next/next/no-img-element": "off",
    },
  },
];
