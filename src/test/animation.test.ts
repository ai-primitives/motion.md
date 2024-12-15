import { describe, it, expect, beforeEach } from 'vitest'
import type { AnimationService } from '../services/animation'
import { MockAnimationService } from './mocks'

describe('Animation Service Tests', () => {
  let animationService: AnimationService

  beforeEach(() => {
    animationService = new MockAnimationService({ fps: 30 })
  })

  it('should generate fade animation', () => {
    const animation = animationService.getAnimation('fadeIn', 15, { duration: 1 })
    expect(animation.opacity).toBeDefined()
  })

  it('should generate scale animation', () => {
    const animation = animationService.getAnimation('scale', 15, { duration: 1 })
    expect(animation.transform).toContain('scale')
  })

  it('should generate slide animation', () => {
    const animation = animationService.getAnimation('slideIn', 15, { duration: 1 })
    expect(animation.transform).toContain('translateX')
  })

  it('should generate rotate animation', () => {
    const animation = animationService.getAnimation('rotate', 15, { duration: 1 })
    expect(animation.transform).toContain('rotate')
  })

  it('should handle different animation types', () => {
    const animations = ['fadeIn', 'scale', 'slideIn', 'rotate']
    animations.forEach((name) => {
      const animation = animationService.getAnimation(name, 15, { duration: 1 })
      expect(animation).toBeDefined()
      if ('opacity' in animation) {
        expect(animation.opacity).toBeDefined()
      }
      if ('transform' in animation) {
        expect(animation.transform).toBeDefined()
      }
    })
  })

  it('should throw error for invalid animation', () => {
    expect(() => animationService.getAnimation('invalid', 15)).toThrow()
  })
})
