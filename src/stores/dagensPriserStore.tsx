import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import { STROMSONER } from '../types/types' 

type PrisData = {
  x: number  // time (0-23)
  y: number  // NOK_per_kWh
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
  getPrisForTime: (time: number) => number | null
  gjennomsnittsPris: number
  setGjennomsnittsPris: (pris: number) => void
}

export const useDagensPriserStore = create<DagensPriserState>()(

  devtools(
    (set, get) => ({
      
      priser: { id: 'dagensStroemPris', data: [] },
      isLoading: false,
      error: null,
      aktivSone: 'NO1',
      
      setAktivSone: (sone: Stromsone) => {
        set({ aktivSone: sone }, false, 'setAktivSone')
        get().hentPriser(sone)
      },
      
      hentPriser: async (sone: Stromsone) => {
        const idag = new Date()
        const dato = `${idag.getFullYear()}/${(idag.getMonth() + 1)
          .toString()
          .padStart(2, '0')}-${idag.getDate().toString().padStart(2, '0')}`
        
        const url = `https://www.hvakosterstrommen.no/api/v1/prices/${dato}_${sone}.json`
        
        set({ isLoading: true, error: null }, false, 'startHentPriser')
        
        try {
          const scaleFactor = 6667
          const response = await fetch(url)
          if (!response.ok) throw new Error('Kunne ikke hente strømpriser')
          const rawData = await response.json()
          
          if (!Array.isArray(rawData) || rawData.length !== 24) {
            throw new Error('Ugyldig data: Forventet 24 timer med priser')
          }

          const transformertData: PrisData[] = rawData.map((pris, index) => ({
            x: index,
            y: pris.NOK_per_kWh
          }))
          
          const gjennomsnitt = transformertData.reduce((sum, pris) => sum + pris.y, 0) / transformertData.length
          get().setGjennomsnittsPris(gjennomsnitt)
          
          set({ 
            priser: { 
              id: 'dagensPriser', 
              data: transformertData 
            },
            isLoading: false 
          }, false, 'prisHentet')
        } catch (error) {
          set(
            { 
              error: error instanceof Error ? error.message : 'Ukjent feil oppstod', 
              isLoading: false 
            }, 
            false, 
            'prisHentingFeilet'
          )
        }
      },

      getPrisForTime: (time: number) => {
        const priser = get().priser.data
        if (time < 0 || time > 23 || !priser[time]) return null
        return priser[time].y
      },
      gjennomsnittsPris: 0,
      setGjennomsnittsPris: (pris: number) => set({ gjennomsnittsPris: pris }), 
    })
  )
)