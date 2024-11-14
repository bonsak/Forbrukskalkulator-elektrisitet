import { Suspense, lazy } from 'react'
import styled from 'styled-components'
import DagensPris from './DagensPris'
import Tidslinje from './Tidslinje'
import LoadingSpinner from './LoadingSpinner'
import KonvaGrid from './KonvaGrid'

// Lazy-laster tunge komponenter
const ForbruksGraf = lazy(() => import('./ForbruksGrapf'))
const GanttTidslinje = lazy(() => import('./GanttTidslinje'))

function App() {
  return (
    <>
      <div className={'main-wrapper'}>
        <Wrapper>
          <Suspense fallback={<LoadingSpinner />}>
            <ForbruksGraf />
          </Suspense>

          <Tidslinje />
          <DagensPris />
          <KonvaGrid />

          {/* <Suspense fallback={<LoadingSpinner />}>
            <GanttTidslinje />
          </Suspense> */}
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
