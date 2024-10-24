import ForbruksGraf from './ForbruksGrapf'
import Tidslinje from './Tidslinje'
import ForbruksGrid from './ForbuksGrid'
import AktivitetsGrid from './AktivitetsGrid'
import { useState } from 'react'
import useForbukStore from '../stores/useForbruk'
import styled from 'styled-components'

import { FORBRUKSDATA } from '../utils/startdata'

function App() {
  const { forbruk, updateValue } = useForbukStore()
  console.log('I app: ', FORBRUKSDATA)
  // const [forbruksData, setForbruksData] = useImmer([
  //   {
  //     id: 'Forbruk',
  //     data: [
  //       {
  //         x: 0,
  //         y: 276,
  //       },
  //       {
  //         x: 1,
  //         y: 290,
  //       },
  //       {
  //         x: 2,
  //         y: 291,
  //       },
  //       {
  //         x: 3,
  //         y: 76,
  //       },
  //       {
  //         x: 4,
  //         y: 187,
  //       },
  //       {
  //         x: 5,
  //         y: 280,
  //       },
  //       {
  //         x: 6,
  //         y: 247,
  //       },
  //       {
  //         x: 7,
  //         y: 149,
  //       },
  //       {
  //         x: 8,
  //         y: 126,
  //       },
  //       {
  //         x: 9,
  //         y: 259,
  //       },
  //       {
  //         x: 10,
  //         y: 64,
  //       },
  //       {
  //         x: 11,
  //         y: 124,
  //       },
  //     ],
  //   },
  //   {
  //     id: 'Nettleie',
  //     data: [
  //       {
  //         x: 0,
  //         y: 154,
  //       },
  //       {
  //         x: 1,
  //         y: 248,
  //       },
  //       {
  //         x: 2,
  //         y: 213,
  //       },
  //       {
  //         x: 3,
  //         y: 99,
  //       },
  //       {
  //         x: 4,
  //         y: 106,
  //       },
  //       {
  //         x: 5,
  //         y: 9,
  //       },
  //       {
  //         x: 6,
  //         y: 193,
  //       },
  //       {
  //         x: 7,
  //         y: 61,
  //       },
  //       {
  //         x: 8,
  //         y: 41,
  //       },
  //       {
  //         x: 9,
  //         y: 6,
  //       },
  //       {
  //         x: 10,
  //         y: 170,
  //       },
  //       {
  //         x: 11,
  //         y: 111,
  //       },
  //     ],
  //   },
  //   {
  //     id: 'Pris',
  //     data: [
  //       {
  //         x: 0,
  //         y: 109,
  //       },
  //       {
  //         x: 1,
  //         y: 239,
  //       },
  //       {
  //         x: 2,
  //         y: 189,
  //       },
  //       {
  //         x: 3,
  //         y: 257,
  //       },
  //       {
  //         x: 4,
  //         y: 58,
  //       },
  //       {
  //         x: 5,
  //         y: 195,
  //       },
  //       {
  //         x: 6,
  //         y: 119,
  //       },
  //       {
  //         x: 7,
  //         y: 78,
  //       },
  //       {
  //         x: 8,
  //         y: 4,
  //       },
  //       {
  //         x: 9,
  //         y: 241,
  //       },
  //       {
  //         x: 10,
  //         y: 99,
  //       },
  //       {
  //         x: 11,
  //         y: 219,
  //       },
  //     ],
  //   },
  // ])

  // let initForbruk = [
  //   {
  //     id: 0,
  //     x: 0,
  //     y: 276,
  //   },
  //   {
  //     id: 1,
  //     x: 1,
  //     y: 290,
  //   },
  //   {
  //     id: 2,
  //     x: 2,
  //     y: 291,
  //   },
  //   {
  //     id: 3,
  //     x: 3,
  //     y: 76,
  //   },
  //   {
  //     id: 4,
  //     x: 4,
  //     y: 187,
  //   },
  //   {
  //     id: 5,
  //     x: 5,
  //     y: 280,
  //   },
  //   {
  //     id: 6,
  //     x: 6,
  //     y: 247,
  //   },
  //   {
  //     id: 7,
  //     x: 7,
  //     y: 149,
  //   },
  //   {
  //     id: 8,
  //     x: 8,
  //     y: 126,
  //   },
  //   {
  //     id: 9,
  //     x: 9,
  //     y: 259,
  //   },
  //   {
  //     id: 10,
  //     x: 10,
  //     y: 64,
  //   },
  //   {
  //     id: 11,
  //     x: 11,
  //     y: 124,
  //   },
  // ]

  const [isForbruk, setForbruk] = useState([
    {
      id: 0,
      x: 0,
      y: 276,
    },
    {
      id: 1,
      x: 1,
      y: 290,
    },
    {
      id: 2,
      x: 2,
      y: 291,
    },
    {
      id: 3,
      x: 3,
      y: 76,
    },
    {
      id: 4,
      x: 4,
      y: 187,
    },
    {
      id: 5,
      x: 5,
      y: 280,
    },
    {
      id: 6,
      x: 6,
      y: 247,
    },
    {
      id: 7,
      x: 7,
      y: 149,
    },
    {
      id: 8,
      x: 8,
      y: 126,
    },
    {
      id: 9,
      x: 9,
      y: 259,
    },
    {
      id: 10,
      x: 10,
      y: 64,
    },
    {
      id: 11,
      x: 11,
      y: 124,
    },
  ])

  // console.log(forbruk)

  // console.log(forbruk)
  function handleClick(e) {
    // console.log('Før: ', forbruk)
    updateValue(2, 2000)
    console.log('Etter: ', forbruk)
  }

  return (
    <>
      {/* <div className={'main-wrapper'}>
       */}
      <Wrapper>
        {/* <button onClick={handleClick}>Testknapp</button> */}
        <ForbruksGraf isForbruk={isForbruk} />
        <Tidslinje />
        <ForbruksGrid
          isForbruk={isForbruk}
          setForbruk={setForbruk}
        />
        <AktivitetsGrid />
      </Wrapper>
      {/* </div> */}
    </>
  )
}

const Wrapper = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
`
export default App
