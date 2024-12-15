import '@testing-library/jest-dom'
import { beforeAll, vi } from 'vitest'

// Mock MDX compilation
vi.mock('@mdx-js/mdx', async () => {
  return {
    compile: vi.fn().mockResolvedValue({
      value: `
        /* @jsxRuntime automatic @jsxImportSource react */
        import {jsx as _jsx} from 'react/jsx-runtime'
        export default function MDXContent() {
          return _jsx('div', { children: 'compiled mdx' })
        }
      `
    })
  }
})

// Mock puppeteer with ESM syntax
vi.mock('puppeteer', async () => {
  const browser = {
    newPage: vi.fn().mockImplementation(() => Promise.resolve({
      setViewport: vi.fn().mockResolvedValue(undefined),
      goto: vi.fn().mockRejectedValue(new Error('Failed to load page')),
      screenshot: vi.fn().mockResolvedValue(Buffer.from('')),
      close: vi.fn().mockResolvedValue(undefined)
    })),
    close: vi.fn().mockResolvedValue(undefined)
  }

  return {
    launch: vi.fn().mockImplementation(() => Promise.resolve(browser))
  }
})

// Mock axios for both OpenAI and stock services
vi.mock('axios', async () => {
  const mockError = new Error('OpenAI API key required')
  const mockNetworkError = new Error('Network Error')

  const mockAxios = {
    get: vi.fn().mockRejectedValue(mockNetworkError),
    post: vi.fn().mockRejectedValue(mockError),
    create: vi.fn().mockImplementation(() => mockAxios)
  }

  return {
    default: mockAxios,
    create: mockAxios.create
  }
})

// Mock unsplash-js
vi.mock('unsplash-js', async () => {
  return {
    createApi: vi.fn().mockImplementation(() => ({
      search: {
        getPhotos: vi.fn().mockRejectedValue(new Error('No images found'))
      }
    }))
  }
})

// Set up mock environment variables for testing
beforeAll(() => {
  process.env.UNSPLASH_API_KEY = 'mock-unsplash-key'
  process.env.STORYBLOCKS_API_KEY = 'mock-storyblocks-key'
  process.env.OPENAI_API_KEY = 'mock-openai-key'
  process.env.MAGICUI_API_KEY = 'mock-magicui-key'
})
