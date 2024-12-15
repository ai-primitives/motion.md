import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"

export default defineConfig({
  plugins: [react()],
  build: {
    lib: {
      entry: "src/index.ts",
      formats: ["es", "cjs"],
      fileName: (format) => `motion.${format}.js`
    },
    rollupOptions: {
      external: [
        "react",
        "react-dom",
        "remotion",
        "@remotion/core",
        "@remotion/cli",
        "@remotion/media-utils",
        "puppeteer",
        "browserbase",
        "@mdx-js/react",
        "@mdx-js/mdx",
        "zod",
        "@ai-sdk/openai",
        "axios",
        "commander",
        "nanospinner",
        "node-fetch",
        "unsplash-js",
        "yaml"
      ]
    }
  }
})
