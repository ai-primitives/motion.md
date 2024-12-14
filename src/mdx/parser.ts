import { compile } from '@mdx-js/mdx'
import { renderToString } from 'react-dom/server'
import * as runtime from 'react/jsx-runtime'

export interface MDXParserOptions {
  components?: Record<string, React.ComponentType>
}

export async function parseMDX(content: string, options: MDXParserOptions = {}) {
  try {
    const code = String(await compile(content, {
      jsx: true,
      jsxImportSource: 'react'
    }))

    // TODO: Implement component mapping and rendering
    return {
      code,
      content: await renderToString(code)
    }
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err)
    throw new Error(`Failed to parse MDX: ${message}`)
  }
}
