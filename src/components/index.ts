import { FC } from 'react'

export interface BrowserProps {
  url: string
  width?: number
  height?: number
}

export interface VideoProps {
  src: string
  type: 'storyblocks' | 'ai-generated'
  width?: number
  height?: number
}

export interface ImageProps {
  src: string
  type: 'unsplash' | 'ai-generated'
  width?: number
  height?: number
}

export interface AnimationProps {
  type: 'magicui'
  name: string
  duration?: number
}

export interface VoiceoverProps {
  text: string
  voice?: string
}

export const Browser: FC<BrowserProps> = ({ url, width = 1920, height = 1080 }) => {
  return null
}

export const Video: FC<VideoProps> = ({ src, type, width = 1920, height = 1080 }) => {
  return null
}

export const Image: FC<ImageProps> = ({ src, type, width = 1920, height = 1080 }) => {
  return null
}

export const Animation: FC<AnimationProps> = ({ type, name, duration = 1 }) => {
  return null
}

export const Voiceover: FC<VoiceoverProps> = ({ text, voice }) => {
  return null
}

export { Browser, Video, Image, Animation, Voiceover }
