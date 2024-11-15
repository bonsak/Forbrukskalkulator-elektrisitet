import { Suspense, lazy, useState } from 'react'
import styled from 'styled-components'
import DagensPris from './DagensPris'
import Tidslinje from './Tidslinje'
import LoadingSpinner from './LoadingSpinner'
import KonvaGrid from './KonvaGrid'
import GlobalStyles from './GlobalStyles'

// Lazy-laster tunge komponenter
const ForbruksBarGraf = lazy(() => import('./ForbruksBarGrapf'))

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
        <GlobalStyles />
        <Wrapper>
          <Suspense fallback={<LoadingSpinner />}>
            <ForbruksBarGraf stroemForbruk={stroemForbruk} />
          </Suspense>

          {/* <Tidslinje /> */}
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
