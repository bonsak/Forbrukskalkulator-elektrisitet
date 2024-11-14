import ForbruksGraf from './ForbruksGrapf'
import Tidslinje from './Tidslinje'
import ForbruksGrid from './ForbuksGrid'
import AktivitetsGrid from './AktivitetsGrid'
import useForbukStore from '../stores/useForbruk'
import styled from 'styled-components'

import { FORBRUKSDATA } from '../utils/startdata'
import { useRef } from 'react'
import KontrollPanel from './KontrollPanel'
import GanttTidslinje from './GanttTidslinje'
// import InteraktivGantt from './InteraktivGantt'

function App() {
  const wrapperRef = useRef()
  // console.log(wrapperRef)

  const { forbruk, updateValue } = useForbukStore()

  function handleClick(e) {
    updateValue(2, 2000)
  }

  return (
    <>
      <div
        ref={wrapperRef}
        className={'main-wrapper'}
      >
        <Wrapper>
          {/* <button onClick={handleClick}>Testknapp</button> */}
          <ForbruksGraf />
          {/* <Tidslinje /> */}
          {/* <KontrollPanel /> */}
          <GanttTidslinje />
          {/* <InteraktivGantt /> */}
          {/* <ForbruksGrid /> */}
          {/* <AktivitetsGrid bounds={wrapperRef} /> */}
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
