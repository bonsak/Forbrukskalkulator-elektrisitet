import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'
import { STROMSONER } from '../types/types'

type Stromsone = typeof STROMSONER[number]['token']

type MittHus = {
    navn: string,
    antallRom: number,
    antallVoksne: number,
    antallBarn: number,
    antallKvadrat: number,
    antallVarmtvannstanker: number,
    effektVarmtvannstanker: number,
    effektElbillader: number,
    sone: Stromsone
}

interface MittHusStore {
    mittHus: MittHus
    setMittHus: (mittHus: MittHus) => void
}

export const useMittHusStore = create<MittHusStore>()(
  devtools(
    (set) => ({
      mittHus: {
    navn: 'Wessels gt 4',
    antallRom: 5,
    antallVoksne: 2,
    antallBarn: 1,
    antallKvadrat: 110,
    antallVarmtvannstanker: 1,
    effektVarmtvannstanker: 2.5,
    effektElbillader: 6.5,
    sone: 'NO1'
  },
      setMittHus: (mittHus) => set({ mittHus }),
    })
  )
)
