import { render } from '../video/render'
import { createSpinner } from 'nanospinner'

interface RenderOptions {
  output?: string
  fps?: number
  width?: number
  height?: number
}

export async function renderCommand(input: string, options: RenderOptions = {}) {
  const spinner = createSpinner('Generating video...').start()

  try {
    await render({
      input,
      output: options.output || input.replace(/\.md$/, '.mp4'),
      fps: options.fps || 30,
      width: options.width || 1920,
      height: options.height || 1080,
    })
    spinner.success({ text: 'Video generated successfully!' })
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err)
    spinner.error({ text: `Error generating video: ${message}` })
    process.exit(1)
  }
}
