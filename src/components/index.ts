import { ReactNode } from 'react'
import type { BrowserService } from '../services/browser'
import type { StockService } from '../services/stock'
import type { AnimationService } from '../services/animation'

export interface BaseComponentProps {
  children?: ReactNode
  duration?: number
  transition?: string
}

export interface BrowserProps extends BaseComponentProps {
  url: string
  width?: number
  height?: number
  service: BrowserService
}

export interface VideoProps extends BaseComponentProps {
  src: string
  type?: 'stock' | 'ai' | 'custom'
  autoplay?: boolean
  service: StockService
}

export interface ImageProps extends BaseComponentProps {
  src: string
  alt?: string
  type?: 'stock' | 'ai' | 'custom'
  service: StockService
}

export interface AnimationProps extends BaseComponentProps {
  name: string
  duration?: number
  easing?: string
  service: AnimationService
}

export interface VoiceoverProps extends BaseComponentProps {
  text: string
  voice?: string
}

export * from './core'
export * from './media'
