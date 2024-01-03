import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import svgr from "vite-plugin-svgr";
import ckeditor5 from "@ckeditor/vite-plugin-ckeditor5";
import { createRequire } from "node:module";
const require = createRequire(import.meta.url);

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), svgr(), ckeditor5({ theme: require.resolve("@ckeditor/ckeditor5-theme-lark") })],
  server: {
    port: 3000,
    proxy: {
      "/api": {
        target: "http://3.34.57.134:5000",
        changeOrigin: true,
        secure: false,
      },
    },
  },
  resolve: {
    alias: [{ find: "@", replacement: path.resolve(__dirname, "src") }],
  },
});
