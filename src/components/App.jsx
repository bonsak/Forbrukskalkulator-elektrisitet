import { Suspense, lazy, useEffect, useState } from 'react'
import styled from 'styled-components'
import DagensPris from './DagensPris'
import LoadingSpinner from './LoadingSpinner'
import KonvaGrid from './KonvaGrid'
import MinBolig from './MinBolig'
import Kontroll from './Kontroll'
import Tidslinje from './Tidslinje'
import LegendeRight from './LegendeRight'

// Lazy-laster tunge komponenter
const ForbruksBarGraf = lazy(() => import('./ForbruksBarGrapf'))

function App() {
  const [forbruksUnit, setForbruksUnit] = useState([])
  const [stroemForbruk, setStroemForbruk] = useState({
    id: 'stroemforbruk',
    data: Array(25)
      .fill(0)
      .map((_, x) => ({
        x: x.toString().padStart(2, '0'),
        y: 0,
      })),
  })
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
  const [priser, setPriser] = useState([])
  const [gjennomsnittsPris, setGjennomsnittsPris] = useState(0)
  const [totaltForbruk, setTotaltForbruk] = useState(0)

  // useEffect(() => {
  //   localStorage.setItem('stroemForbruk', JSON.stringify(stroemForbruk))
  // }, [stroemForbruk])
  // useEffect(() => {
  //   console.log('APP: totaltForbruk:', totaltForbruk)
  //   console.log('APP: gjennomsnittsPris:', gjennomsnittsPris)
  // }, [totaltForbruk, gjennomsnittsPris, stroemForbruk])

  return (
    <>
      <MainWrapper className={'main-wrapper'}>
        {/* <NyttForbruk /> */}
        <Wrapper>
          <Tidslinje
            mittHus={mittHus}
            stroemForbruk={stroemForbruk}
          />
          <Kontroll
            mittHus={mittHus}
            totaltForbruk={totaltForbruk}
            gjennomsnittsPris={gjennomsnittsPris}
            stroemForbruk={stroemForbruk}
          />
          <div style={{ gridArea: 'graf' }}>
            {/* <Suspense fallback={<LoadingSpinner />}> */}
            <ForbruksBarGraf
              stroemForbruk={stroemForbruk}
              priser={priser}
            />
            {/* </Suspense> */}
            <DagensPris
              priser={priser}
              setPriser={setPriser}
              setGjennomsnittsPris={setGjennomsnittsPris}
            />
          </div>
          <LegendeRight />
          {/* <Tidslinje /> */}
          <MinBolig
            mittHus={mittHus}
            setMittHus={setMittHus}
          />
          <KonvaGrid
            forbruksUnit={forbruksUnit}
            setForbruksUnit={setForbruksUnit}
            stroemForbruk={stroemForbruk}
            setStroemForbruk={setStroemForbruk}
            setTotaltForbruk={setTotaltForbruk}
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
