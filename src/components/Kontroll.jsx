import styled from 'styled-components'
import { COLORS, SIZES } from '../utils/constants'
import { useEffect } from 'react'

const Kontroll = ({
  mittHus,
  totaltForbruk,
  gjennomsnittsPris,
  stroemForbruk,
}) => {
  console.log('Kontroll render - gjennomsnittsPris:', gjennomsnittsPris)

  useEffect(() => {
    console.log('useEffect - gjennomsnittsPris:', gjennomsnittsPris)
  }, [gjennomsnittsPris])

  return (
    <KontrollWrapper>
      <KotrollTittel>{mittHus.navn}</KotrollTittel>
      <InnerWrapper>
        <ul>
          <li>Dagens forbruk er {totaltForbruk ? totaltForbruk : 0} Watt</li>
          <li>
            Dagens snittpris er{' '}
            <strong>
              {gjennomsnittsPris ? gjennomsnittsPris.toFixed(2) : '0.00'} kr per
              kWt
            </strong>
          </li>
          <li>
            Det gir en pris på ca{' '}
            {gjennomsnittsPris
              ? ((gjennomsnittsPris * totaltForbruk) / 1000).toFixed(2)
              : 0}{' '}
            kroner
          </li>
          <ListItemFirst>Det blir ca .. pr uke</ListItemFirst>
          <li>Det blir ca .. pr måned</li>
          <li>Det blir cs .. pr år</li>
          <li></li>
          <ListItemFirst>Før: ...</ListItemFirst>
          <li>Etter: ...</li>
          <li>Du har spart kr: ...</li>
        </ul>
      </InnerWrapper>
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
  padding: 0 2rem;
`
const InnerWrapper = styled.div`
  display: flex;
  height: 100%;
  /* flex-direction: column; */
  /* justify-content: space-between; */
`
const ListItemFirst = styled.li`
  margin-top: 1.2rem;
`

const PrisLegende = styled.div`
  text-align: right;
  /* padding-right: 2rem; */
  line-height: ${SIZES.medium_spacer}px;
  /* background: ${COLORS.clr_mediumdarkred}; */
  min-height: ${SIZES.medium_spacer}px;
`
const KotrollTittel = styled.h2`
  margin: 1.2rem 0;
  color: ${COLORS.clr_mediumdarkred};
  /* text-align: center; */
  line-height: ${SIZES.medium_spacer}px;
`
const KotrollVerdi = styled.h3`
  justify-self: top;
  margin: 1.2rem 0;
  color: ${COLORS.clr_mediumdarkred};
  /* text-align: center; */
`
export default Kontroll
