import React from 'react'
import { Composition, useCurrentFrame, interpolate } from 'remotion'
import { Browser, Video, Image, Animation } from '../components'
import { validateProps } from '../components/validation'
import { browserSchema, videoSchema, imageSchema, animationSchema } from '../components/validation'
import { initializeServices } from '../services'
import { parseMDX } from '../mdx/parser'
import type { BrowserProps, VideoProps, ImageProps, AnimationProps } from '../components/interfaces'

interface SlideProps extends Record<string, unknown> {
  content: React.ReactNode
  duration: number
  transition?: 'fade' | 'slide' | 'none'
}

const Slide: React.FC<SlideProps> = ({ content, duration, transition = 'none' }) => {
  const frame = useCurrentFrame()
  const frameRange = [0, duration * 30] // 30fps

  const style = {
    opacity: transition === 'fade' ? interpolate(frame, frameRange, [0, 1], { extrapolateRight: 'clamp' }) : 1,
    transform: transition === 'slide' ? `translateX(${interpolate(frame, frameRange, [-100, 0], { extrapolateRight: 'clamp' })}%)` : 'none',
  }

  return (
    <div className='slide' style={style}>
      {content}
    </div>
  )
}

export const MotionComposition: React.FC = () => {
  const services = initializeServices({
    browser: {
      baseUrl: 'http://localhost:3000',
      headless: true,
      defaultViewport: { width: 1920, height: 1080, deviceScaleFactor: 2 },
    },
    stock: {},
    ai: { modelName: 'gpt-4' },
    animation: { fps: 30 },
  })

  const renderComponent = (type: string, props: any): React.ReactElement | null => {
    switch (type) {
      case 'browser':
        validateProps(browserSchema, props)
        return <Browser service={services.browser} {...props} />
      case 'video':
        validateProps(videoSchema, props)
        return <Video service={services.stock} {...props} />
      case 'image':
        validateProps(imageSchema, props)
        return <Image service={services.stock} {...props} />
      case 'animation':
        validateProps(animationSchema, props)
        return <Animation service={services.animation} {...props} />
      default:
        return null
    }
  }

  return (
    <Composition
      id="Presentation"
      component={Slide}
      durationInFrames={30 * 60} // 60 seconds at 30fps
      fps={30}
      width={1920}
      height={1080}
      defaultProps={{
        content: <div>Loading...</div>,
        duration: 5,
        transition: 'fade',
      }}
    />
  )
}
