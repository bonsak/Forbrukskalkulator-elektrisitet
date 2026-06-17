import { describe, it, expect } from 'vitest'
import { beregnTotalKWh, beregnEksaktDagsPris } from './gridEngine'
import type { StroemForbrukData } from '@/types/types'

const makeForbruk = (wattsPerHour: number[]): StroemForbrukData => ({
  id: 'test',
  data: wattsPerHour.map((y, x) => ({ x, y })),
})

describe('beregnTotalKWh', () => {
  it('returns 0 for empty usage', () => {
    expect(beregnTotalKWh(makeForbruk(new Array(24).fill(0)))).toBe(0)
  })

  it('converts watts to kWh: 1000W for one hour = 1 kWh', () => {
    const forbruk = makeForbruk([1000, ...new Array(23).fill(0)])
    expect(beregnTotalKWh(forbruk)).toBe(1)
  })

  it('sums all 24 hours', () => {
    const forbruk = makeForbruk(new Array(24).fill(500))
    expect(beregnTotalKWh(forbruk)).toBeCloseTo(12)
  })
})

describe('beregnEksaktDagsPris', () => {
  it('returns 0 when no usage', () => {
    const priser = Array.from({ length: 24 }, (_, x) => ({ x, y: 1.5 }))
    expect(beregnEksaktDagsPris(makeForbruk(new Array(24).fill(0)), priser)).toBe(0)
  })

  it('calculates exact cost: 1000W × 1 NOK/kWh for 1 hour = 1 NOK', () => {
    const forbruk = makeForbruk([1000, ...new Array(23).fill(0)])
    const priser = [{ x: 0, y: 1 }, ...Array.from({ length: 23 }, (_, i) => ({ x: i + 1, y: 0 }))]
    expect(beregnEksaktDagsPris(forbruk, priser)).toBe(1)
  })

  it('uses each hour\'s own price, not an average', () => {
    const forbruk = makeForbruk([1000, 1000, ...new Array(22).fill(0)])
    // hour 0: 1 NOK/kWh, hour 1: 2 NOK/kWh → 1 + 2 = 3 NOK
    const priser = [
      { x: 0, y: 1 },
      { x: 1, y: 2 },
      ...Array.from({ length: 22 }, (_, i) => ({ x: i + 2, y: 0 })),
    ]
    expect(beregnEksaktDagsPris(forbruk, priser)).toBe(3)
  })

  it('treats missing price entries as 0', () => {
    const forbruk = makeForbruk([1000, ...new Array(23).fill(0)])
    expect(beregnEksaktDagsPris(forbruk, [])).toBe(0)
  })
})
