import { create } from 'zustand'
import { produce } from 'immer'

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
  addSomething: (index, payload) =>
    set(
      produce((draft) => {
        console.log(index, payload)
        draft.forbruk.data.push({
          test: 'ttt',
          name: payload,
        })
      })
    ),
  updateValue: (index, value) =>
    set(
      produce((draft) => {
        const dataPunkt = draft.forbruk.data.find((el) => el.x === index)
        console.log('Datapunkt', dataPunkt)
        dataPunkt.y = value
      })
    ),
}))

export default useForbukStore
