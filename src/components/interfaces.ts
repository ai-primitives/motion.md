import { ReactNode } from 'react'

export type TransitionType = 'fade' | 'slide' | 'none'
export type MediaType = 'stock' | 'ai' | 'custom'

export interface BaseComponentProps {
  children?: ReactNode
  duration?: number // in seconds, must be positive
  transition?: TransitionType
}

export interface IntroProps extends BaseComponentProps {
  title: string
  subtitle?: string
}

export interface OutroProps extends BaseComponentProps {
  title: string
  subtitle?: string
}

export interface CodeProps extends BaseComponentProps {
  language: string
  highlighter?: 'prism' | 'shiki'
  lineNumbers?: boolean
}

export interface BrowserProps extends BaseComponentProps {
  url: string
  width?: number // in pixels
  height?: number // in pixels
}

export interface VideoProps extends BaseComponentProps {
  src: string
  type?: MediaType
  width?: number // in pixels
  height?: number // in pixels
  autoplay?: boolean
}

export interface AnimationProps extends BaseComponentProps {
  name: string
  duration?: number // in seconds
  easing?: 'linear' | 'ease-in' | 'ease-out' | 'ease-in-out'
}

export interface MemeProps extends BaseComponentProps {
  template: string
  topText?: string
  bottomText?: string
}

export interface ImageProps extends BaseComponentProps {
  src: string
  alt?: string
  type?: MediaType
  width?: number // in pixels
  height?: number // in pixels
}

export interface ScreenshotProps extends BaseComponentProps {
  url: string
  selector?: string
  fullPage?: boolean
}
