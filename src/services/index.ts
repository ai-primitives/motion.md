export interface BrowserbaseConfig {
  width: number
  height: number
  deviceScaleFactor?: number
}

export interface StockVideoConfig {
  quality?: '4k' | 'hd' | 'preview'
}

export interface StockImageConfig {
  quality?: 'regular' | 'full' | 'thumb'
}

export interface AIGenerationConfig {
  model?: string
  provider?: 'openai'
}

export interface AnimationConfig {
  duration?: number
  easing?: string
}

// Export service classes
export { BrowserService } from './browser'
export { StockService } from './stock'
export { AIService } from './ai'
export { AnimationService } from './animation'
