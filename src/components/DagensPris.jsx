import { useEffect, useState } from 'react'
import styled from 'styled-components'
import { COLORS } from '../utils/constants'

const DagensPris = () => {
  const [priser, setPriser] = useState([])
  const [feilmelding, setFeilmelding] = useState('')
  const [lasterInn, setLasterInn] = useState(true)

  useEffect(() => {
    const hentPriser = async () => {
      try {
        setLasterInn(true)
        setFeilmelding('')

        const idag = new Date()
        const dato = `${idag.getFullYear()}/${(idag.getMonth() + 1)
          .toString()
          .padStart(2, '0')}-${idag.getDate().toString().padStart(2, '0')}`

        const sone = 'NO1'
        // let url = `/strompris/${dato}_${sone}.json`
        let url = `https://www.hvakosterstrommen.no/api/v1/prices/${dato}_${sone}.json`

        //https://www.hvakosterstrommen.no/api/v1/prices/2024/11-14_NO5.json

        const respons = await fetch(url)
        if (!respons.ok) {
          const igar = new Date(idag)
          igar.setDate(igar.getDate() - 1)
          const igarDato = igar.toISOString().split('T')[0]
          url = `/strompris/${igarDato}_${sone}.json`

          const igarsRespons = await fetch(url)
          if (!igarsRespons.ok) {
            throw new Error(
              `Kunne ikke hente strømpriser: ${igarsRespons.status}`
            )
          }
          const data = await igarsRespons.json()
          setPriser(data)
        } else {
          const data = await respons.json()
          setPriser(data)
        }
      } catch (error) {
        console.error('Feil ved henting av strømpriser:', error)
        setFeilmelding('Kunne ikke hente strømpriser. Prøv igjen senere.')
      } finally {
        setLasterInn(false)
      }
    }

    hentPriser()
  }, [])

  return (
    <Wrapper>
      {feilmelding && <Feilmelding>{feilmelding}</Feilmelding>}
      {lasterInn ? (
        <LasteIndikator>Laster inn strømpriser...</LasteIndikator>
      ) : (
        <PrisGrid>
          {priser.map((pris, index) => (
            <PrisKolonne key={index}>
              {/* <Time>{new Date(pris.time_start).getHours()}:00</Time> */}
              <Pris>{pris.NOK_per_kWh.toFixed(2)}</Pris>
            </PrisKolonne>
          ))}
        </PrisGrid>
      )}
    </Wrapper>
  )
}

const Wrapper = styled.div`
  width: 885px;
  /* height: 400px; */
  padding: 10px;
  background: ${COLORS.clr_lightorange};
  /* border-radius: 8px; */
  /* box-shadow: rgba(0, 0, 0, 0.1) 4px 4px 6px 0px; */
`

const PrisGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(24, 1fr);
  gap: 2px;
  overflow-x: auto;
`

const PrisKolonne = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  /* padding: 8px; */
  /* background: #f5f5f5; */
  border-radius: 4px;
`

// const Time = styled.span`
//   font-size: 12px;
//   color: #666;
// `

const Pris = styled.span`
  /* font-weight: bold; */
  color: ${COLORS.clr_darkgreen};
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
  /* padding: 2rem; */
`

export default DagensPris
