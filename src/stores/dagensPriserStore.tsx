import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import { STROMSONER } from '../types/types'
// import { Stromsone } from '../types/types'
import { fetchStromPriser, fetchHistoriskSnittPris } from '../components/api/hvakosterstroemmen'

type PrisData = {
  x: number // time (0-23)
  y: number // NOK_per_kWh
}

type PrisDataSet = {
  id: string
  data: PrisData[]
}

type Stromsone = (typeof STROMSONER)[number]['token']

interface DagensPriserState {
  priser: PrisDataSet
  isLoading: boolean
  error: string | null
  aktivSone: Stromsone
  hentPriser: (sone: Stromsone) => Promise<void>
  setAktivSone: (sone: Stromsone) => void
  gjennomsnittsPris: number
  sistOppdatert: string | null
  historiskSnittPris: number | null
  hentHistoriskSnitt: (sone: Stromsone) => Promise<void>
}

export const useDagensPriserStore = create<DagensPriserState>()(
  devtools((set, get) => ({
    priser: { id: 'dagensStroemPris', data: [] },
    isLoading: false,
    error: null,
    aktivSone: 'NO1',
    sistOppdatert: null,

    setAktivSone: (sone: Stromsone) => {
      set({ aktivSone: sone }, false, 'setAktivSone')
    },

    hentPriser: async (sone: Stromsone) => {
      const dagensPriser = await fetchStromPriser(sone)
      const gjennomsnitt =
        dagensPriser.reduce((sum, pris) => sum + pris.y, 0) /
        dagensPriser.length

      set({
        priser: {
          id: 'dagensPriser',
          data: dagensPriser,
        },
        isLoading: false,
        gjennomsnittsPris: gjennomsnitt,
      })
    },
    gjennomsnittsPris: 0,
    historiskSnittPris: null,
    hentHistoriskSnitt: async (sone: Stromsone) => {
      try {
        const snitt = await fetchHistoriskSnittPris(sone)
        set({ historiskSnittPris: snitt })
      } catch {
        // fallback: behold null slik at TittelFelt faller tilbake til dagspris
      }
    },
  }))
)
