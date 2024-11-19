import { Suspense, lazy, useState } from 'react'
import styled from 'styled-components'
import DagensPris from './DagensPris'
import LoadingSpinner from './LoadingSpinner'
import KonvaGrid from './KonvaGrid'
import MinBolig from './MinBolig'
import Kontroll from './Kontroll'
import Tidslinje from './Tidslinje'
import LegendeRight from './LegendeRight'
import NyttForbruk from "./NyttForbruk"

// Lazy-laster tunge komponenter
const ForbruksBarGraf = lazy(() => import('./ForbruksBarGrapf'))

function App() {
  const [stroemForbruk, setStroemForbruk] = useState({
    id: 'stroemforbruk',
    data: Array(25)
      .fill(0)
      .map((_, x) => ({
        x: x.toString().padStart(2, '0'),
        y: 0,
      })),
  })
  // console.log(stroemForbruk)
  const [mittHus, setMittHus] = useState({
    navn: 'Wessels gt 4',
    antallRom: 5,
    antallVoksne: 2,
    antallBarn: 2,
    antallKvadrat: 120,
    antallVarmtvannstanker: 2,
    effektVarmtvannstanker: 2.5,
    effektElbillader: 6.5,
  })

  // useEffect(() => {
  //   localStorage.setItem('stroemForbruk', JSON.stringify(stroemForbruk))
  // }, [stroemForbruk])

  return (
    <>
      <MainWrapper className={'main-wrapper'}>
        {/* <NyttForbruk /> */}
        <Wrapper>
          <Tidslinje mittHus={mittHus} />
          <Kontroll mittHus={mittHus} />
          <div style={{ gridArea: 'graf' }}>
            <Suspense fallback={<LoadingSpinner />}>
              <ForbruksBarGraf stroemForbruk={stroemForbruk} />
            </Suspense>
            <DagensPris />
          </div>
          <LegendeRight />
          {/* <Tidslinje /> */}
          <MinBolig
            mittHus={mittHus}
            setMittHus={setMittHus}
          />
          <KonvaGrid
            stroemForbruk={stroemForbruk}
            setStroemForbruk={setStroemForbruk}
            // style={{ gridArea: 'grid' }}
          />
          {/* <Dialog showDialog={true} /> */}
        </Wrapper>
      </MainWrapper>
    </>
  )
}
const MainWrapper = styled.div`
  /* max-width: 1280px; */
  display: grid;
  place-items: center;
  /* flex-direction: column;
  justify-content: center;
  align-items: center; */
`

const Wrapper = styled.div`
  /* align-items: center; */
  padding-top: 2rem;
  display: grid;
  grid-template-columns: 0.3fr 1fr 100px;
  grid-template-rows: 40px 1fr 1fr;
  grid-template-areas:
    '. tidslinje .'
    'kontroll graf legende'
    'minbolig grid .';

  /* flex-direction: column; */
  justify-content: center;
`
export default App
