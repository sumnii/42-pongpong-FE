import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsConfigPaths from "vite-tsconfig-paths";
import { checker } from "vite-plugin-checker";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tsConfigPaths(),
    checker({
      typescript: true,
    }),
  ],
  resolve: {
    extensions: [".tsx", ".ts", ".jsx", ".js"],
    alias: [
      { find: "@unauth", replacement: "src/pages/unauth" },
      { find: "@page", replacement: "src/pages/auth" },
      { find: "@leftSide", replacement: "src/components/leftSide" },
      { find: "@rightSide", replacement: "src/components/rightSide" },
      { find: "@header", replacement: "src/components/header" },
    ],
  },
  esbuild: {
    jsxInject: `import React from "react"`,
  },
  clearScreen: false,
});
