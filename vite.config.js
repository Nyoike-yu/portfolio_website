import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// VITE_BASE is only needed for GitHub Pages project sites (e.g. "/my-repo/").
// Vercel, Docker, and user/org Pages sites all serve from "/".
export default defineConfig({
  base: process.env.VITE_BASE || "/",
  plugins: [react()],
});
