import React, { useRef } from 'react'
import { useCurrentFrame } from 'remotion'
import type { BrowserProps, VideoProps, ImageProps, AnimationProps } from './interfaces'
import { validateProps } from './validation'
import { browserSchema, videoSchema, imageSchema, animationSchema } from './validation'

export const Browser = ({ service, url, width = 1920, height = 1080, children }: BrowserProps): React.ReactElement => {
  const validProps = validateProps(browserSchema, { url, width, height })

  return (
    <div className='browser-window' style={{ width, height }}>
      <div className='browser-content'>{children}</div>
    </div>
  )
}

export const Video = ({ service, src, type = 'custom', autoplay = false }: VideoProps): React.ReactElement => {
  const validProps = validateProps(videoSchema, { src, type, autoplay })

  return (
    <div className='video-container'>
      <video autoPlay={autoplay} controls={false}>
        <source src={src} type='video/mp4' />
      </video>
    </div>
  )
}

export const Image = ({ service, src, alt, type = 'custom' }: ImageProps): React.ReactElement => {
  const validProps = validateProps(imageSchema, { src, alt, type })

  return (
    <div className='image-container'>
      <img src={src} alt={alt || ''} />
    </div>
  )
}

export const Animation = ({ service, name, duration = 1, easing = 'ease-in-out', children }: AnimationProps): React.ReactElement => {
  const validProps = validateProps(animationSchema, { name, duration, easing })
  const frame = useCurrentFrame()
  const animation = service.getAnimation(name, frame, { duration, easing })

  return (
    <div className='animation-container' style={animation}>
      {children}
    </div>
  )
}
