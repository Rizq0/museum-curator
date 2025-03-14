import path from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    proxy: {
      "/harvard": {
        target: "https://api.harvardartmuseums.org",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/harvard/, ""),
      },
      "/cleveland": {
        target: "https://openaccess-api.clevelandart.org/api",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/cleveland/, ""),
      },
      "/backend": {
        target: "https://museum-curator-api.onrender.com/api",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/backend/, ""),
      },
    },
  },
});
