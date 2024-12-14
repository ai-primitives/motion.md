import { describe, it, expect } from 'vitest'
import { VFile } from 'vfile'
import { parseSlidevSyntax } from './slidev'

describe('Slidev Syntax Parser', () => {
  it('should parse basic Slidev config', () => {
    const file = new VFile(`---
theme: default
highlighter: prism
lineNumbers: true
---

# Content`)

    const config = parseSlidevSyntax(file)
    expect(config.theme).toBe('default')
    expect(config.highlighter).toBe('prism')
    expect(config.lineNumbers).toBe(true)
  })

  it('should handle drawings config', () => {
    const file = new VFile(`---
theme: default
drawings:
  enabled: true
  persist: true
---

# Content`)

    const config = parseSlidevSyntax(file)
    expect(config.drawings).toBeDefined()
    expect(config.drawings?.enabled).toBe(true)
  })

  it('should handle missing frontmatter', () => {
    const file = new VFile('# Content without frontmatter')

    const config = parseSlidevSyntax(file)
    expect(config).toEqual({})
  })
})
