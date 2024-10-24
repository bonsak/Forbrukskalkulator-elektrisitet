import styled from 'styled-components'
import { ICONS } from '../utils/icons'

export default function KontroPanel() {
  const KOLONNER = 12

  let DEFAULT_FORBRUK = Array.from({ length: KOLONNER }, (_item, index) => {
    return {
      id: index,
      verdi: [0],
    }
  })
  console.log(DEFAULT_FORBRUK)

  return (
    <div>
      <Tid />
      <ForbruksGrid />
      <Aktiviteter />
    </div>
  )
}

const ForbruksGrid = () => {
  return <div>Forbruksgrid...</div>
}

const Aktiviteter = () => {
  return (
    <AktivitetsWrapper>
      {ICONS.map((item, index) => (
        <AktivitetsSlot
          draggable='true'
          onDragStart={(e) => console.log('Drag', e.target)}
          onDrop={(e) => console.log('Drop', e.target)}
          onDragOver={(e) => console.log('Over', e.target)}
          onDragLeave={(e) => console.log('Leave', e.target)}
          key={index}
          src={item['src']}
          className={'aktivitets-slot'}
          data-forbruk={item['forbruk']}
        ></AktivitetsSlot>
      ))}
    </AktivitetsWrapper>
  )
}

const Tid = () => {
  return <div>Tidslinje</div>
}

// Forbruk
const ForbruksgridWrapper = styled.div`
  align-items: center;
  column-gap: 15px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin-bottom: 1rem;
  margin-top: 1rem;
  row-gap: 15px;
  width: 885px;
`
const ForbruksKolonne = styled.div`
  column-gap: 15px;
  display: flex;
  flex-direction: column;
  row-gap: 15px;
`
const ForbruksSlot = styled.div`
  background-color: rgba(255, 255, 255, 1);
  border-radius: 8px;
  box-shadow: rgba(0, 0, 0, 0.1) 4px 4px 6px 0px;
  height: 60px;
  width: 60px;
  outline: 3px solid rgba(224, 224, 224, 1);
`
// Aktivitet
const AktivitetsWrapper = styled.div`
  align-items: start;
  column-gap: 15px;
  display: flex;
  flex-wrap: wrap;
  justify-content: start;
  margin-bottom: 1rem;
  margin-top: 1rem;
  row-gap: 15px;
  width: 435px;
`
const AktivitetsSlot = styled.img`
  border-radius: 8px;
  height: 60px;
  width: 60px;
  box-shadow: rgba(0, 0, 0, 0.1) 4px 4px 6px 0px;
`
// Tid
const TidContainer = styled.div`
  font-size: 12px;
  margin-bottom: 1rem;
  margin-top: 1rem;
  opacity: 0.5;
  width: 885px;
`
const TidWrapper = styled.div`
  align-items: center;
  border-bottom-left-radius: 8px;
  border-bottom-right-radius: 8px;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
  display: flex;
  justify-content: center;
  overflow-x: hidden;
  overflow-y: hidden;
`
const Natt = styled.div`
  align-items: center;
  background-color: rgba(166, 166, 166, 1);
  color: rgba(255, 255, 255, 1);
  display: flex;
  height: 25px;
  justify-content: center;
  width: 16.66666%;
`
const MorgenKveld = styled.div`
  align-items: center;
  background-color: rgba(228, 228, 228, 1);
  color: rgba(144, 144, 144, 1);
  display: flex;
  height: 25px;
  justify-content: center;
  width: 16.66666%;
`
const Dag = styled.div`
  align-items: center;
  background-color: rgba(248, 248, 248, 1);
  color: rgba(52, 52, 52, 1);
  display: flex;
  height: 25px;
  justify-content: center;
  width: 33.3333333%;
`
