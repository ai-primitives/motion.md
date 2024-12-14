import * as puppeteer from 'puppeteer'
import { BrowserbaseConfig } from './index'

interface ViewportOptions {
  width: number
  height: number
  deviceScaleFactor?: number
}

interface CaptureResult {
  screenshot: Buffer
  html: string
}

export class BrowserService {
  private browser: puppeteer.Browser | null = null
  private config: BrowserbaseConfig

  constructor(config: BrowserbaseConfig = {}) {
    this.config = {
      headless: config.headless ?? true,
      defaultViewport: config.defaultViewport ?? {
        width: 1920,
        height: 1080,
        deviceScaleFactor: 2,
      },
    }
  }

  private async initialize() {
    if (!this.browser) {
      this.browser = await puppeteer.launch({
        headless: this.config.headless,
        defaultViewport: this.config.defaultViewport,
      })
    }
    return this.browser
  }

  async capture(url: string, viewport?: ViewportOptions): Promise<CaptureResult> {
    const browser = await this.initialize()
    const page = await browser.newPage()

    try {
      if (viewport) {
        await page.setViewport({
          ...this.config.defaultViewport,
          ...viewport,
        })
      }

      await page.goto(url, { waitUntil: 'networkidle0' })
      const screenshot = await page.screenshot({ type: 'png', fullPage: true })
      const html = await page.content()

      return {
        screenshot: screenshot as Buffer,
        html,
      }
    } finally {
      await page.close()
    }
  }

  async cleanup() {
    if (this.browser) {
      await this.browser.close()
      this.browser = null
    }
  }
}
