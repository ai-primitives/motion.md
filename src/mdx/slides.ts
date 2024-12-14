import { VFile } from 'vfile'

export interface Slide {
  content: string
  type: 'intro' | 'outro' | 'content'
  duration?: number
}

export function separateSlides(file: VFile): Slide[] {
  const content = String(file)
  const slides: Slide[] = []

  // Split content by horizontal rule (---) or heading (#)
  // First split by horizontal rules, then by headings within each section
  const sections = content.split(/\n---\n/)

  sections.forEach((section, sectionIndex) => {
    const headings = section.split(/\n(?=#{1,6}\s)/)

    headings.forEach((heading, headingIndex) => {
      const trimmedHeading = heading.trim()

      // Skip empty slides
      if (!trimmedHeading) return

      // Determine slide type
      let type: Slide['type'] = 'content'
      if (sectionIndex === 0 && headingIndex === 0 && trimmedHeading.toLowerCase().includes('intro')) {
        type = 'intro'
      } else if (
        sectionIndex === sections.length - 1 &&
        headingIndex === headings.length - 1 &&
        trimmedHeading.toLowerCase().includes('outro')
      ) {
        type = 'outro'
      }

      slides.push({
        content: trimmedHeading,
        type,
        duration: undefined // Will be calculated based on content/voiceover later
      })
    })
  })

  return slides
}
