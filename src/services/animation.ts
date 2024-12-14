import axios from 'axios'
import { AnimationConfig } from './index'

interface AnimationOptions {
  duration?: number
  easing?: string
}

interface AnimationData {
  name: string
  defaultDuration?: number
  defaultEasing?: string
  keyframes: string
}

interface AnimationResult {
  name: string
  css: string
  duration: number
  easing: string
}

export class AnimationService {
  private apiKey: string

  constructor(config: AnimationConfig) {
    this.apiKey = config.apiKey || process.env.MAGICUI_API_KEY || ''
    if (!this.apiKey) {
      throw new Error('MagicUI API key is required')
    }
  }

  private async fetchAnimationData(name: string): Promise<AnimationData> {
    try {
      const response = await axios.get(`https://magicui.design/api/animations/${name}`, {
        headers: {
          Authorization: `Bearer ${this.apiKey}`,
        },
      })

      return response.data as AnimationData
    } catch (error) {
      if (error instanceof Error) {
        if ((error as any).response?.status === 404) {
          throw new Error(`Animation "${name}" not found`)
        }
        throw new Error(`Failed to fetch animation: ${error.message}`)
      }
      throw new Error('Failed to fetch animation: Unknown error')
    }
  }

  async getAnimation(name: string, options: AnimationOptions = {}): Promise<AnimationResult> {
    const data = await this.fetchAnimationData(name)
    const duration = options.duration ?? data.defaultDuration ?? 1
    const easing = options.easing ?? data.defaultEasing ?? 'ease-in-out'

    return {
      name: data.name,
      css: this.generateAnimationCSS({
        ...data,
        defaultDuration: duration,
        defaultEasing: easing,
      }),
      duration,
      easing,
    }
  }

  private generateAnimationCSS(animationData: AnimationData): string {
    const duration = animationData.defaultDuration || 1
    const easing = animationData.defaultEasing || 'ease-in-out'

    return `
      @keyframes ${animationData.name} {
        ${animationData.keyframes}
      }
      .${animationData.name} {
        animation: ${animationData.name} ${duration}s ${easing}
      }
    `
  }
}
