import axios from 'axios'
import { AIConfig } from './index'

export class AIService {
  private config: AIConfig

  constructor(config: AIConfig) {
    this.config = config
  }

  async generateImage(prompt: string): Promise<string> {
    if (!this.config.apiKey) {
      throw new Error('OpenAI API key is required')
    }

    try {
      const response = await axios.post(
        'https://api.openai.com/v1/images/generations',
        {
          prompt,
          n: 1,
          size: '1024x1024',
          response_format: 'url'
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${this.config.apiKey}`
          }
        }
      )

      if (!response.data?.data?.[0]?.url) {
        throw new Error('Failed to generate image: Invalid response from OpenAI API')
      }

      return response.data.data[0].url
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Failed to generate image: ${error.message}`)
      }
      throw new Error('Failed to generate image: Unknown error')
    }
  }

  async generateVideo(prompt: string) {
    if (!this.config.apiKey) {
      throw new Error('OpenAI API key is required')
    }

    try {
      const response = await axios.post(
        'https://api.openai.com/v1/images/generations',
        {
          prompt,
          model: 'dall-e-3',
          n: 1,
          size: '1024x1024',
          response_format: 'url',
        },
        {
          headers: {
            Authorization: `Bearer ${this.config.apiKey}`,
            'Content-Type': 'application/json',
          },
        },
      )

      return response.data.data[0].url
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Failed to generate video: ${error.message}`)
      }
      throw new Error('Failed to generate video: Unknown error')
    }
  }

  async generateVoiceover(text: string) {
    if (!this.config.apiKey) {
      throw new Error('OpenAI API key is required')
    }

    try {
      const response = await axios.post(
        'https://api.openai.com/v1/audio/speech',
        {
          input: text,
          model: 'tts-1',
          voice: 'alloy',
        },
        {
          headers: {
            Authorization: `Bearer ${this.config.apiKey}`,
            'Content-Type': 'application/json',
          },
          responseType: 'arraybuffer',
        },
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
