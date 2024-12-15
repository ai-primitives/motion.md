import '@testing-library/jest-dom'
import { beforeAll, vi } from 'vitest'

// Mock MDX compilation
vi.mock('@mdx-js/mdx', () => ({
  compile: vi.fn().mockResolvedValue({ value: 'compiled mdx' })
}))

// Mock puppeteer
vi.mock('puppeteer', () => ({
  launch: vi.fn().mockImplementation(() => Promise.resolve({
    newPage: vi.fn().mockImplementation(() => Promise.resolve({
      setViewport: vi.fn().mockResolvedValue(undefined),
      goto: vi.fn().mockRejectedValue(new Error('Failed to load page')),
      screenshot: vi.fn().mockResolvedValue(Buffer.from('')),
      close: vi.fn().mockResolvedValue(undefined)
    })),
    close: vi.fn().mockResolvedValue(undefined)
  }))
}))

// Mock axios for both OpenAI and stock services
vi.mock('axios', () => ({
  default: {
    get: vi.fn().mockRejectedValue(new Error('Network Error')),
    post: vi.fn().mockRejectedValue(new Error('OpenAI API key required'))
  }
}))

// Mock unsplash-js
vi.mock('unsplash-js', () => ({
  createApi: vi.fn().mockImplementation(() => ({
    search: {
      getPhotos: vi.fn().mockRejectedValue(new Error('No images found'))
    }
  }))
}))

// Set up mock environment variables for testing
beforeAll(() => {
  process.env.UNSPLASH_API_KEY = 'mock-unsplash-key'
  process.env.STORYBLOCKS_API_KEY = 'mock-storyblocks-key'
  process.env.OPENAI_API_KEY = 'mock-openai-key'
  process.env.MAGICUI_API_KEY = 'mock-magicui-key'
})
