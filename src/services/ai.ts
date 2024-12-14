import axios from 'axios'
import { AIGenerationConfig } from './index'

export class AIService {
  private apiKey: string

  constructor(config: { apiKey?: string }) {
    this.apiKey = config.apiKey || process.env.OPENAI_API_KEY || ''
  }

  private async validateApiKey() {
    if (!this.apiKey) {
      throw new Error('OpenAI API key is required')
    }
  }

  async generateVideo(prompt: string, config: AIGenerationConfig) {
    await this.validateApiKey()

    try {
      const response = await axios.post(
        'https://api.openai.com/v1/images/generations',
        {
          prompt,
          model: config.model || 'dall-e-3',
          n: 1,
          size: '1024x1024',
          response_format: 'url'
        },
        {
          headers: {
            Authorization: `Bearer ${this.apiKey}`,
            'Content-Type': 'application/json'
          }
        }
      )

      return response.data.data[0].url
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Failed to generate video: ${error.message}`)
      }
      throw new Error('Failed to generate video: Unknown error')
    }
  }

  async generateImage(prompt: string, config: AIGenerationConfig) {
    await this.validateApiKey()

    try {
      const response = await axios.post(
        'https://api.openai.com/v1/images/generations',
        {
          prompt,
          model: config.model || 'dall-e-3',
          n: 1,
          size: '1024x1024',
          response_format: 'url'
        },
        {
          headers: {
            Authorization: `Bearer ${this.apiKey}`,
            'Content-Type': 'application/json'
          }
        }
      )

      return response.data.data[0].url
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Failed to generate image: ${error.message}`)
      }
      throw new Error('Failed to generate image: Unknown error')
    }
  }

  async generateVoiceover(text: string, config: AIGenerationConfig) {
    await this.validateApiKey()

    try {
      const response = await axios.post(
        'https://api.openai.com/v1/audio/speech',
        {
          input: text,
          model: config.model || 'tts-1',
          voice: 'alloy'
        },
        {
          headers: {
            Authorization: `Bearer ${this.apiKey}`,
            'Content-Type': 'application/json'
          },
          responseType: 'arraybuffer'
        }
      )

      return Buffer.from(response.data)
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Failed to generate voiceover: ${error.message}`)
      }
      throw new Error('Failed to generate voiceover: Unknown error')
    }
  }
}
