import { describe, it, expect, beforeEach } from 'vitest'
import { AnimationService } from './animation'

describe('AnimationService', () => {
  let service: AnimationService

  beforeEach(() => {
    service = new AnimationService({ fps: 30 })
  })

  it('should generate fade animation', async () => {
    const result = await service.getAnimation('fade', 15, { duration: 1 })
    expect(result).toBeDefined()
    expect(result.opacity).toBe(0.5) // Middle of animation
  })

  it('should handle invalid animation type', async () => {
    await expect(service.getAnimation('invalid', 0, { duration: 1 }))
      .rejects.toThrow('Invalid animation type')
  })
})
