import { describe, it, expect } from 'vitest'
import { Browser, Video, Image, Animation, Voiceover } from '.'

describe('Components', () => {
  describe('Browser', () => {
    it('should be defined', () => {
      expect(Browser).toBeDefined()
    })
  })

  describe('Video', () => {
    it('should be defined', () => {
      expect(Video).toBeDefined()
    })
  })

  describe('Image', () => {
    it('should be defined', () => {
      expect(Image).toBeDefined()
    })
  })

  describe('Animation', () => {
    it('should be defined', () => {
      expect(Animation).toBeDefined()
    })
  })

  describe('Voiceover', () => {
    it('should be defined', () => {
      expect(Voiceover).toBeDefined()
    })
  })
})
