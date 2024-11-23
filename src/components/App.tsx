import { Suspense, lazy, useEffect, useState } from 'react'
import styled from 'styled-components'
import DagensPris from '@/components/Priser/DagensPris'
import HovedGrid from '@components/Grid/HovedGrid'
import MinBolig from '@components/SideFelt/MinBolig'
import TittelFelt from '@components/SideFelt/TittelFelt'
import Tidslinje from '@components/Tidslinje'
import LegendeRight from '@components/SideFelt/LegendeRight'
import { useStrom, StroemProvider } from '@context/StroemContext'

// Lazy-laster tunge komponenter
const ForbruksBarGraf = lazy(() => import('./HovedGraf/HovedGraf'))

function App() {
  return (
    <StroemProvider>
      <MainWrapper className={'main-wrapper'}>
        <Wrapper>
          <Tidslinje />
          <TittelFelt />
          <div style={{ gridArea: 'graf' }}>
            <ForbruksBarGraf />
            <DagensPris />
          </div>
          <LegendeRight />
          <MinBolig />
          <HovedGrid />
        </Wrapper>
      </MainWrapper>
    </StroemProvider>
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
