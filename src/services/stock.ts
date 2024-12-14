import { createApi } from 'unsplash-js'
import nodeFetch from 'node-fetch'
import axios from 'axios'
import { StockVideoConfig, StockImageConfig } from './index'

export class StockService {
  private unsplash
  private storyblocksApiKey: string

  constructor(config: { unsplashAccessKey?: string; storyblocksApiKey?: string }) {
    this.unsplash = createApi({
      accessKey: config.unsplashAccessKey || process.env.UNSPLASH_ACCESS_KEY || '',
      fetch: nodeFetch as any
    })
    this.storyblocksApiKey = config.storyblocksApiKey || process.env.STORYBLOCKS_API_KEY || ''
  }

  async getVideo(query: string, config: StockVideoConfig) {
    if (!this.storyblocksApiKey) {
      throw new Error('Storyblocks API key is required')
    }

    try {
      const response = await axios.get('https://api.storyblocks.com/api/v1/video/search', {
        params: {
          query,
          page: 1,
          per_page: 1,
          keywords: query,
          content_type: config.quality || '4k'
        },
        headers: {
          Authorization: `Bearer ${this.storyblocksApiKey}`
        }
      })

      if (!response.data.results?.length) {
        throw new Error('No videos found')
      }

      return response.data.results[0]
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Failed to fetch video: ${error.message}`)
      }
      throw new Error('Failed to fetch video: Unknown error')
    }
  }

  async getImage(query: string, config: StockImageConfig) {
    try {
      const result = await this.unsplash.search.getPhotos({
        query,
        perPage: 1,
        orientation: 'landscape'
      })

      if (!result.response?.results?.length) {
        throw new Error('No images found')
      }

      const photo = result.response.results[0]
      return {
        url: photo.urls[config.quality || 'regular'],
        credit: `Photo by ${photo.user.name} on Unsplash`
      }
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Failed to fetch image: ${error.message}`)
      }
      throw new Error('Failed to fetch image: Unknown error')
    }
  }
}
