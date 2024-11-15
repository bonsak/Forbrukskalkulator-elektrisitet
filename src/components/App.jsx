import { Suspense, lazy, useState, useEffect } from 'react'
import styled from 'styled-components'
import DagensPris from './DagensPris'
import Tidslinje from './Tidslinje'
import LoadingSpinner from './LoadingSpinner'
import KonvaGrid from './KonvaGrid'

// Lazy-laster tunge komponenter
const ForbruksGraf = lazy(() => import('./ForbruksGrapf'))

function App() {
  const [stroemForbruk, setStroemForbruk] = useState({
    id: 'stroemforbruk',
    data: Array(24)
      .fill(0)
      .map((_, x) => ({ x, y: 0 })),
  })

  // useEffect(() => {
  //   localStorage.setItem('stroemForbruk', JSON.stringify(stroemForbruk))
  // }, [stroemForbruk])

  return (
    <>
      <div className={'main-wrapper'}>
        <Wrapper>
          <Suspense fallback={<LoadingSpinner />}>
            <ForbruksGraf stroemForbruk={stroemForbruk} />
          </Suspense>

          <Tidslinje />
          <DagensPris />
          <KonvaGrid
            stroemForbruk={stroemForbruk}
            setStroemForbruk={setStroemForbruk}
          />
        </Wrapper>
      </div>
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
