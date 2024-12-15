import { VFile } from 'vfile'

export interface SlidevConfig {
  theme?: string
  highlighter?: string
  lineNumbers?: boolean
  drawings?: {
    enabled?: boolean
    persist?: boolean
  }
  transition?: {
    type: string
    duration: number
  }
  layout?: string
  highlight?: {
    theme: string
    lines: boolean
  }
}

export function parseSlidevSyntax(file: VFile): SlidevConfig {
  const content = String(file)
  const configMatch = content.match(/^---\n([\s\S]*?)\n---/)

  if (!configMatch) {
    return {}
  }

  try {
    // Convert Slidev frontmatter to our config format
    const config: SlidevConfig = {}
    const lines = configMatch[1].split('\n')

    lines.forEach((line) => {
      const [key, value] = line.split(':').map((s) => s.trim())

      switch (key) {
        case 'theme':
          config.theme = value
          break
        case 'highlighter':
          config.highlighter = value
          break
        case 'lineNumbers':
          config.lineNumbers = value === 'true'
          break
        case 'drawings':
          config.drawings = {
            enabled: true,
            persist: false,
          }
          break
        case 'transition':
          config.transition = {
            type: value,
            duration: 300 // default duration
          }
          break
        case 'layout':
          config.layout = value
          break
        case 'highlight':
          config.highlight = {
            theme: value,
            lines: true // default to true
          }
          break
      }
    })

    return config
  } catch (error) {
    console.error('Failed to parse Slidev config:', error)
    return {}
  }
}
