import { VFile } from 'vfile'

export interface Slide {
  content: string
  type: 'intro' | 'outro' | 'content'
  duration?: number
  attributes?: Record<string, any>
  heading?: {
    level: number
    title: string
  }
}

const parseHeading = (content: string): { level: number; title: string } | undefined => {
  const match = content.match(/^(#{1,6})\s+(.*)$/)
  return match ? { level: match[1].length, title: match[2].trim() } : undefined
}

const parseAttributeString = (attrString: string): Record<string, any> => {
  const attrs: Record<string, any> = {}
  const matches = attrString.matchAll(/(\w+)(?:=["']([^"']+)["'])?/g)
  for (const [, key, value] of matches) {
    attrs[key] = value === undefined ? true : value
  }
  return attrs
}

const parseAttributes = (content: string) => {
  const attrMatch = content.match(/\{([^}]+)\}/)
  return attrMatch ? parseAttributeString(attrMatch[1]) : {}
}

const calculateDuration = (content: string) => {
  return 5 + content.split('\n').length
}

export function separateSlides(file: VFile): Slide[] {
  const content = String(file)
  const slides: Slide[] = []

  const sections = content.split(/\n---\n/)

  sections.forEach((section, sectionIndex) => {
    const headings = section.split(/\n(?=#{1,6}\s)/)

    headings.forEach((heading, headingIndex) => {
      const trimmedHeading = heading.trim()

      if (!trimmedHeading) return

      let type: Slide['type'] = 'content'
      if (sectionIndex === 0 && headingIndex === 0 && trimmedHeading.toLowerCase().includes('intro')) {
        type = 'intro'
      } else if (sectionIndex === sections.length - 1 && headingIndex === headings.length - 1 && trimmedHeading.toLowerCase().includes('outro')) {
        type = 'outro'
      }

      const headingInfo = parseHeading(trimmedHeading)
      const attributes = parseAttributes(trimmedHeading)

      slides.push({
        content: trimmedHeading,
        type,
        duration: calculateDuration(trimmedHeading),
        attributes,
        heading: headingInfo
      })
    })
  })

  return slides
}
