import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import mdx from '@mdx-js/rollup'
import { resolve } from 'path'

export default defineConfig({
  plugins: [
    mdx({
      providerImportSource: '@mdx-js/react'
    }),
    react()
  ],
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      formats: ['es', 'cjs'],
      fileName: (format) => `motion.${format}.js`
    },
    sourcemap: true,
    minify: 'esbuild',
    rollupOptions: {
      external: [
        'react',
        'react-dom',
        'remotion',
        '@remotion/core',
        '@remotion/cli',
        '@remotion/media-utils',
        'puppeteer',
        'browserbase',
        '@mdx-js/react',
        '@mdx-js/mdx',
        'zod',
        '@ai-sdk/openai',
        'axios',
        'commander',
        'nanospinner',
        'node-fetch',
        'unsplash-js',
        'yaml'
      ],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
          '@mdx-js/react': 'MDXProvider'
        }
      }
    }
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, './src')
    }
  },
  test: {
    environment: 'jsdom',
    setupFiles: ['./src/test/setup.ts']
  }
})
