import { FC } from 'react'
import {
  BrowserProps,
  VideoProps,
  ImageProps,
  AnimationProps,
  TransitionType,
  MediaType
} from './interfaces'

export interface VoiceoverProps {
  text: string
  voice?: string
}

export const Browser: FC<BrowserProps> = ({ url, width = 1920, height = 1080, transition = 'fade' }) => {
  // TODO: Implement browserbase rendering
  return null
}

export const Video: FC<VideoProps> = ({ src, type = 'stock', width = 1920, height = 1080, transition = 'fade' }) => {
  // TODO: Implement video component with Storyblocks/AI support
  return null
}

export const Image: FC<ImageProps> = ({ src, type = 'stock', width = 1920, height = 1080, transition = 'fade' }) => {
  // TODO: Implement image component with Unsplash/AI support
  return null
}

export const Animation: FC<AnimationProps> = ({ name, duration = 1, transition = 'fade' }) => {
  // TODO: Implement magicui.design animation support
  return null
}

export const Voiceover: FC<VoiceoverProps> = ({ text, voice = 'default' }) => {
  // TODO: Implement AI voiceover generation
  return null
}

export * from './interfaces'
