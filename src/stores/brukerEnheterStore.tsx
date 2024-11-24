import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import { Rectangle } from '@/types/types'

type BrukerEnheterState = {
  brukerEnheter: Rectangle[];
  setBrukerEnheter: (brukerEnheter: Rectangle[] | ((prev: Rectangle[]) => Rectangle[])) => void;
}

export const useBrukerEnheterStore = create<BrukerEnheterState>()(
  devtools((set, get) => ({
    brukerEnheter: [],
    setBrukerEnheter: (enheter: Rectangle[] | ((prev: Rectangle[]) => Rectangle[])) => 
      set({ brukerEnheter: typeof enheter === 'function' ? enheter(get().brukerEnheter) : enheter }),
  }))
)
