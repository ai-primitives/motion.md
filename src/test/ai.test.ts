import { describe, it, expect, beforeEach } from 'vitest'
import { initializeServices } from '../services'
import type { AIService } from '../services/ai'

describe('AI Content Validation Tests', () => {
  let aiService: AIService

  beforeEach(() => {
    const services = initializeServices({
      browser: {
        headless: true,
        defaultViewport: {
          width: 1920,
          height: 1080,
          deviceScaleFactor: 2
        }
      },
      stock: {
        unsplashAccessKey: process.env.UNSPLASH_API_KEY || '',
        storyblocksApiKey: process.env.STORYBLOCKS_API_KEY || ''
      },
      ai: {
        apiKey: process.env.OPENAI_API_KEY || '',
        modelName: 'gpt-4'
      },
      animation: {
        apiKey: process.env.MAGICUI_API_KEY || ''
      }
    })
    aiService = services.ai
  })

  it('should generate valid voiceover audio', async () => {
    const audio = await aiService.generateVoiceover('This is a test voiceover.')
    expect(audio).toBeDefined()
    expect(audio.length).toBeGreaterThan(0)
  })

  it('should generate appropriate images', async () => {
    const image = await aiService.generateImage('A test image of a sunset')
    expect(image).toBeDefined()
    expect(image.byteLength).toBeGreaterThan(0)
  })

  it('should generate valid video content', async () => {
    const video = await aiService.generateVideo('A short video clip of waves')
    expect(video).toBeDefined()
    expect(video.byteLength).toBeGreaterThan(0)
  })

  it('should handle content moderation', async () => {
    await expect(
      aiService.generateImage('inappropriate content')
    ).rejects.toThrow('Content moderation failed')
  })

  it('should maintain consistent style', async () => {
    const images = await Promise.all([
      aiService.generateImage('A sunny day'),
      aiService.generateImage('A rainy day')
    ])

    expect(images[0].byteLength).toEqual(images[1].byteLength)
  })
})
