import { describe, it, expect, beforeEach } from 'vitest'
import { AnimationService } from './animation'

describe('AnimationService', () => {
  let service: AnimationService

  beforeEach(() => {
    service = new AnimationService({ fps: 30 })
  })

  it('should generate fade in animation', () => {
    const result = service.getAnimation('fadeIn', 15, { duration: 1 })
    expect(result.opacity).toBe(0.5) // Middle of animation
  })

  it('should generate scale animation', () => {
    const result = service.getAnimation('scale', 30, { duration: 1 })
    expect(result.transform).toContain('scale(2)')
  })

  it('should generate slide in animation', () => {
    const result = service.getAnimation('slideIn', 15, { duration: 1 })
    expect(result.transform).toContain('translateX(-50%)')
  })

  it('should generate rotate animation', () => {
    const result = service.getAnimation('rotate', 15, { duration: 1 })
    expect(result.transform).toContain('rotate(180deg)')
  })

  it('should respect custom duration', () => {
    const result = service.getAnimation('fadeIn', 30, { duration: 2 })
    expect(result.opacity).toBe(0.5) // Middle of 2-second animation at 30fps
  })

  it('should throw error for unknown animation', () => {
    expect(() => service.getAnimation('unknown', 0)).toThrow('Animation "unknown" not found')
  })
})
