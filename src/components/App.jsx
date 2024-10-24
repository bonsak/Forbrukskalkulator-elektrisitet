import ForbruksGraf from './ForbruksGrapf'
// import Tidslinje from './Tidslinje'
import styled from 'styled-components'

import KontrollPanel from './KontrollPanel'

function App() {
  return (
    <Wrapper>
      <ForbruksGraf />
      {/* <Tidslinje /> */}
      <KontrollPanel />
    </Wrapper>
  )
}

const Wrapper = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
`
export default App
