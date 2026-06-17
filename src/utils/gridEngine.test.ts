import { describe, it, expect } from 'vitest'
import { beregnTotalKWh, beregnEksaktDagsPris, beregnSesongvektetÅrsPris } from './gridEngine'
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

describe('beregnSesongvektetÅrsPris', () => {
  it('returns 0 when gjennomsnittsPris is 0 (div-by-zero guard)', () => {
    expect(beregnSesongvektetÅrsPris(10, [1, 2, 3], 0)).toBe(0)
  })

  it('when all monthly averages equal gjennomsnittsPris, result equals eksaktDagsPris × 12 × 30', () => {
    const månedsnitt = new Array(12).fill(1.5)
    expect(beregnSesongvektetÅrsPris(10, månedsnitt, 1.5)).toBeCloseTo(10 * 12 * 30)
  })

  it('scales proportionally: a month twice the average contributes twice as much', () => {
    // 1 month at 2× average, rest 0 → årsEstimat = 10 × (2/1) × 30
    expect(beregnSesongvektetÅrsPris(10, [2], 1)).toBeCloseTo(10 * 2 * 30)
  })

  it('sums contributions from all months', () => {
    // 2 months: one at 1×, one at 3× average → 10×30×1 + 10×30×3 = 1200
    expect(beregnSesongvektetÅrsPris(10, [1, 3], 1)).toBeCloseTo(1200)
  })
})
