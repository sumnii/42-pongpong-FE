import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import tsConfigPaths from "vite-tsconfig-paths"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tsConfigPaths()],
  resolve: {
    extensions: [".tsx", ".ts", ".jsx", ".js"],
    alias: [
      { find: "@main", replacement: "src/pages/main" },
      { find: "@chatList", replacement: "src/pages/chatList" },
      { find: "@gameList", replacement: "src/pages/gameList" },
      { find: "@chatRoom", replacement: "src/pages/chatRoom" },
      { find: "@gameRoom", replacement: "src/pages/gameRoom" },
      { find: "@signIn", replacement: "src/pages/signIn" },
      { find: "@signUp", replacement: "src/pages/signUp" },
      { find: "@auth", replacement: "src/pages/auth" },
      { find: "@unAuth", replacement: "src/pages/unAuth" },
      { find: "@leftSide", replacement: "src/components/leftSide" },
      { find: "@rightSide", replacement: "src/components/rightSide" },
      { find: "@centerHeader", replacement: "src/components/centerHeader" },
      { find: "@style", replacement: "src/style" },
    ],
  },
  esbuild: {
    jsxInject: `import React from "react"`,
  },
})
