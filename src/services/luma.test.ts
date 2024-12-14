import { describe, it, expect, vi, beforeEach } from 'vitest'
import { LumaService, LumaConfig } from './luma'

vi.mock('lumaai', () => ({
  LumaAI: vi.fn().mockImplementation(() => ({
    generations: {
      get: vi.fn(),
      video: {
        create: vi.fn(),
      },
      image: {
        create: vi.fn(),
      },
      cameraMotion: {
        list: vi.fn(),
      },
    },
  })),
}))

describe('LumaService', () => {
  let lumaService: LumaService
  const mockConfig: LumaConfig = { apiKey: 'test-api-key' }

  beforeEach(() => {
    vi.clearAllMocks()
    lumaService = new LumaService(mockConfig)
  })

  it('should throw error if API key is missing', () => {
    expect(() => new LumaService({ apiKey: '' })).toThrow('Luma API key is required')
  })

  describe('listCameraMotions', () => {
    it('should return available camera motions', async () => {
      const mockMotions = ['pan', 'zoom', 'rotate']
      const client = (lumaService as any).client
      client.generations.cameraMotion.list.mockResolvedValueOnce(mockMotions)

      const result = await lumaService.listCameraMotions()
      expect(result).toEqual(mockMotions)
      expect(client.generations.cameraMotion.list).toHaveBeenCalled()
    })
  })

  describe('generateFromText', () => {
    it('should generate video from text prompt', async () => {
      const mockGeneration = { id: 'test-id' }
      const mockStatus = {
        state: 'completed',
        assets: { video: 'https://example.com/video.mp4' },
      }

      const client = (lumaService as any).client
      client.generations.video.create.mockResolvedValueOnce(mockGeneration)
      client.generations.get.mockResolvedValueOnce(mockStatus)

      const result = await lumaService.generateFromText({
        prompt: 'test prompt',
        loop: true,
        aspect_ratio: '16:9',
        keyframes: {
          frame0: { type: 'image', url: 'https://example.com/frame0.jpg' },
        },
      })

      expect(result).toBe(mockStatus.assets.video)
      expect(client.generations.video.create).toHaveBeenCalledWith({
        prompt: 'test prompt',
        loop: true,
        aspect_ratio: '16:9',
        generation_type: 'video',
        keyframes: {
          frame0: { type: 'image', url: 'https://example.com/frame0.jpg' },
        },
      })
    })

    it('should handle generation failure', async () => {
      const mockGeneration = { id: 'test-id' }
      const mockStatus = {
        state: 'failed',
        failure_reason: 'Generation failed',
      }

      const client = (lumaService as any).client
      client.generations.video.create.mockResolvedValueOnce(mockGeneration)
      client.generations.get.mockResolvedValueOnce(mockStatus)

      await expect(lumaService.generateFromText({ prompt: 'test prompt' }))
        .rejects.toThrow('Video generation failed: Generation failed')
    })

    it('should handle missing generation ID', async () => {
      const mockGeneration = { id: undefined }
      const client = (lumaService as any).client
      client.generations.video.create.mockResolvedValueOnce(mockGeneration)

      await expect(lumaService.generateFromText({ prompt: 'test prompt' }))
        .rejects.toThrow('Failed to get generation ID from API response')
    })
  })

  describe('generateFromImage', () => {
    it('should generate video from image', async () => {
      const mockGeneration = { id: 'test-id' }
      const mockStatus = {
        state: 'completed',
        assets: { video: 'https://example.com/video.mp4' },
      }

      const client = (lumaService as any).client
      client.generations.image.create.mockResolvedValueOnce(mockGeneration)
      client.generations.get.mockResolvedValueOnce(mockStatus)

      const result = await lumaService.generateFromImage({
        image: 'https://example.com/image.jpg',
        prompt: 'test prompt',
        aspect_ratio: '16:9',
      })

      expect(result).toBe(mockStatus.assets.video)
      expect(client.generations.image.create).toHaveBeenCalledWith({
        prompt: 'test prompt',
        aspect_ratio: '16:9',
        generation_type: 'image',
        image_ref: [{ url: 'https://example.com/image.jpg' }],
      })
    })
  })
})
