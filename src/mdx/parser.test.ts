import { describe, it, expect } from 'vitest'
import { parseMDX } from './parser'

describe('MDX Parser', () => {
  it('should parse basic MDX content', async () => {
    const result = await parseMDX('# Hello World')
    expect(result.code).toBeDefined()
    expect(result.content).toBeDefined()
  })
})
