import { describe, it, expect, vi, beforeEach } from 'vitest'
import { StockService } from './stock'
import axios from 'axios'
import { createApi } from 'unsplash-js'

// Mock unsplash-js
vi.mock('unsplash-js', () => ({
  createApi: vi.fn().mockReturnValue({
    search: {
      getPhotos: vi.fn().mockResolvedValue({
        response: {
          results: [
            {
              urls: {
                regular: 'https://example.com/photo.jpg',
              },
              user: {
                name: 'Test User',
              },
            },
          ],
        },
      }),
    },
  }),
}))

// Mock axios
vi.mock('axios', () => ({
  default: {
    get: vi.fn().mockResolvedValue({
      data: {
        results: [
          {
            url: 'https://example.com/video.mp4',
          },
        ],
      },
    }),
  },
}))

describe('StockService', () => {
  let service: StockService

  beforeEach(() => {
    service = new StockService({
      unsplashAccessKey: 'test-key',
      storyblocksApiKey: 'test-key',
    })
  })

  describe('Image Operations', () => {
    it('should fetch image from Unsplash', async () => {
      const result = await service.getImage('nature', 'regular')
      expect(result.url).toBeDefined()
      expect(result.credit).toContain('Photo by')
    })

    it('should handle no images found', async () => {
      const mockPhotos = vi.fn().mockResolvedValueOnce({
        response: { results: [] },
      })
      vi.mocked(createApi).mockReturnValueOnce({
        search: { getPhotos: mockPhotos },
      } as any)
      await expect(service.getImage('nonexistent')).rejects.toThrow('No images found')
    })

    it('should handle network errors', async () => {
      const mockPhotos = vi.fn().mockRejectedValueOnce(new Error('Network error'))
      vi.mocked(createApi).mockReturnValueOnce({
        search: { getPhotos: mockPhotos },
      } as any)
      await expect(service.getImage('test')).rejects.toThrow('Failed to fetch image: Network error')
    })
  })

  describe('Video Operations', () => {
    it('should fetch video from Storyblocks', async () => {
      const result = await service.getVideo('nature', 'hd')
      expect(result.url).toBeDefined()
    })

    it('should handle no videos found', async () => {
      vi.mocked(axios.get).mockResolvedValueOnce({ data: { results: [] } })
      await expect(service.getVideo('nonexistent')).rejects.toThrow('No videos found')
    })

    it('should handle network errors', async () => {
      vi.mocked(axios.get).mockRejectedValueOnce(new Error('Network error'))
      await expect(service.getVideo('test')).rejects.toThrow('Failed to fetch video: Network error')
    })

    it('should handle invalid quality parameter', async () => {
      await expect(service.getVideo('nature', 'invalid' as any)).rejects.toThrow('Invalid quality parameter')
    })
  })

  describe('Error Handling', () => {
    it('should throw error without API keys', () => {
      expect(() => new StockService({} as any)).toThrow('Unsplash access key is required')
      expect(() => new StockService({ unsplashAccessKey: 'key' } as any)).toThrow('Storyblocks API key is required')
    })
  })
})
