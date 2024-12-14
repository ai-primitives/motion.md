import { bundle } from '@remotion/bundler'
import { renderMedia, getCompositions, renderFrames } from '@remotion/renderer'
import type { RenderFramesOptions, RenderFramesOutput, OnStartData } from '@remotion/renderer'
import type { VideoConfig } from 'remotion'
import path from 'path'
import { readFile } from 'fs/promises'
import { BrowserService, StockService, AIService, AnimationService } from '../services'

interface RenderOptions {
  input: string
  output: string
  fps?: number
  width?: number
  height?: number
  onProgress?: (progress: number) => void
}

interface RenderProgress {
  framesRendered: number
  totalFrames: number
  timeElapsed: number
}

export async function render(options: RenderOptions): Promise<void> {
  const { input, output, fps = 30, width = 1920, height = 1080, onProgress } = options

  try {
    const markdown = await readFile(input, 'utf-8')

    const browserService = new BrowserService()
    const stockService = new StockService()
    const aiService = new AIService()
    const animationService = new AnimationService()

    const bundled = await bundle(path.join(__dirname, './composition.tsx'))

    const compositions = await getCompositions(bundled)
    const composition = compositions.find((c) => c.id === 'Presentation')

    if (!composition) {
      throw new Error('Could not find composition')
    }

    const videoConfig: VideoConfig = {
      ...composition,
      id: 'Presentation',
      defaultProps: {},
      props: {
        browserService,
        stockService,
        aiService,
        animationService,
        markdown,
      },
      defaultCodec: 'h264',
    }

    await renderMedia({
      composition: videoConfig,
      serveUrl: bundled,
      codec: 'h264',
      outputLocation: output,
      inputProps: {
        browserService,
        stockService,
        aiService,
        animationService,
        markdown,
      },
    })
  } catch (err) {
    if (err instanceof Error) {
      throw new Error(`Video rendering failed: ${err.message}`)
    }
    throw new Error(`Failed to render video: ${String(err)}`)
  }
}

export async function renderFrame(frame: number, options: RenderOptions): Promise<Buffer> {
  const { input, fps = 30, width = 1920, height = 1080 } = options

  try {
    const markdown = await readFile(input, 'utf-8')
    const bundled = await bundle(path.join(__dirname, './composition.tsx'))
    const compositions = await getCompositions(bundled)
    const composition = compositions.find((c) => c.id === 'Presentation')

    if (!composition) {
      throw new Error('Could not find composition')
    }

    const videoConfig: VideoConfig = {
      ...composition,
      id: 'Presentation',
      defaultProps: {},
      props: {
        browserService: new BrowserService(),
        stockService: new StockService(),
        aiService: new AIService(),
        animationService: new AnimationService(),
        markdown,
      },
      defaultCodec: 'h264',
    }

    let startTime = Date.now()
    let progress: RenderProgress = {
      framesRendered: 0,
      totalFrames: 1,
      timeElapsed: 0,
    }

    const renderOptions: RenderFramesOptions = {
      composition: videoConfig,
      serveUrl: bundled,
      frameRange: [frame, frame],
      outputDir: path.join(__dirname, '../tmp'),
      inputProps: videoConfig.props,
      imageFormat: 'png',
      logLevel: 'verbose',
      chromiumOptions: {
        headless: true,
      },
      onStart: (data: OnStartData) => {
        progress.totalFrames = data.frameCount
        startTime = Date.now()
      },
      onFrameUpdate: (framesRendered: number, frameIndex: number, timeToRender: number) => {
        progress = {
          framesRendered,
          totalFrames: progress.totalFrames,
          timeElapsed: Date.now() - startTime,
        }
      },
    }

    const frames = await renderFrames(renderOptions)
    if (!Array.isArray(frames) || frames.length === 0) {
      throw new Error('No frame data returned')
    }
    return Buffer.from(frames[0])
  } catch (err) {
    if (err instanceof Error) {
      throw new Error(`Frame rendering failed: ${err.message}`)
    }
    throw new Error(`Failed to render frame: ${String(err)}`)
  }
}
