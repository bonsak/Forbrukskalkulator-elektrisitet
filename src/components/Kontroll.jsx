import styled from 'styled-components'
import { COLORS, SIZES } from '../utils/constants'

const Kontroll = ({ mittHus }) => {
  return (
    <KontrollWrapper>
      <KotrollTittel>{mittHus.navn}</KotrollTittel>
      <PrisLegende>øre/kWh</PrisLegende>
    </KontrollWrapper>
  )
}

const KontrollWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  grid-area: kontroll;
  background: ${COLORS.clr_lightorange};
  border-radius: 0 40px 0 40px;
`
const PrisLegende = styled.div`
  text-align: right;
  padding-right: 2rem;
  line-height: ${SIZES.medium_spacer}px;
  /* background: ${COLORS.clr_mediumdarkred}; */
  min-height: ${SIZES.medium_spacer}px;
`
const KotrollTittel = styled.h2`
  margin: 1.2rem 0;
  color: ${COLORS.clr_mediumdarkred};
  text-align: center;
  line-height: ${SIZES.medium_spacer}px;
`
export default Kontroll
