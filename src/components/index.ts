import { FC } from 'react'

interface BrowserProps {
  url?: string
  width?: number
  height?: number
}

interface VideoProps {
  src?: string
  type?: 'storyblocks' | 'ai'
  width?: number
  height?: number
}

interface ImageProps {
  src?: string
  type?: 'unsplash' | 'ai'
  width?: number
  height?: number
}

interface AnimationProps {
  type: 'magicui'
  name?: string
  duration?: number
}

interface VoiceoverProps {
  text?: string
  voice?: string
}

const Browser: FC<BrowserProps> = ({ url, width = 1920, height = 1080 }) => {
  return null
}

const Video: FC<VideoProps> = ({ src, type, width = 1920, height = 1080 }) => {
  return null
}

const Image: FC<ImageProps> = ({ src, type, width = 1920, height = 1080 }) => {
  return null
}

const Animation: FC<AnimationProps> = ({ type, name, duration = 1 }) => {
  return null
}

const Voiceover: FC<VoiceoverProps> = ({ text, voice }) => {
  return null
}

export type {
  BrowserProps,
  VideoProps,
  ImageProps,
  AnimationProps,
  VoiceoverProps
}

export {
  Browser,
  Video,
  Image,
  Animation,
  Voiceover
}
