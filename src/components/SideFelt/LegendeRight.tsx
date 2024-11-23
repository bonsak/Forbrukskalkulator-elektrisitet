import styled from 'styled-components'
import { COLORS } from '../../utils/constants'

const LegendeRight = () => {
  return (
    <LegendeRightWrapper>
      <Topp>20 kW/t</Topp>
      <High>15 kW/t</High>
      <Medium>10 kW/t</Medium>
      <Low>5 kW/t</Low>
      <Bunn>0 kwt</Bunn>
    </LegendeRightWrapper>
  )
}

const LegendeRightWrapper = styled.div`
  /* max-width: 8rem; */
  /* min-width: 8rem; */
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  grid-area: legende;
  padding: 0 0 2.2rem 0;
  margin-left: 1rem;
  font-size: 18px;
  font-weight: bold;
`
const Topp = styled.p`
  opacity: 0;
  margin-top: -10px;
`
const Bunn = styled.p`
  opacity: 0;
  margin-bottom: -10px;
`
const High = styled.p`
  color: ${COLORS.clr_red};
  /* opacity: 0; */
`
const Medium = styled.p`
  color: ${COLORS.clr_mediumdarkred};
  /* opacity: 0; */
`
const Low = styled.p`
  color: ${COLORS.clr_mediumred};
  /* opacity: 0; */
`

export default LegendeRight
