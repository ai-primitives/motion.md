import { describe, it, expect } from 'vitest'
import { parseMDX } from './parser'
import { Browser, Video, Image, Animation, Voiceover } from '../components'

describe('MDX Parser', () => {
  it('should parse basic MDX content', async () => {
    const result = await parseMDX('# Hello World')
    expect(result.code).toBeDefined()
    expect(result.content).toBeDefined()
    expect(result.slides).toHaveLength(1)
  })

  it('should handle frontmatter', async () => {
    const content = `---
title: Test Video
fps: 30
resolution:
  width: 1920
  height: 1080
---
# Content`
    const result = await parseMDX(content)
    expect(result.frontmatter.title).toBe('Test Video')
    expect(result.frontmatter.fps).toBe(30)
    expect(result.frontmatter.resolution).toEqual({
      width: 1920,
      height: 1080
    })
  })

  it('should parse Slidev syntax', async () => {
    const content = `---
theme: default
transition: fade
layout: intro
---
# Slide 1
---
layout: default
transition: slide
---
# Slide 2`
    const result = await parseMDX(content)
    expect(result.slidevConfig.theme).toBe('default')
    expect(result.slidevConfig.transition).toBe('fade')
    expect(result.slides).toHaveLength(2)
  })

  it('should handle custom components', async () => {
    const content = `
<Browser url="https://example.com" width={1920} height={1080} />
<Video src="demo.mp4" type="storyblocks" />
<Image src="background.jpg" type="unsplash" />
<Animation type="magicui" name="fade" duration={2} />
<Voiceover text="Welcome to the demo" voice="Nova" />`

    const result = await parseMDX(content, {
      components: { Browser, Video, Image, Animation, Voiceover }
    })
    expect(result.content).toContain('Browser')
    expect(result.content).toContain('Video')
    expect(result.content).toContain('Image')
    expect(result.content).toContain('Animation')
    expect(result.content).toContain('Voiceover')
  })

  it('should handle errors gracefully', async () => {
    await expect(parseMDX('<Invalid>')).rejects.toThrow('Failed to parse MDX')
  })

  it('should support remark and rehype plugins', async () => {
    const content = `---
title: Test
---
# Hello
* List item 1
* List item 2

\`\`\`js
console.log('test')
\`\`\`
`
    const result = await parseMDX(content)
    expect(result.content).toContain('List item')
    expect(result.content).toContain('console.log')
  })
})
