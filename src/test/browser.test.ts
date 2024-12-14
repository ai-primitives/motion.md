import { describe, it, expect, beforeEach } from 'vitest'
import { initializeServices } from '../services'
import type { BrowserService } from '../services/browser'

describe('Browser Rendering Tests', () => {
  let browserService: BrowserService

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
    browserService = services.browser
  })

  it('should capture browser screenshot', async () => {
    const screenshot = await browserService.capture('<div>Test Content</div>')
    expect(screenshot).toBeDefined()
  })

  it('should handle dynamic content', async () => {
    const html = `
      <div>
        <button onclick="this.textContent = 'Clicked'">Click me</button>
        <div id="dynamic"></div>
      </div>
    `
    const screenshot = await browserService.capture(html)
    expect(screenshot).toBeDefined()
  })

  it('should handle errors gracefully', async () => {
    await expect(browserService.capture('<img src="nonexistent.jpg">')).resolves.toBeDefined()
  })

  it('should respect viewport settings', async () => {
    const screenshot = await browserService.capture('<div>Test</div>')
    expect(screenshot).toBeDefined()
  })
})
