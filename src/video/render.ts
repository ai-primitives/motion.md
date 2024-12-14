import { bundle } from '@remotion/bundler'
import { renderMedia, selectComposition } from '@remotion/renderer'
import { getCompositions, renderFrames } from '@remotion/renderer'
import path from 'path'
import { BrowserService, StockService, AIService, AnimationService } from '../services'

interface RenderOptions {
  input: string
  output: string
  fps?: number
  width?: number
  height?: number
}

export async function render({
  input,
  output,
  fps = 30,
  width = 1920,
  height = 1080
}: RenderOptions): Promise<void> {
  // Initialize services
  const browserService = new BrowserService()
  const stockService = new StockService()
  const aiService = new AIService()
  const animationService = new AnimationService()

  // Bundle the video
  const bundled = await bundle(path.join(__dirname, './composition.tsx'))

  // Get the composition
  const compositions = await getCompositions(bundled)
  const composition = compositions.find((c) => c.id === 'Presentation')

  if (!composition) {
    throw new Error('Could not find composition')
  }

  // Render the video
  await renderMedia({
    composition,
    serveUrl: bundled,
    codec: 'h264',
    outputLocation: output,
    inputProps: {
      browserService,
      stockService,
      aiService,
      animationService
    }
  })
}

export async function renderFrame(frame: number, options: RenderOptions): Promise<Buffer> {
  const bundled = await bundle(path.join(__dirname, './composition.tsx'))
  const compositions = await getCompositions(bundled)
  const composition = compositions.find((c) => c.id === 'Presentation')

  if (!composition) {
    throw new Error('Could not find composition')
  }

  const frames = await renderFrames({
    config: composition,
    serveUrl: bundled,
    frameRange: [frame],
    outputDir: path.join(__dirname, '../tmp'),
    inputProps: {
      browserService: new BrowserService(),
      stockService: new StockService(),
      aiService: new AIService(),
      animationService: new AnimationService()
    }
  })

  return frames[0]
}
