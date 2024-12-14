import { createApi } from 'unsplash-js'
import nodeFetch from 'node-fetch'
import axios from 'axios'
import { StockConfig } from './index'

type ImageQuality = 'regular' | 'full' | 'thumb'
type VideoQuality = '4k' | 'hd' | 'preview'

interface StockImageResult {
  url: string
  credit: string
}

interface StockVideoResult {
  url: string
}

interface StoryblocksResponse {
  results: Array<{
    url: string
  }>
}

export class StockService {
  private unsplash
  private storyblocksApiKey: string

  constructor(config: StockConfig) {
    if (!config.unsplashAccessKey) {
      throw new Error('Unsplash access key is required')
    }
    if (!config.storyblocksApiKey) {
      throw new Error('Storyblocks API key is required')
    }

    this.unsplash = createApi({
      accessKey: config.unsplashAccessKey,
      fetch: nodeFetch as any,
    })
    this.storyblocksApiKey = config.storyblocksApiKey
  }

  async getVideo(query: string, quality: VideoQuality = '4k'): Promise<StockVideoResult> {
    const response = await axios.get<StoryblocksResponse>('https://api.storyblocks.com/api/v1/video/search', {
      params: {
        query,
        quality,
        api_key: this.storyblocksApiKey,
      },
    })
    const results = response.data.results
    if (results.length === 0) throw new Error('No video found')
    return { url: results[0].url }
  }

  async getImage(query: string, quality: ImageQuality = 'regular'): Promise<StockImageResult> {
    const result = await this.unsplash.search.getPhotos({ query })
    if (!result.response?.results.length) throw new Error('No image found')

    const photo = result.response.results[0]
    return {
      url: photo.urls[quality],
      credit: `Photo by ${photo.user.name}`,
    }
  }
}
