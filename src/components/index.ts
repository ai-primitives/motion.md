import { FC, createElement } from 'react'

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
  return createElement('div', { className: 'browser-component' }, `Browser: ${url}`)
}

const Video: FC<VideoProps> = ({ src, type, width = 1920, height = 1080 }) => {
  return createElement('div', { className: 'video-component' }, `Video: ${src}`)
}

const Image: FC<ImageProps> = ({ src, type, width = 1920, height = 1080 }) => {
  return createElement('div', { className: 'image-component' }, `Image: ${src}`)
}

const Animation: FC<AnimationProps> = ({ type, name, duration = 1 }) => {
  return createElement('div', { className: 'animation-component' }, `Animation: ${name}`)
}

const Voiceover: FC<VoiceoverProps> = ({ text, voice }) => {
  return createElement('div', { className: 'voiceover-component' }, `Voiceover: ${text}`)
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
