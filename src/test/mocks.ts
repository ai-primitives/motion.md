import { BrowserService, StockService, AIService, AnimationService } from '../services'
import type { BrowserbaseConfig, StockConfig, AIConfig, AnimationConfig } from '../services'

export class MockBrowserService extends BrowserService {
  constructor(config: BrowserbaseConfig = {}) {
    super(config)
  }

  async capture(url: string): Promise<Buffer> {
    if (url.includes('nonexistent')) {
      throw new Error('Failed to capture screenshot: Page not found')
    }
    return Buffer.from([0, 1, 2, 3]) // Mock screenshot data
  }
}

export class MockStockService extends StockService {
  constructor(config: StockConfig) {
    super(config)
  }

  async getImage(
    query: string,
    quality: 'regular' | 'full' | 'thumb' = 'regular',
  ): Promise<{
    url: string
    credit: string
    title: string
    width: number
    height: number
  }> {
    return {
      url: 'https://example.com/mock-image.jpg',
      credit: 'Photo by Mock Photographer on Unsplash',
      title: 'Mock Image',
      width: 1920,
      height: 1080,
    }
  }

  async getVideo(
    query: string,
    quality: '4k' | 'hd' | 'preview' = '4k',
  ): Promise<{
    url: string
    preview: string
    thumbnail: string
    title: string
    duration: number
  }> {
    return {
      url: 'https://example.com/mock-video.mp4',
      preview: 'https://example.com/mock-video-preview.mp4',
      thumbnail: 'https://example.com/mock-video-thumb.jpg',
      title: 'Mock Video',
      duration: 30,
    }
  }
}

export class MockAIService extends AIService {
  constructor(config: AIConfig) {
    super(config)
  }

  async generateVoiceover(text: string): Promise<Buffer> {
    return Buffer.from(new ArrayBuffer(8)) // Mock audio data
  }

  async generateImage(prompt: string): Promise<string> {
    return 'https://example.com/mock-ai-image.jpg'
  }

  async generateVideo(prompt: string): Promise<string> {
    return 'https://example.com/mock-ai-video.mp4'
  }
}

export class MockAnimationService extends AnimationService {
  constructor(config: AnimationConfig) {
    super(config)
  }

  getAnimation(name: string, frame: number, options?: { duration?: number; easing?: string }) {
    const duration = options?.duration || 1
    const frameRange = [0, this.fps * duration]

    switch (name) {
      case 'fadeIn':
        return {
          opacity: 0.5, // Mock interpolated value
        }
      case 'scale':
        return {
          transform: 'scale(1.5)', // Mock interpolated value
        }
      case 'slideIn':
        return {
          transform: 'translateX(-50%)', // Mock interpolated value
        }
      case 'rotate':
        return {
          transform: 'rotate(180deg)', // Mock interpolated value
        }
      default:
        throw new Error(`Animation "${name}" not found`)
    }
  }
}
