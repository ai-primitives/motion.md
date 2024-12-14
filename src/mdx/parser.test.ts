import { describe, it, expect } from 'vitest'
import { parseMDX } from './parser'

describe('MDX Parser', () => {
  it('should parse basic markdown', async () => {
    const content = '# Hello\n\nTest content'
    const result = await parseMDX(content)
    expect(result.content).toContain('Hello')
    expect(result.content).toContain('Test content')
  })

  it('should parse frontmatter', async () => {
    const content = `---
title: Test
---
# Content`
    const result = await parseMDX(content)
    expect(result.frontmatter).toEqual({ title: 'Test' })
  })

  it('should handle basic HTML', async () => {
    const content = '# Title\n\n<div>Test content</div>'
    const result = await parseMDX(content)
    expect(result.content).toContain('Test content')
  })
})
