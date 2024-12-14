import { z } from 'zod'

export const baseSchema = z.object({
  children: z.any().optional(),
  duration: z.number().min(0).optional(),
  transition: z.string().optional(),
})

export const introSchema = baseSchema.extend({
  title: z.string().min(1),
  subtitle: z.string().optional(),
})

export const outroSchema = baseSchema.extend({
  title: z.string().min(1),
  subtitle: z.string().optional(),
})

export const codeSchema = baseSchema.extend({
  language: z.string().min(1),
  highlighter: z.enum(['prism', 'shiki']).optional(),
  lineNumbers: z.boolean().optional(),
})

export const browserSchema = baseSchema.extend({
  url: z.string().url(),
  width: z.number().min(1).optional(),
  height: z.number().min(1).optional(),
})

export const videoSchema = baseSchema.extend({
  src: z.string().min(1).optional(),
  type: z.enum(['stock', 'ai', 'custom', 'luma']).optional(),
  autoplay: z.boolean().optional(),
  prompt: z.string().optional(),
  keyframes: z.object({
    frame0: z.union([
      z.object({ type: z.literal('generation'), id: z.string() }),
      z.object({ type: z.literal('image'), url: z.string() }),
    ]).optional(),
    frame1: z.union([
      z.object({ type: z.literal('generation'), id: z.string() }),
      z.object({ type: z.literal('image'), url: z.string() }),
    ]).optional(),
  }).optional(),
  aspect_ratio: z.enum(['1:1', '16:9', '9:16', '4:3', '3:4', '21:9', '9:21']).optional(),
  loop: z.boolean().optional(),
  cameraMotion: z.object({
    type: z.string(),
    start: z.number().optional(),
    end: z.number().optional(),
    duration: z.number().optional(),
  }).optional(),
})

export const animationSchema = baseSchema.extend({
  name: z.string().min(1),
  duration: z.number().min(0).optional(),
  easing: z.string().optional(),
})

export const memeSchema = baseSchema.extend({
  template: z.string().min(1),
  topText: z.string().optional(),
  bottomText: z.string().optional(),
})

export const imageSchema = baseSchema.extend({
  src: z.string().min(1),
  alt: z.string().optional(),
  type: z.enum(['stock', 'ai', 'custom']).optional(),
})

export const screenshotSchema = baseSchema.extend({
  url: z.string().url(),
  selector: z.string().optional(),
  fullPage: z.boolean().optional(),
})

export function validateProps<T>(schema: z.ZodSchema<T>, props: T): T {
  return schema.parse(props)
}
