import { Suspense, lazy, useEffect, useState } from 'react'
import styled from 'styled-components'
import DagensPris from './DagensPris'
import KonvaGrid from './KonvaGrid'
import MinBolig from './MinBolig'
import Kontroll from './Kontroll'
import Tidslinje from './Tidslinje'
import LegendeRight from './LegendeRight'
import { useStrom, StromProvider } from '../context/StroemContext'

// Lazy-laster tunge komponenter
const ForbruksBarGraf = lazy(() => import('./ForbruksBarGrapf'))

function App() {
  // const { priser, setPriser } = useStrom()

  // const [forbruksUnit, setForbruksUnit] = useState([])
  // const [stroemForbruk, setStroemForbruk] = useState({
  //   id: 'stroemforbruk',
  //   data: Array(25)
  //     .fill(0)
  //     .map((_, x) => ({
  //       x: x.toString().padStart(2, '0'),
  //       y: 0,
  //     })),
  // })

  // const [mittHus, setMittHus] = useState({

  // const [priser, setPriser] = useState([])
  // const [gjennomsnittsPris, setGjennomsnittsPris] = useState(0)
  // const [totaltForbruk, setTotaltForbruk] = useState(0)

  return (
    <StromProvider>
      <MainWrapper className={'main-wrapper'}>
        {/* <NyttForbruk /> */}
        <Wrapper>
          <Tidslinje />
          <Kontroll />
          <div style={{ gridArea: 'graf' }}>
            {/* <Suspense fallback={<LoadingSpinner />}> */}
            <ForbruksBarGraf />
            {/* </Suspense> */}
            <DagensPris />
          </div>
          <LegendeRight />
          {/* <Tidslinje /> */}
          <MinBolig />
          <KonvaGrid
          // setTotaltForbruk={setTotaltForbruk}
          />
          {/* <Dialog showDialog={true} /> */}
        </Wrapper>
      </MainWrapper>
    </StromProvider>
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
