import { describe, it, expect, vi, beforeEach } from 'vitest'
import { AnimationService } from './animation'

vi.mock('axios', () => ({
  default: {
    get: vi.fn().mockResolvedValue({
      data: {
        name: 'fadeIn',
        defaultDuration: 0.5,
        defaultEasing: 'ease-in',
        keyframes: 'from { opacity: 0; } to { opacity: 1; }',
      },
    }),
  },
}))

describe('AnimationService', () => {
  let service: AnimationService

  beforeEach(() => {
    service = new AnimationService()
  })

  it('should fetch and process animation', async () => {
    const result = await service.getAnimation('fadeIn', {})
    expect(result.name).toBe('fadeIn')
    expect(result.css).toContain('@keyframes fadeIn')
    expect(result.duration).toBe(0.5)
    expect(result.easing).toBe('ease-in')
  })

  it('should override duration and easing', async () => {
    const result = await service.getAnimation('fadeIn', {
      duration: 2,
      easing: 'ease-out',
    })
    expect(result.duration).toBe(2)
    expect(result.easing).toBe('ease-out')
    expect(result.css).toContain('animation: fadeIn 2s ease-out')
  })
})
