import { crcTable } from './const'
import { Indexable, LayoutInfo, LCSOptions } from './types'

export class LCS {
  private readonly current: Uint32Array
  private readonly top: Uint32Array

  constructor({ maxSize }: LCSOptions) {
    this.current = new Uint32Array(maxSize + 1)
    this.top = new Uint32Array(maxSize + 1)
  }

  public size<T>(a: Indexable<T>, b: Indexable<T>): number {
    const R = a.length,
      C = b.length
    let row: number,
      col = 0,
      chrcode = a[0]
    let { current, top } = this

    top.fill(0)
    for (row = 1; row <= R; row++) {
      chrcode = a[row - 1]
      current[0] = 0

      for (col = 1; col <= C; col++) {
        current[col] =
          chrcode === b[col - 1]
            ? 1 + top[col - 1]
            : Math.max(current[col - 1], top[col])
      }

      ;[top, current] = [current, top]
    }

    return top[C]
  }

  public static size<T>(a: Indexable<T>, b: Indexable<T>): number {
    return new LCS({ maxSize: Math.max(a.length, b.length) }).size(a, b)
  }
}

export const makeCRCTable = () => {
  const crcTable = []
  for (let n = 0; n < 256; ++n) {
    let c = n
    for (let k = 0; k < 8; ++k) {
      c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1
    }
    crcTable[n] = c
  }
  return crcTable
}

export const crc32 = (str: string) => {
  let crc = 0 ^ -1

  for (let i = 0; i < str.length; i++) {
    crc = (crc >>> 8) ^ crcTable[(crc ^ str.charCodeAt(i)) & 0xff]
  }

  return (crc ^ -1) >>> 0
}

export const createCrc32 = (layout: LayoutInfo) => {
  return crc32(
    [
      layout.name,
      layout.device,
      layout.model,
      layout.type,
      JSON.stringify(layout.data),
    ].join('|')
  ).toString(16)
}
