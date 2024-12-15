import { describe, it, expect } from 'vitest'
import { BrowserService } from '../services/browser'
import { StockService } from '../services/stock'
import { AnimationService } from '../services/animation'
import type {
  BaseComponentProps,
  IntroProps,
  OutroProps,
  CodeProps,
  BrowserProps,
  VideoProps,
  AnimationProps,
  MemeProps,
  ImageProps,
  ScreenshotProps
} from './interfaces'

describe('Component Interfaces', () => {
  it('should define BaseComponentProps', () => {
    const props: BaseComponentProps = {
      duration: 5,
      transition: 'fade'
    }
    expect(props.duration).toBe(5)
    expect(props.transition).toBe('fade')
  })

  it('should define IntroProps', () => {
    const props: IntroProps = {
      title: 'Welcome',
      subtitle: 'Presentation',
      duration: 3
    }
    expect(props.title).toBe('Welcome')
    expect(props.subtitle).toBe('Presentation')
  })

  it('should define CodeProps', () => {
    const props: CodeProps = {
      language: 'typescript',
      highlighter: 'prism',
      lineNumbers: true
    }
    expect(props.language).toBe('typescript')
    expect(props.highlighter).toBe('prism')
  })

  it('should define BrowserProps', () => {
    const mockBrowserService = {} as BrowserService
    const props: BrowserProps = {
      url: 'https://example.com',
      width: 1920,
      height: 1080,
      service: mockBrowserService
    }
    expect(props.url).toBe('https://example.com')
    expect(props.service).toBe(mockBrowserService)
  })
})
