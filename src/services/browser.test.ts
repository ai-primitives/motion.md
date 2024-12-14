import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import { BrowserService } from './browser'

vi.mock('puppeteer', () => ({
  default: {
    launch: vi.fn().mockResolvedValue({
      newPage: vi.fn().mockResolvedValue({
        setViewport: vi.fn(),
        goto: vi.fn(),
        screenshot: vi.fn().mockResolvedValue(Buffer.from('test')),
        close: vi.fn(),
      }),
      close: vi.fn(),
    }),
  },
}))

describe('BrowserService', () => {
  let service: BrowserService

  beforeEach(() => {
    service = new BrowserService()
  })

  afterEach(async () => {
    await service.cleanup()
  })

  it('should capture screenshot', async () => {
    const screenshot = await service.capture('https://example.com', {
      width: 1920,
      height: 1080,
    })
    expect(screenshot).toBeDefined()
  })
})
