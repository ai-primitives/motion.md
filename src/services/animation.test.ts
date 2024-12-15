import { describe, it, expect, beforeEach } from 'vitest'
import { AnimationService } from './animation'
import type { Animation, AnimationOptions } from '../services/types'

describe('AnimationService', () => {
  let service: AnimationService

  beforeEach(() => {
    service = new AnimationService({ fps: 30 })
  })

  describe('Basic Animations', () => {
    it('should generate fadeIn animation', () => {
      const result = service.getAnimation('fadeIn', 15, { duration: 1 })
      expect(result).toBeDefined()
      expect(result.opacity).toBeDefined()
      expect(typeof result.opacity).toBe('number')
      expect(result.opacity).toBeGreaterThan(0)
    })

    it('should generate scale animation', () => {
      const result = service.getAnimation('scale', 15, { duration: 1 })
      expect(result.transform).toBeDefined()
      expect(result.transform).toContain('scale(')
    })

    it('should generate slideIn animation', () => {
      const result = service.getAnimation('slideIn', 15, { duration: 1 })
      expect(result.transform).toBeDefined()
      expect(result.transform).toContain('translateX(')
    })

    it('should generate rotate animation', () => {
      const result = service.getAnimation('rotate', 15, { duration: 1 })
      expect(result.transform).toBeDefined()
      expect(result.transform).toContain('rotate(')
    })
  })

  describe('Error Handling', () => {
    it('should handle invalid animation type', () => {
      expect(() => service.getAnimation('invalid', 0, { duration: 1 })).toThrow('Animation "invalid" not found')
    })

    it('should handle missing duration', () => {
      const result = service.getAnimation('fadeIn', 15)
      expect(result.opacity).toBeDefined()
    })

    it('should handle custom easing', () => {
      const result = service.getAnimation('fadeIn', 15, { duration: 1, easing: 'easeInOut' })
      expect(result.opacity).toBeDefined()
    })
  })
})
