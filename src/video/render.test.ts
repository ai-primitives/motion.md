import { describe, it, expect, vi } from 'vitest'
import { render } from './render'
import path from 'path'
import type { ParsedMDX } from '../mdx/parser'
import type { BrowserService, StockService, AIService, AnimationService } from '../services'

describe('Video Rendering', () => {
  const mockBrowserService: BrowserService = {
    capture: vi.fn().mockResolvedValue(Buffer.from('mock-screenshot')),
    cleanup: vi.fn().mockResolvedValue(undefined),
  } as unknown as BrowserService

  const mockStockService: StockService = {
    getVideo: vi.fn().mockResolvedValue({ url: 'mock-video-url' }),
    getImage: vi.fn().mockResolvedValue({ url: 'mock-image-url' }),
  } as unknown as StockService

  const mockAIService: AIService = {
    generateVideo: vi.fn().mockResolvedValue('mock-ai-video-url'),
    generateImage: vi.fn().mockResolvedValue('mock-ai-image-url'),
    generateVoiceover: vi.fn().mockResolvedValue(Buffer.from('mock-audio')),
  } as unknown as AIService

  const mockAnimationService: AnimationService = {
    getAnimation: vi.fn().mockReturnValue({ opacity: 1 }),
  } as unknown as AnimationService

  const mockParsedMDX: ParsedMDX = {
    content: '# Test Slide\n\nThis is a test slide',
    slides: ['# Test Slide\n\nThis is a test slide'],
    frontmatter: {},
    slidevConfig: {
      layout: null,
      transition: null
    }
  }

  it('should render a video', async () => {
    const options = {
      input: mockParsedMDX,
      output: path.join(__dirname, '../tmp/test.mp4'),
      fps: 30,
      width: 1920,
      height: 1080,
      services: {
        browser: mockBrowserService,
        stock: mockStockService,
        ai: mockAIService,
        animation: mockAnimationService
      }
    }

    await expect(render(options)).resolves.not.toThrow()
  })
})
