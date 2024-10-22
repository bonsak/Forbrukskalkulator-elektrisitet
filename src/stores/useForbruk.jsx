import { create } from 'zustand'

// eslint-disable-next-line no-unused-vars
const useForbukStore = create((set) => ({
  forbruk: {
    id: 'Forbruk',
    data: [
      {
        x: 0,
        y: 20,
      },
      {
        x: 1,
        y: 290,
      },
      {
        x: 2,
        y: 291,
      },
      {
        x: 3,
        y: 76,
      },
      {
        x: 4,
        y: 187,
      },
      {
        x: 5,
        y: 280,
      },
      {
        x: 6,
        y: 247,
      },
      {
        x: 7,
        y: 149,
      },
      {
        x: 8,
        y: 126,
      },
      {
        x: 9,
        y: 259,
      },
      {
        x: 10,
        y: 64,
      },
      {
        x: 11,
        y: 100,
      },
    ],
  },
  updateYvalue: (index, nyYverdi) =>
    set((state) => ({
      forbruk: {
        ...state.forbruk.data,
        y: { ...state.forbruk.data[0], ...nyYverdi },
      },
    })),
}))

export default useForbukStore
