import { useCallback } from 'react'
import styled from 'styled-components'
// import './ForbruksGrid.css'

function ForbruksGrid(isForbruk, setForbruk) {
  // ...['data'][0] er første data serie
  // ...['data'][0]['data'][0][('x', 'y')] er første verdi
  // console.log(forbruksData['forbruksData'][0]['data'][0][('x', 'y')])

  const kolonner = []
  for (var i = 0; i <= 11; i++) {
    kolonner.push(i * 2)
  }
  const rader = [0, 1]

  function generateRnd() {
    // console.log(tmpValue)
    return String(Math.random() * 5 + 5)
  }

  // const handleClick = useCallback((e) => {
  //   let kolonne = e.target.getAttribute('data-col')
  //   let verdi = e.target.getAttribute('data-value')
  //   //
  //   // console.log(e.target)
  //   setForbruk((draft) => {
  //     const forbruk = draft.find((forbruk) => forbruk.id === kolonne)
  //     console.log(forbruk)
  //     forbruk.y = verdi
  //   })
  // }, [])

  // function handleClick(e) {
  //   let kolonne = e.target.getAttribute('data-col')
  //   let verdi = e.target.getAttribute('data-value')
  //   console.log(kolonne, verdi)

  // setForbruk([...forbruk, { id: kolonne, y: verdi }])
  // }

  return (
    <ForbruksgridWrapper className={'forbruksgrid-wrapper'}>
      {kolonner.map((item, colIndex) => {
        // console.log(item)
        return (
          <ForbruksKolonne
            key={colIndex}
            // className={'forbruks-kolonne'}
            data-col={colIndex}
          >
            {rader.map((rad, slotIndex) => (
              <ForbruksSlot
                key={rad}
                // className={'forbruks-slot'}
                // onClick={handleClick}
                data-col={colIndex}
                data-slot={slotIndex}
                data-value={generateRnd()}
              ></ForbruksSlot>
            ))}
          </ForbruksKolonne>
        )
      })}
    </ForbruksgridWrapper>
  )
}

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
export default ForbruksGrid
