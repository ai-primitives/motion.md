import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { MotionComposition } from './composition'
import { initializeServices } from '../services'
import type { Services } from '../services/types'

// Mock services
vi.mock('../services', () => ({
  initializeServices: vi.fn().mockReturnValue({
    browser: {
      capture: vi.fn().mockResolvedValue(Buffer.from('test-screenshot')),
      cleanup: vi.fn().mockResolvedValue(undefined),
    },
    stock: {
      getImage: vi.fn().mockResolvedValue({ url: 'https://example.com/image.jpg', credit: 'Test User' }),
      getVideo: vi.fn().mockResolvedValue({ url: 'https://example.com/video.mp4' }),
    },
    ai: {
      generateImage: vi.fn().mockResolvedValue('https://example.com/generated.png'),
      generateVideo: vi.fn().mockResolvedValue('https://example.com/generated.mp4'),
      generateVoiceover: vi.fn().mockResolvedValue(Buffer.from('test-audio')),
      config: {
        apiKey: 'test-key',
        modelName: 'gpt-4',
      },
    },
    animation: {
      getAnimation: vi.fn().mockReturnValue({ opacity: 0.5, transform: 'translateX(0)' }),
    },
  }),
}))

describe('MotionComposition', () => {
  let mockServices: Services

  beforeEach(() => {
    vi.clearAllMocks()
    mockServices = initializeServices({
      browser: { headless: true },
      stock: {
        unsplashAccessKey: 'test-key',
        storyblocksApiKey: 'test-key'
      },
      ai: {
        apiKey: 'test-key',
        modelName: 'gpt-4'
      },
      animation: { fps: 30 }
    })
  })

  it('should render without crashing', () => {
    const { container } = render(<MotionComposition />)
    expect(container).toBeDefined()
    expect(initializeServices).toHaveBeenCalled()
  })

  it('should initialize services with correct configuration', () => {
    render(<MotionComposition />)
    expect(initializeServices).toHaveBeenCalledWith({
      browser: expect.any(Object),
      stock: expect.any(Object),
      ai: expect.any(Object),
      animation: expect.any(Object),
    })
  })

  describe('Service Integration', () => {
    it('should handle image generation', async () => {
      const { container } = render(<MotionComposition />)
      const generateButton = screen.getByText('Generate Image')
      await fireEvent.click(generateButton)
      expect(container.querySelector('img')).toBeDefined()
    })

    it('should handle video generation', async () => {
      const { container } = render(<MotionComposition />)
      const generateButton = screen.getByText('Generate Video')
      await fireEvent.click(generateButton)
      expect(container.querySelector('video')).toBeDefined()
    })

    it('should handle service errors gracefully', async () => {
      vi.mocked(initializeServices).mockReturnValueOnce({
        ...mockServices,
        ai: {
          ...mockServices.ai,
          generateImage: vi.fn().mockRejectedValue(new Error('API Error')),
        },
      })

      render(<MotionComposition />)
      const generateButton = screen.getByText('Generate Image')
      await fireEvent.click(generateButton)
      expect(screen.getByText('Error: API Error')).toBeDefined()
    })
  })
})
