// import './Tidslinje.css'
import styled from 'styled-components'
import { COLORS, SIZES } from '../utils/constants'

function Tidslinje() {
  return (
    <TidContainer>
      {/* <TidHeader>Min strømdag</TidHeader> */}
      <TidWrapper>
        <Natt>00 - 04</Natt>
        <MorgenKveld>05 - 08</MorgenKveld>
        <Dag>09 - 16</Dag>
        <MorgenKveld>17 - 20</MorgenKveld>
        <Natt>21 - 24</Natt>
      </TidWrapper>
    </TidContainer>
  )
}

const TidContainer = styled.div`
  flex-direction: column;
  justify-content: space-between;
  grid-area: tidslinje;
  font-size: 12px;
  margin-bottom: 0;
`
const TidWrapper = styled.div`
  display: flex;
  opacity: 0.75;
  min-height: ${SIZES.medium_spacer}px;
  font-size: 1rem;
`

const TidHeader = styled.h1`
  color: ${COLORS.clr_mediumdarkred};
  margin: 3rem 0;
  /* font-size: 18px; */
  text-align: center;
`
const Natt = styled.div`
  align-items: center;
  background-color: ${COLORS.clr_mintgreen}80;
  color: ${COLORS.clr_darkcharcoal};
  display: flex;
  /* height: 25px; */
  justify-content: center;
  width: 16.66666%;
`
const MorgenKveld = styled.div`
  align-items: center;
  background-color: ${COLORS.clr_mintlight};
  color: ${COLORS.clr_darkcharcoal};
  display: flex;
  /* height: 25px; */
  justify-content: center;
  width: 16.66666%;
`
const Dag = styled.div`
  align-items: center;
  background-color: #f8f8f8;
  color: rgba(52, 52, 52, 1);
  display: flex;
  /* height: 25px; */
  justify-content: center;
  width: 33.3333333%;
`

export default Tidslinje
