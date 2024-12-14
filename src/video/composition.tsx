import React from 'react'
import { Composition } from 'remotion'
import { Intro, Outro } from '../components/core'
import { Browser, Video, Image, Animation } from '../components/media'
import { validateProps } from '../components/validation'
import { introSchema, outroSchema, browserSchema, videoSchema, imageSchema, animationSchema } from '../components/validation'
import { BrowserService, StockService, AIService, AnimationService } from '../services'

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
  const browserService = new BrowserService()
  const stockService = new StockService()
  const aiService = new AIService()
  const animationService = new AnimationService()

  return (
    <>
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
          transition: 'fade'
        }}
      />
    </>
  )
}
