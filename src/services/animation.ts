import axios from 'axios'
import { AnimationConfig } from './index'

export class AnimationService {
  private async fetchAnimationData(name: string) {
    try {
      const response = await axios.get(`https://magicui.design/api/animations/${name}`)
      return response.data
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

  async getAnimation(name: string, config: AnimationConfig) {
    const animationData = await this.fetchAnimationData(name)

    return {
      ...animationData,
      duration: config.duration || animationData.defaultDuration || 1,
      easing: config.easing || animationData.defaultEasing || 'ease-in-out',
      css: this.generateAnimationCSS(animationData, config)
    }
  }

  private generateAnimationCSS(animationData: any, config: AnimationConfig) {
    const duration = config.duration || animationData.defaultDuration || 1
    const easing = config.easing || animationData.defaultEasing || 'ease-in-out'

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
