import { matter } from 'vfile-matter'
import type { VFile } from 'vfile'

export interface FrontmatterData {
  title?: string
  duration?: number
  fps?: number
  resolution?: {
    width: number
    height: number
  }
  theme?: string
  transitions?: {
    type: string
    duration: number
  }[]
  ai?: {
    model?: string
    voice?: string
  }
}

export function parseFrontmatter(file: VFile): FrontmatterData {
  matter(file, { strip: true })
  return file.data.matter as FrontmatterData
}
