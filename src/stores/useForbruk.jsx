import { create } from 'zustand'
import { produce } from 'immer'
import { FORBRUKSDATA, PRISDATA, NETTDATA } from '../utils/startdata'
// eslint-disable-next-line no-unused-vars

const useForbukStore = create((set) => ({
  forbruk: {
    id: 'forbruk',
    data: FORBRUKSDATA,
  },
  pris: {
    id: 'pris',
    data: PRISDATA,
  },
  nettleie: {
    id: 'nettleie',
    data: NETTDATA,
  },

  // addSomething: (index, payload) =>
  //   set(
  //     produce((draft) => {
  //       console.log(index, payload)
  //       draft.forbruk.data.push({
  //         test: 'ttt',
  //         name: payload,
  //       })
  //     })
  //   ),
  updateValue: (index, value) =>
    set(
      produce((draft) => {
        const forbruksData = draft.forbruk.data.find((el) => el.x === index)
        forbruksData.y = value
        const prisData = draft.pris.data.find((el) => el.x === index)
        prisData.y = value + 4
        const nettData = draft.nettleie.data.find((el) => el.x === index)
        nettData.y = value + 2
      })
    ),
}))

export default useForbukStore
