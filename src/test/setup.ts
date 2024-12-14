import '@testing-library/jest-dom'
import { beforeAll } from 'vitest'

// Set up mock environment variables for testing
beforeAll(() => {
  process.env.UNSPLASH_API_KEY = 'mock-unsplash-key'
  process.env.STORYBLOCKS_API_KEY = 'mock-storyblocks-key'
  process.env.OPENAI_API_KEY = 'mock-openai-key'
  process.env.MAGICUI_API_KEY = 'mock-magicui-key'
})
