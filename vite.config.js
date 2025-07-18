import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "path";

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"), // ⬅️ ini penting!
      base: "/navbar-footer-submenuaccount-vue.jsn/",
    },
  },
});
