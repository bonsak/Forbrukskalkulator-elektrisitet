import { create } from 'zustand'
// import { produce } from 'immer'

const useTargetSlotStore = create((set) => ({
  targetSlot: '',

  setTargetSlot: (target) => set({ targetSlot: target }),
  resetTargetSlot: () => set({ targetSlot: '' }),
}))

export default useTargetSlotStore
