import { describe, it, expect, vi } from 'vitest'
import { BrowserService, StockService, AIService, AnimationService } from '.'

describe('Services', () => {
  describe('BrowserService', () => {
    it('should throw error when capturing fails', async () => {
      const service = new BrowserService({ headless: true })
      await expect(service.capture('https://example.com')).rejects.toThrow('Failed to capture screenshot')
    })
  })

  describe('StockService', () => {
    it('should throw error when video fetch fails', async () => {
      const service = new StockService({
        unsplashAccessKey: 'test-key',
        storyblocksApiKey: 'test-key'
      })
      await expect(service.getVideo('nature', 'hd')).rejects.toThrow('Failed to fetch video')
    })

    it('should throw error when image fetch fails', async () => {
      const service = new StockService({
        unsplashAccessKey: 'test-key',
        storyblocksApiKey: 'test-key'
      })
      await expect(service.getImage('nature', 'regular')).rejects.toThrow('Failed to fetch image')
    })

    it('should throw error without API keys', () => {
      expect(() => new StockService({} as any)).toThrow('Unsplash access key is required')
      expect(() => new StockService({ unsplashAccessKey: 'key' } as any)).toThrow('Storyblocks API key is required')
    })
  })

  describe('AIService', () => {
    it('should throw not implemented for generateVideo', async () => {
      const service = new AIService({ apiKey: 'test-key' })
      await expect(service.generateVideo('A beautiful sunset')).rejects.toThrow('Failed to generate video')
    })

    it('should throw not implemented for generateImage', async () => {
      const service = new AIService({ apiKey: 'test-key' })
      await expect(service.generateImage('A beautiful sunset')).rejects.toThrow('Failed to generate image')
    })

    it('should throw not implemented for generateVoiceover', async () => {
      const service = new AIService({ apiKey: 'test-key' })
      await expect(service.generateVoiceover('Hello world')).rejects.toThrow('Failed to generate voiceover')
    })
  })

  describe('AnimationService', () => {
    it('should generate fadeIn animation', () => {
      const service = new AnimationService({ fps: 30 })
      const result = service.getAnimation('fadeIn', 15, { duration: 1 })
      expect(result.opacity).toBeDefined()
    })

    it('should throw error for invalid animation', () => {
      const service = new AnimationService({ fps: 30 })
      expect(() => service.getAnimation('invalid', 0, { duration: 1 })).toThrow('Animation "invalid" not found')
    })
  })
})
