import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import eslintReact from "eslint-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), eslintReact()],
});
