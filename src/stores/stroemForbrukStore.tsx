// import { StroemForbrukData } from "@/types/types"
import { Rectangle } from '@/types/types'
import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

interface StroemForbrukData {
  id: string
  data: Array<{ x: number; y: number }>
}

type StroemForbrukStore = {
  brukerEnheter: Rectangle[]
  setBrukerEnheter: (
    brukerEnheter: Rectangle[] | ((prev: Rectangle[]) => Rectangle[])
  ) => void
  stroemForbruk: StroemForbrukData
  setStroemForbruk: (data: StroemForbrukData) => void
  totaltForbruk: number
  setTotaltForbruk: (data: number) => void
}

export const useStroemForbrukStore = create<StroemForbrukStore>()(
  devtools((set) => ({
    brukerEnheter: [],
    setBrukerEnheter: (
      enheter: Rectangle[] | ((prev: Rectangle[]) => Rectangle[])
    ) =>
      set((state) => ({
        brukerEnheter:
          typeof enheter === 'function'
            ? enheter(state.brukerEnheter)
            : enheter,
      })),
    totaltForbruk: 0,
    setTotaltForbruk: (data) => set({ totaltForbruk: data }),
    stroemForbruk: { id: '', data: [] },
    setStroemForbruk: (data) => set((state) => ({ stroemForbruk: data })),
  }))
)
