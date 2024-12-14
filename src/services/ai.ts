import axios, { AxiosResponse } from 'axios'
import { AIConfig } from './index'

interface OpenAIImageResponse {
  created: number
  data: Array<{
    url: string
    revised_prompt?: string
  }>
}

export class AIService {
  private apiKey: string
  private modelName: string

  constructor(config: AIConfig) {
    this.apiKey = config.apiKey || process.env.OPENAI_API_KEY || ''
    this.modelName = config.modelName || 'gpt-4'
    if (!this.apiKey) throw new Error('OpenAI API key is required')
  }

  async generateVideo(prompt: string): Promise<string> {
    const response: AxiosResponse<OpenAIImageResponse> = await axios.post('https://api.openai.com/v1/images/generations', { prompt }, { headers: { Authorization: `Bearer ${this.apiKey}` } })
    const images = response.data.data
    if (images.length === 0) throw new Error('No image generated')
    return images[0].url
  }

  async generateImage(prompt: string): Promise<string> {
    const response: AxiosResponse<OpenAIImageResponse> = await axios.post('https://api.openai.com/v1/images/generations', { prompt }, { headers: { Authorization: `Bearer ${this.apiKey}` } })
    const images = response.data.data
    if (images.length === 0) throw new Error('No image generated')
    return images[0].url
  }

  async generateVoiceover(text: string): Promise<Buffer> {
    const response: AxiosResponse<ArrayBuffer> = await axios.post('https://api.openai.com/v1/audio/speech', { text }, { headers: { Authorization: `Bearer ${this.apiKey}` }, responseType: 'arraybuffer' })
    return Buffer.from(response.data)
  }
}
