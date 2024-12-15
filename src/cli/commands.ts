import { existsSync, readFileSync } from 'fs'
import { resolve } from 'path'
import { createSpinner } from 'nanospinner'
import { render } from '../video/render'
import { parseMDX } from '../mdx/parser'
import { parseFrontmatter } from '../mdx/frontmatter'
import { initializeServices, type ServiceConfig } from '../services'
import { VFile } from 'vfile'

interface RenderOptions {
  output?: string
  fps?: number
  width?: number
  height?: number
  config?: ServiceConfig
}

export async function renderCommand(input: string, options: RenderOptions = {}) {
  const spinner = createSpinner('Initializing services...').start()

  try {
    // Validate input file
    const inputPath = resolve(input)
    if (!existsSync(inputPath)) {
      throw new Error(`Input file not found: ${input}`)
    }

    // Parse MDX and frontmatter
    spinner.update({ text: 'Parsing markdown content...' })
    const mdxContent = readFileSync(inputPath, 'utf-8')
    const vfile = new VFile(mdxContent)
    const parsedMDX = await parseMDX(vfile)
    const frontmatter = parseFrontmatter(vfile)

    // Initialize services with default config if none provided
    const services = initializeServices(options.config || {})

    // Configure video settings
    const videoConfig = {
      input: parsedMDX,
      output: options.output || input.replace(/\.md$/, '.mp4'),
      fps: options.fps || frontmatter.fps || 30,
      width: options.width || frontmatter.width || 1920,
      height: options.height || frontmatter.height || 1080,
      services,
    }

    // Generate video
    spinner.update({ text: 'Generating video...' })
    await render(videoConfig)

    spinner.success({ text: 'Video generated successfully!' })
    await services.browser.cleanup()
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err)
    spinner.error({ text: `Error generating video: ${message}` })
    process.exit(1)
  }
}
