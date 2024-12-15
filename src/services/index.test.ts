import { describe, it, expect } from 'vitest'
import { BrowserService, StockService, AIService, AnimationService } from '.'

describe('Services', () => {
  describe('BrowserService', () => {
    it('should throw not implemented for capture', async () => {
      const service = new BrowserService({ headless: true })
      await expect(service.capture('https://example.com')).rejects.toThrow('Not implemented')
    })
  })

  describe('StockService', () => {
    it('should throw not implemented for getVideo', async () => {
      const service = new StockService({ unsplashAccessKey: 'test-key' })
      await expect(service.getVideo('nature', 'hd')).rejects.toThrow('Not implemented')
    })

    it('should throw not implemented for getImage', async () => {
      const service = new StockService({ unsplashAccessKey: 'test-key' })
      await expect(service.getImage('nature', 'regular')).rejects.toThrow('Not implemented')
    })
  })

  describe('AIService', () => {
    it('should throw not implemented for generateVideo', async () => {
      const service = new AIService({ apiKey: 'test-key' })
      await expect(service.generateVideo('A beautiful sunset')).rejects.toThrow('Not implemented')
    })

    it('should throw not implemented for generateImage', async () => {
      const service = new AIService({ apiKey: 'test-key' })
      await expect(service.generateImage('A beautiful sunset')).rejects.toThrow('Not implemented')
    })

    it('should throw not implemented for generateVoiceover', async () => {
      const service = new AIService({ apiKey: 'test-key' })
      await expect(service.generateVoiceover('Hello world')).rejects.toThrow('Not implemented')
    })
  })

  describe('AnimationService', () => {
    it('should throw not implemented for getAnimation', async () => {
      const service = new AnimationService({ fps: 30 })
      await expect(service.getAnimation('fade')).rejects.toThrow('Not implemented')
    })
  })
})
