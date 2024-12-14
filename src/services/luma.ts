import { LumaAI } from 'lumaai'
import type { Generation, VideoCreateParams, ImageCreateParams } from 'lumaai/resources/generations'

export interface LumaConfig {
  apiKey: string
}

export interface CameraMotionOptions {
  type: string
  start?: number
  end?: number
  duration?: number
}

export class LumaService {
  private client: LumaAI
  private pollInterval: number = 2000 // 2 seconds

  constructor(config: LumaConfig) {
    if (!config.apiKey) {
      throw new Error('Luma API key is required')
    }
    this.client = new LumaAI({ authToken: config.apiKey })
  }

  async listCameraMotions(): Promise<string[]> {
    const motions = await this.client.generations.cameraMotion.list()
    return motions
  }

  private async pollGenerationStatus(generationId: string): Promise<string> {
    while (true) {
      const status = await this.client.generations.get(generationId)

      if (status.state === 'completed' && status.assets?.video) {
        return status.assets.video
      }

      if (status.state === 'failed') {
        throw new Error(`Video generation failed: ${status.failure_reason || 'Unknown error'}`)
      }

      await new Promise(resolve => setTimeout(resolve, this.pollInterval))
    }
  }

  async generateFromText(options: {
    prompt: string
    keyframes?: VideoCreateParams['keyframes']
    loop?: boolean
    aspect_ratio?: VideoCreateParams['aspect_ratio']
  }): Promise<string> {
    try {
      const params: VideoCreateParams = {
        prompt: options.prompt,
        keyframes: options.keyframes,
        loop: options.loop,
        aspect_ratio: options.aspect_ratio,
        generation_type: 'video',
      }

      const generation = await this.client.generations.video.create(params)

      if (!generation.id) {
        throw new Error('Failed to get generation ID from API response')
      }

      return this.pollGenerationStatus(generation.id)
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Failed to generate video from text: ${error.message}`)
      }
      throw new Error('Failed to generate video from text: Unknown error')
    }
  }

  async generateFromImage(options: {
    image: string
    prompt?: string
    keyframes?: VideoCreateParams['keyframes']
    aspect_ratio?: VideoCreateParams['aspect_ratio']
  }): Promise<string> {
    try {
      const params: ImageCreateParams = {
        prompt: options.prompt,
        generation_type: 'image',
        aspect_ratio: options.aspect_ratio,
        image_ref: [{ url: options.image }],
      }

      const generation = await this.client.generations.image.create(params)

      if (!generation.id) {
        throw new Error('Failed to get generation ID from API response')
      }

      return this.pollGenerationStatus(generation.id)
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Failed to generate video from image: ${error.message}`)
      }
      throw new Error('Failed to generate video from image: Unknown error')
    }
  }
}
