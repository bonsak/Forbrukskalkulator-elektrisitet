// import { StroemForbrukData } from "@/types/types"
import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

interface StroemForbrukData {
    id: string
    data: Array<{ x: number; y: number }>
  }

type StroemForbrukStore = {
  stroemForbruk: StroemForbrukData
  setStroemForbruk: (data: StroemForbrukData) => void
  totaltForbruk: number
  setTotaltForbruk: (data: number) => void
  gjennomsnittsPris: number
  setGjennomsnittsPris: (data: number) => void
}

export const useStroemForbrukStore = create<StroemForbrukStore>((set) => ({
  stroemForbruk: { id: '', data: [] },
  setStroemForbruk: (data) => set((state) => {
    const gjennomsnitt = data.data.length > 0
      ? data.data.reduce((acc, curr) => acc + curr.y, 0) / data.data.length * 0.0001
      : 0;
    
    return {
      stroemForbruk: data,
      gjennomsnittsPris: gjennomsnitt
    };
  }),
  totaltForbruk: 0,
  setTotaltForbruk: (data) => set({ totaltForbruk: data }),
  gjennomsnittsPris: 0,
  setGjennomsnittsPris: (data) => set({ gjennomsnittsPris: data }),
}))
    