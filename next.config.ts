// next.config.ts — Next.js 16
// Turbopack is now the default bundler (next dev uses it automatically).
// "next lint" is removed in v16 — use "eslint ." instead (see package.json scripts).

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "picsum.photos" },
    ],
  },
};

export default nextConfig;
