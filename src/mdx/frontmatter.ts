import { matter } from 'vfile-matter'
import { VFile } from 'vfile'
import { readFileSync } from 'fs'
import { isObject } from '../utils'

export interface FrontmatterData {
  title?: string
  duration?: number
  fps?: number
  width?: number  // Add direct width/height for backward compatibility
  height?: number
  resolution?: {
    width: number
    height: number
  }
  theme?: string
  layout?: string
  transition?: string
  transitions?: {
    type: string
    duration: number
  }[]
  ai?: {
    model?: string
    voice?: string
  }
}

export function parseFrontmatter(input: string | VFile): FrontmatterData {
  let file: VFile

  if (typeof input === 'string') {
    const content = readFileSync(input, 'utf-8')
    file = new VFile(content)
  } else {
    file = input
  }

  matter(file, { strip: true })
  const data = file.data.matter

  if (!data || !isObject(data)) {
    return {}
  }

  // Handle both direct width/height and nested resolution
  const result = data as FrontmatterData
  if (result.resolution) {
    result.width = result.width || result.resolution.width
    result.height = result.height || result.resolution.height
  }

  return result
}
