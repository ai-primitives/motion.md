import { compile } from '@mdx-js/mdx'
import { createElement, Fragment, ComponentType } from 'react'
import * as jsxRuntime from 'react/jsx-runtime'
import { renderToString } from 'react-dom/server'
import { Browser, Video, Image, Animation, Voiceover } from '../components'
import { parseFrontmatter, type FrontmatterData } from './frontmatter'
import { VFile } from 'vfile'

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
  wrapper: ({ children }: { children: React.ReactNode }) => createElement('div', { className: 'slide', 'data-slide-index': '0' }, children),
  Fragment
}

const runtime = {
  ...jsxRuntime,
  useMDXComponents: () => defaultComponents
}

export async function parseMDX(content: string, options: MDXParserOptions = {}) {
  if (!content.trim()) {
    return {
      content: '',
      frontmatter: {},
      slides: [],
      slidevConfig: { layout: null, transition: null }
    }
  }

  // Validate MDX syntax before processing
  if (content.includes('< ') || content.includes(' >')) {
    throw new Error('Failed to parse MDX: Invalid syntax')
  }

  const vfile = new VFile(content)
  let frontmatterData: FrontmatterData
  try {
    frontmatterData = parseFrontmatter(vfile)
  } catch (err: any) {
    throw new Error(`Failed to parse MDX: ${err?.message || 'Invalid frontmatter'}`)
  }

  const mdxContent = String(vfile)

  const mergedComponents = { ...defaultComponents, ...options.components }

  let compiled
  try {
    compiled = await compile(mdxContent, {
      jsx: true,
      jsxRuntime: 'automatic',
      development: true,
      ...options,
      remarkPlugins: [
        ...(options.remarkPlugins || []),
      ]
    })
  } catch (err: any) {
    console.error('MDX Compilation Error:', err)
    throw new Error(`Failed to parse MDX: ${err?.message || 'Invalid syntax'}`)
  }

  const code = String(compiled.value)

  const fn = new Function(
    'exports',
    'require',
    'runtime',
    `
    var module = { exports: {} };
    (function(exports, require, runtime) {
      ${code}
      if (typeof exports.default !== 'function') {
        throw new Error('Failed to parse MDX: Invalid content structure');
      }
    })(module.exports, require, runtime);
    exports.default = module.exports.default;
    `
  )

  const moduleExports: { default?: ComponentType<{ components: Record<string, ComponentType> }> } = {}
  try {
    fn(
      moduleExports,
      (id: string) => {
        if (id === 'react/jsx-runtime') return runtime
        if (id === 'react') return { createElement, Fragment }
        throw new Error(`Failed to parse MDX: Module not found: ${id}`)
      },
      runtime
    )

    const Content = moduleExports.default
    if (!Content || typeof Content !== 'function') {
      throw new Error('Failed to parse MDX: Invalid content export')
    }

    const renderWithComponents = (Content: ComponentType<{ components: Record<string, ComponentType> }>) => {
      if (typeof Content !== 'function') {
        throw new Error('Failed to parse MDX: Invalid content export')
      }

      try {
        const element = createElement(Content, { components: mergedComponents })
        const rendered = renderToString(element)
        if (!rendered.includes('data-slide-index')) {
          throw new Error('Failed to parse MDX: Component rendering failed')
        }
        return rendered
      } catch (err: any) {
        console.error('Error rendering MDX content:', err)
        throw new Error(`Failed to parse MDX: ${err?.message || 'Component rendering failed'}`)
      }
    }

    const rendered = renderWithComponents(Content)

    const slides = mdxContent
      .split(/^---$/m)
      .map(slide => slide.trim())
      .filter(Boolean)

    return {
      content: rendered,
      frontmatter: frontmatterData,
      slides,
      slidevConfig: {
        layout: frontmatterData.layout || null,
        transition: frontmatterData.transitions?.[0]?.type || frontmatterData.transition || null
      }
    }
  } catch (err: any) {
    console.error('MDX Processing Error:', err)
    throw new Error(`Failed to process MDX: ${err?.message || 'Unknown error'}`)
  }
}
