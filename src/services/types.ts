import { AnimationConfig } from './index'

export interface Animation {
  opacity?: number
  transform?: string
  scale?: number
  rotate?: number
}

export interface AnimationOptions {
  duration?: number
  easing?: string
}

export interface Services {
  browser: {
    capture: (url: string) => Promise<Buffer>
    cleanup: () => Promise<void>
  }
  stock: {
    getImage: (query: string, size?: string) => Promise<{ url: string; credit: string }>
    getVideo: (query: string, quality?: string) => Promise<{ url: string }>
  }
  ai: {
    generateImage: (prompt: string) => Promise<string>
    generateVideo: (prompt: string) => Promise<string>
    generateVoiceover: (text: string) => Promise<Buffer>
  }
  animation: {
    getAnimation: (name: string, frame: number, options?: AnimationOptions) => Animation
  }
}
