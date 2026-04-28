// postcss.config.mjs
// Tailwind v4 uses its own PostCSS plugin — no autoprefixer needed.
// autoprefixer is built into Tailwind v4's engine.
const config = {
  plugins: {
    "@tailwindcss/postcss": {},
  },
};
export default config;
