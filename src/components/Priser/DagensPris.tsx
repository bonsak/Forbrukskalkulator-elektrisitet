import { useEffect, useState } from 'react'
import styled from 'styled-components'
import { COLORS } from '@utils/constants'
import { useDagensPriserStore } from '@stores/dagensPriserStore'

type Strompris = {
  NOK_per_kWh: number
  time_start: string
}

type PrisData = {
  y: number
  x: number // eller Date, avhengig av dataformatet
}

const DagensPris = () => {
  const { priser, hentPriser, aktivSone } = useDagensPriserStore()
  useEffect(() => {
    hentPriser(aktivSone)
  }, [aktivSone])

  // console.log(priser)
  return (
    <Wrapper>
      <PrisGrid>
        {priser.data.map((pris: PrisData, index: number) => (
          <PrisKolonne key={index}>
            <Pris>{pris.y.toFixed(2)}</Pris>
          </PrisKolonne>
        ))}
      </PrisGrid>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: grid;
  place-items: center;
  min-height: 40px;
  background: ${COLORS.clr_lightorange};
`

const PrisGrid = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(24, 1fr);
  gap: 2px;
  overflow-x: auto;
`

const PrisKolonne = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  border-radius: 4px;
`

const Pris = styled.span`
  /* font-weight: bold; */
  color: ${COLORS.clr_darkmintgreen};
  font-size: 14px;
`

const Feilmelding = styled.div`
  color: #dc3545;
  text-align: center;
  margin-bottom: 1rem;
`

const LasteIndikator = styled.div`
  text-align: center;
  color: #666;
`

export default DagensPris
