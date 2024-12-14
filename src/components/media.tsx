import React, { useState, useEffect } from 'react'
import { initializeServices } from '../services'
import type { ServiceConfig } from '../services'
import { validateProps } from './validation'
import { browserSchema, videoSchema, imageSchema, animationSchema } from './validation'
import type { BrowserProps, VideoProps, ImageProps, AnimationProps } from './interfaces'

const services = initializeServices({
  browser: {
    headless: true,
    defaultViewport: {
      width: 1920,
      height: 1080,
      deviceScaleFactor: 2,
    },
  },
  stock: {
    unsplashAccessKey: process.env.UNSPLASH_ACCESS_KEY || '',
    storyblocksApiKey: process.env.STORYBLOCKS_API_KEY || '',
  },
  ai: {
    apiKey: process.env.OPENAI_API_KEY || '',
  },
  animation: {
    apiKey: process.env.MAGICUI_API_KEY || '',
  },
  luma: {
    apiKey: process.env.LUMA_API_KEY || '',
  },
})

export const Browser: React.FC<BrowserProps> = (props) => {
  const validProps = validateProps(browserSchema, props)
  const { url, width = 1920, height = 1080, children } = validProps

  return (
    <div className="browser-window" style={{ width, height }}>
      <div className="browser-content">
        {children}
      </div>
    </div>
  )
}

export const Video: React.FC<VideoProps> = (props) => {
  const validProps = validateProps(videoSchema, props)
  const { src, type = 'custom', autoplay = false, prompt, keyframes, aspect_ratio, loop, cameraMotion } = validProps
  const [videoUrl, setVideoUrl] = useState<string | undefined>(src)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | undefined>()

  useEffect(() => {
    const generateVideo = async () => {
      if (type !== 'luma' || !prompt) return

      setLoading(true)
      setError(undefined)

      try {
        const url = await services.luma.generateFromText({
          prompt,
          keyframes,
          loop,
          aspect_ratio,
          ...(cameraMotion && {
            cameraMotion: {
              type: cameraMotion.type,
              start: cameraMotion.start,
              end: cameraMotion.end,
              duration: cameraMotion.duration,
            },
          }),
        })
        setVideoUrl(url)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to generate video')
      } finally {
        setLoading(false)
      }
    }

    generateVideo()
  }, [type, prompt, keyframes, loop, aspect_ratio, cameraMotion])

  if (loading) {
    return <div className="video-container">Generating video...</div>
  }

  if (error) {
    return <div className="video-container error">{error}</div>
  }

  if (!videoUrl) {
    return <div className="video-container">No video source available</div>
  }

  return (
    <div className="video-container">
      <video autoPlay={autoplay} controls={false}>
        <source src={videoUrl} type="video/mp4" />
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
    </div>
  )
}
