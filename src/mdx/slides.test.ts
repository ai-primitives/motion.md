import { describe, it, expect } from 'vitest'
import { VFile } from 'vfile'
import { separateSlides } from './slides'

describe('Slide Separation', () => {
  it('should separate slides by headings', () => {
    const file = new VFile(`# Intro
Welcome to the presentation

# Slide 1
Content for slide 1

# Slide 2
Content for slide 2

# Outro
Thank you!`)

    const slides = separateSlides(file)
    expect(slides).toHaveLength(4)
    expect(slides[0].type).toBe('intro')
    expect(slides[3].type).toBe('outro')
    expect(slides[0].heading?.level).toBe(1)
    expect(slides[0].heading?.title).toBe('Intro')
  })

  it('should parse slide attributes', () => {
    const file = new VFile(`# Slide 1 {transition="fade" duration=5}
Content for slide 1

# Slide 2 {background="blue"}
Content for slide 2`)

    const slides = separateSlides(file)
    expect(slides).toHaveLength(2)
    expect(slides[0].attributes).toEqual({
      transition: 'fade',
      duration: '5'
    })
    expect(slides[1].attributes).toEqual({
      background: 'blue'
    })
  })

  it('should handle nested headings', () => {
    const file = new VFile(`# Main Topic
Introduction

## Subtopic 1
Details

## Subtopic 2
More details

# Conclusion`)

    const slides = separateSlides(file)
    expect(slides).toHaveLength(4)
    expect(slides[0].heading?.level).toBe(1)
    expect(slides[1].heading?.level).toBe(2)
    expect(slides[2].heading?.level).toBe(2)
    expect(slides[3].heading?.level).toBe(1)
  })

  it('should calculate slide duration', () => {
    const file = new VFile(`# Short Slide
One line

# Longer Slide
Line 1
Line 2
Line 3`)

    const slides = separateSlides(file)
    expect(slides[0].duration).toBe(7) // 5 + 2 lines
    expect(slides[1].duration).toBe(9) // 5 + 4 lines
  })
})
