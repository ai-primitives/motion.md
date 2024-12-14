import React from 'react'
import { Composition } from 'remotion'
import { Intro, Outro } from '../components/core'
import { Browser, Video, Image, Animation } from '../components/media'
import { validateProps } from '../components/validation'
import { introSchema, outroSchema, browserSchema, videoSchema, imageSchema, animationSchema } from '../components/validation'
import { initializeServices } from '../services'
import { parseMDX } from '../mdx/parser'

interface SlideProps {
  content: React.ReactNode
  duration: number
  transition?: string
}

const Slide: React.FC<SlideProps> = ({ content, duration, transition }) => {
  return (
    <div className="slide" style={{ transition }}>
      {content}
    </div>
  )
}

export const MotionComposition: React.FC = () => {
  // Initialize services
  const services = initializeServices({
    browser: {
      baseUrl: 'http://localhost:3000',
      headless: true,
      defaultViewport: { width: 1920, height: 1080, deviceScaleFactor: 2 }
    },
    stock: {},
    ai: { modelName: 'gpt-4' },
    animation: { fps: 30 }
  })

  // Component mapping for MDX content
  const components = {
    Browser: (props: any) => <Browser service={services.browser} {...props} />,
    Video: (props: any) => <Video service={services.stock} {...props} />,
    Image: (props: any) => <Image service={services.stock} {...props} />,
    Animation: (props: any) => <Animation service={services.animation} {...props} />
  }

  return (
    <>
      <Composition
        id="Presentation"
        component={Slide as React.ComponentType<any>}
        durationInFrames={30 * 60} // 60 seconds at 30fps
        fps={30}
        width={1920}
        height={1080}
        defaultProps={{
          content: <div>Loading...</div>,
          duration: 5,
          transition: 'fade'
        }}
      />
    </>
  )
}
