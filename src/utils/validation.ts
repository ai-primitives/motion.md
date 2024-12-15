import { BrowserProps, VideoProps, ImageProps, AnimationProps } from '../components'

export class ValidationError extends Error {
  constructor(message: string) {
    super(`Failed to parse MDX: ${message}`)
    this.name = 'ValidationError'
  }
}

export function validateBrowserProps(props: Partial<BrowserProps>): void {
  if (props.width && (typeof props.width !== 'number' || props.width <= 0)) {
    throw new ValidationError('Browser width must be a positive number')
  }
  if (props.height && (typeof props.height !== 'number' || props.height <= 0)) {
    throw new ValidationError('Browser height must be a positive number')
  }
  if (props.url && typeof props.url !== 'string') {
    throw new ValidationError('Browser URL must be a string')
  }
}

export function validateVideoProps(props: Partial<VideoProps>): void {
  if (props.src && typeof props.src !== 'string') {
    throw new ValidationError('Video source must be a string')
  }
  if (props.type && !['stock', 'ai', 'custom'].includes(props.type)) {
    throw new ValidationError('Video type must be either "stock", "ai", or "custom"')
  }
  if (props.autoplay !== undefined && typeof props.autoplay !== 'boolean') {
    throw new ValidationError('Video autoplay must be a boolean')
  }
}

export function validateImageProps(props: Partial<ImageProps>): void {
  if (props.src && typeof props.src !== 'string') {
    throw new ValidationError('Image source must be a string')
  }
  if (props.alt !== undefined && typeof props.alt !== 'string') {
    throw new ValidationError('Image alt text must be a string')
  }
  if (props.type && !['stock', 'ai', 'custom'].includes(props.type)) {
    throw new ValidationError('Image type must be either "stock", "ai", or "custom"')
  }
}

export function validateAnimationProps(props: Partial<AnimationProps>): void {
  if (props.name !== undefined && typeof props.name !== 'string') {
    throw new ValidationError('Animation name must be a string')
  }
  if (props.duration !== undefined && (typeof props.duration !== 'number' || props.duration <= 0)) {
    throw new ValidationError('Animation duration must be a positive number')
  }
  if (props.easing !== undefined && typeof props.easing !== 'string') {
    throw new ValidationError('Animation easing must be a string')
  }
}
