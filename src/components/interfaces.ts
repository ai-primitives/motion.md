import { ReactNode } from 'react'
import type { VideoCreateParams } from 'lumaai/resources/generations'

export interface BaseComponentProps {
  children?: ReactNode
  duration?: number
  transition?: string
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
  width?: number
  height?: number
}

export interface VideoProps extends BaseComponentProps {
  src?: string
  type?: 'stock' | 'ai' | 'custom' | 'luma'
  autoplay?: boolean
  prompt?: string
  keyframes?: VideoCreateParams['keyframes']
  aspect_ratio?: VideoCreateParams['aspect_ratio']
  loop?: boolean
  cameraMotion?: {
    type: string
    start?: number
    end?: number
    duration?: number
  }
}

export interface AnimationProps extends BaseComponentProps {
  name: string
  duration?: number
  easing?: string
}

export interface MemeProps extends BaseComponentProps {
  template: string
  topText?: string
  bottomText?: string
}

export interface ImageProps extends BaseComponentProps {
  src: string
  alt?: string
  type?: 'stock' | 'ai' | 'custom'
}

export interface ScreenshotProps extends BaseComponentProps {
  url: string
  selector?: string
  fullPage?: boolean
}
