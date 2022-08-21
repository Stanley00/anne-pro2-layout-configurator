export type LayerType = 'layer1' | 'layer2' | 'layer3' | 'tabs'

export type LayoutData = { [index: string]: number[] }

export interface LayoutInfo {
  name: string
  device: number
  model: number
  type: string
  data: LayoutData
  crc: string
}

export interface Indexable<T> {
  [index: number]: T
  readonly length: number
}

export type LCSOptions = {
  maxSize: number
}
