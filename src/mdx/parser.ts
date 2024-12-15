import { compile } from '@mdx-js/mdx'
import { renderToString } from 'react-dom/server'
import * as runtime from 'react/jsx-runtime'
import remarkFrontmatter from 'remark-frontmatter'
import remarkGfm from 'remark-gfm'
import rehypeRaw from 'rehype-raw'
import { VFile } from 'vfile'
import { parseFrontmatter } from './frontmatter'
import { separateSlides } from './slides'
import { parseSlidevSyntax } from './slidev'
import { Browser, Video, Image, Animation, Voiceover } from '../components'
import { ComponentType, createElement } from 'react'

export interface MDXParserOptions {
  components?: Record<string, ComponentType>
  remarkPlugins?: any[]
  rehypePlugins?: any[]
}

const defaultComponents = {
  Browser,
  Video,
  Image,
  Animation,
  Voiceover,
}

export async function parseMDX(content: string, options: MDXParserOptions = {}) {
  try {
    const vfile = new VFile(content)
    const frontmatter = parseFrontmatter(vfile)
    const slidevConfig = parseSlidevSyntax(vfile)
    const slides = separateSlides(vfile)

    const code = String(
      await compile(content, {
        jsx: true,
        jsxImportSource: 'react',
        remarkPlugins: [
          remarkFrontmatter,
          remarkGfm,
          ...(options.remarkPlugins || [])
        ],
        rehypePlugins: [
          rehypeRaw,
          ...(options.rehypePlugins || [])
        ],
        development: false,
        providerImportSource: '@mdx-js/react'
      })
    )

    const { default: Content } = await eval(
      `(async () => {
        const exports = {};
        const module = { exports };
        const runtime = ${JSON.stringify({ ...runtime, createElement })};
        ${code}
        return module.exports;
      })()`
    )

    if (!Content || typeof Content !== 'function') {
      throw new Error('Failed to compile MDX: Invalid content export')
    }

    const mergedComponents = {
      ...defaultComponents,
      ...(options.components || {})
    }

    const rendered = renderToString(createElement(Content, { components: mergedComponents }))

    if (!rendered) {
      throw new Error('Failed to render MDX content')
    }

    return {
      code,
      content: rendered,
      frontmatter,
      slidevConfig,
      slides
    }
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err)
    throw new Error(`Failed to parse MDX: ${message}`)
  }
}
