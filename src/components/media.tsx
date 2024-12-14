import React from 'react'
import { BrowserService, StockService, AIService, AnimationService } from '../services'
import { validateProps } from './validation'
import { browserSchema, videoSchema, imageSchema, animationSchema } from './validation'
import type { BrowserProps, VideoProps, ImageProps, AnimationProps } from './interfaces'

const browserService = new BrowserService()
const stockService = new StockService()
const aiService = new AIService()
const animationService = new AnimationService()

export const Browser: React.FC<BrowserProps> = (props) => {
  const validProps = validateProps(browserSchema, props)
  const { url, width = 1920, height = 1080, children } = validProps

  return (
    <div className="browser-window" style={{ width, height }}>
      <div className="browser-content">
        {/* Browserbase integration will render the actual content */}
        {children}
      </div>
    </div>
  )
}

export const Video: React.FC<VideoProps> = (props) => {
  const validProps = validateProps(videoSchema, props)
  const { src, type = 'custom', autoplay = false } = validProps

  return (
    <div className="video-container">
      <video autoPlay={autoplay} controls={false}>
        <source src={src} type="video/mp4" />
      </video>
    </div>
  )
}

export const Image: React.FC<ImageProps> = (props) => {
  const validProps = validateProps(imageSchema, props)
  const { src, alt, type = 'custom' } = validProps

  return (
    <div className="image-container">
      <img src={src} alt={alt || ''} />
    </div>
  )
}

export const Animation: React.FC<AnimationProps> = (props) => {
  const validProps = validateProps(animationSchema, props)
  const { name, duration = 1, easing = 'ease-in-out' } = validProps

  return (
    <div className="animation-container" style={{ animationDuration: `${duration}s`, animationTimingFunction: easing }}>
      {/* MagicUI.design animation will be rendered here */}
    </div>
  )
}
