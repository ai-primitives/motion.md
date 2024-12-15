import { BrowserService, StockService, AIService, AnimationService } from './services'
import axios from 'axios'

// Initialize services with configuration
export const browserService = new BrowserService({
  headless: true,
  defaultViewport: {
    width: 1920,
    height: 1080,
    deviceScaleFactor: 2,
  },
})

export const stockService = new StockService({
  storyblocksApiKey: process.env.STORYBLOCKS_API_KEY,
  unsplashAccessKey: process.env.UNSPLASH_ACCESS_KEY,
})

export const aiService = new AIService({
  apiKey: process.env.OPENAI_API_KEY,
  modelName: 'gpt-4',
})

export const animationService = new AnimationService({
  fps: 30,
})

// Configure axios for API requests
axios.defaults.headers.common['User-Agent'] = 'motion.md/1.0.0'

// Re-export components and services
export * from './components'
export * from './services'
