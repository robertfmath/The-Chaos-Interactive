/// <reference types="vitest/config" />
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  base: "/The-Chaos-Interactive/",
  plugins: [react()],
  server: {
    open: true,
    port: 3000,
  },
  test: {
    environment: "jsdom",
    setupFiles: "src/tests/vitest-setup.ts",
    coverage: {
      include: ["src/**/*.{ts,tsx}"],
      exclude: [
        "src/tests/**",
        "src/main.tsx",
        "src/vite-env.d.ts",
        "src/types.ts",
      ],
    },
  },
});
