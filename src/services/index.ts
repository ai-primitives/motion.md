import { BrowserService } from './browser'
import { StockService } from './stock'
import { AIService } from './ai'
import { AnimationService } from './animation'

export interface BrowserbaseConfig {
  headless?: boolean
  defaultViewport?: {
    width: number
    height: number
    deviceScaleFactor: number
  }
}

export interface StockConfig {
  unsplashAccessKey: string
  storyblocksApiKey: string
}

export interface AIConfig {
  apiKey: string
  modelName?: string
}

export interface AnimationConfig {
  apiKey: string
}

export interface ServiceConfig {
  browser?: BrowserbaseConfig
  stock: StockConfig
  ai: AIConfig
  animation: AnimationConfig
}

export function initializeServices(config: ServiceConfig): {
  browser: BrowserService
  stock: StockService
  ai: AIService
  animation: AnimationService
} {
  if (!config.stock?.unsplashAccessKey) {
    throw new Error('Unsplash access key is required')
  }
  if (!config.stock?.storyblocksApiKey) {
    throw new Error('Storyblocks API key is required')
  }
  if (!config.ai?.apiKey) {
    throw new Error('OpenAI API key is required')
  }
  if (!config.animation?.apiKey) {
    throw new Error('MagicUI API key is required')
  }

  return {
    browser: new BrowserService(
      config.browser ?? {
        headless: true,
        defaultViewport: {
          width: 1920,
          height: 1080,
          deviceScaleFactor: 2,
        },
      },
    ),
    stock: new StockService(config.stock),
    ai: new AIService(config.ai),
    animation: new AnimationService(config.animation),
  }
}

export { BrowserService, StockService, AIService, AnimationService }
