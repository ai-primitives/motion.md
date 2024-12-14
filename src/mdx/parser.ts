import { renderToString } from 'react-dom/server'
import { MDXProvider } from '@mdx-js/react'
import React from 'react'
import { VFile } from 'vfile'
import matter from 'gray-matter'
import remarkGfm from 'remark-gfm'
import remarkFrontmatter from 'remark-frontmatter'
import { separateSlides, Slide } from './slides'
import { FrontmatterData } from './frontmatter'
import { unified } from 'unified'
import remarkParse from 'remark-parse'
import remarkRehype from 'remark-rehype'
import rehypeRaw from 'rehype-raw'
import rehypeStringify from 'rehype-stringify'

interface MDXParserOptions {
  components?: Record<string, React.ComponentType>
}

interface MDXParseResult {
  content: string
  frontmatter: FrontmatterData
  slides: Slide[]
  code: string
}

export async function parseMDX(content: string, options: MDXParserOptions = {}): Promise<MDXParseResult> {
  try {
    const { data: frontmatter, content: mdxContent } = matter(content)
    const vfile = new VFile(mdxContent)
    const slides = separateSlides(vfile)

    const processedContent = await unified()
      .use(remarkParse)
      .use(remarkGfm)
      .use(remarkFrontmatter)
      .use(remarkRehype, { allowDangerousHtml: true })
      .use(rehypeRaw)
      .use(rehypeStringify)
      .process(mdxContent)

    const htmlContent = String(processedContent)

    const Content = React.createElement('div', {
      dangerouslySetInnerHTML: { __html: htmlContent }
    })

    const rendered = renderToString(
      React.createElement(
        MDXProvider,
        { components: options.components || {} },
        Content
      )
    )

    return {
      content: rendered,
      frontmatter: frontmatter as FrontmatterData,
      slides,
      code: htmlContent
    }

  } catch (err: unknown) {
    console.error('MDX parsing error:', err)
    const message = err instanceof Error ? err.message : String(err)
    throw new Error(`Failed to parse MDX: ${message}`)
  }
}
