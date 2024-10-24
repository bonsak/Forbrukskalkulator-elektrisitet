import useForbukStore from '../stores/useForbruk'
import styled from 'styled-components'

function ForbruksGrid(i) {
  const { forbruk, updateValue } = useForbukStore()

  const kolonner = []
  for (var i = 0; i <= 11; i++) {
    kolonner.push(i * 2)
  }
  const rader = [0, 1]

  function generateRnd() {
    return String(Math.random() * 10 + 5)
  }

  function handleClick(e) {
    let kolonne = parseFloat(e.target.getAttribute('data-col'))
    let verdi = parseFloat(e.target.getAttribute('data-value'))

    updateValue(kolonne, verdi)
  }

  return (
    <ForbruksgridWrapper className={'forbruksgrid-wrapper'}>
      {kolonner.map((item, colIndex) => {
        return (
          <ForbruksKolonne
            key={colIndex}
            data-col={colIndex}
          >
            {rader.map((rad, slotIndex) => (
              <ForbruksSlot
                key={rad}
                onClick={handleClick}
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
