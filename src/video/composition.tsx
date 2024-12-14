import React from 'react'
import { Composition } from 'remotion'
import { Intro, Outro } from '../components/core'
import { Browser, Video, Image, Animation } from '../components/media'
import { validateProps } from '../components/validation'
import { introSchema, outroSchema, browserSchema, videoSchema, imageSchema, animationSchema } from '../components/validation'
import { BrowserService, StockService, AIService, AnimationService } from '../services'
import { parseMDX } from '../mdx/parser'
import { z } from 'zod'

// Define schema for slide props
const slideSchema = z.object({
  content: z.custom<React.ReactNode>(),
  duration: z.number(),
  transition: z.string().optional(),
})

// Define props type from schema
type SlideProps = z.infer<typeof slideSchema>

// Simple function component for slides
function Slide({ content, duration, transition }: SlideProps) {
  return (
    <div className='slide' style={{ transition }}>
      {content}
    </div>
  )
}

// Main composition component
export const MotionComposition: React.FC = () => {
  // Initialize services with environment variables
  const browserService = new BrowserService({
    headless: true,
    defaultViewport: {
      width: 1920,
      height: 1080,
      deviceScaleFactor: 2,
    }
  })
  const stockService = new StockService({
    unsplashAccessKey: process.env.AUTH_SECRET || '',
    storyblocksApiKey: process.env.AUTH_SECRET || ''
  })
  const aiService = new AIService({
    apiKey: process.env.OPENAI_API_KEY || '',
    modelName: 'gpt-4'
  })
  const animationService = new AnimationService({
    apiKey: process.env.AUTH_SECRET || ''
  })

  const parseAndRender = async (mdxContent: string) => {
    const { content, frontmatter } = await parseMDX(mdxContent, {
      components: {
        Intro,
        Outro,
        Browser,
        Video,
        Image,
        Animation,
      }
    })
    return { content, frontmatter }
  }

  return (
    <>
      <Composition
        id='Presentation'
        component={Slide}
        schema={slideSchema}
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
    </>
  )
}
