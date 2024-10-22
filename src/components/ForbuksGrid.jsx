import { useCallback } from 'react'
import './ForbruksGrid.css'

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
    <div className={'forbruksgrid-wrapper'}>
      {kolonner.map((item, colIndex) => {
        // console.log(item)
        return (
          <div
            key={colIndex}
            className={'forbruks-kolonne'}
            data-col={colIndex}
          >
            {rader.map((rad, slotIndex) => (
              <div
                key={rad}
                className={'forbruks-slot'}
                // onClick={handleClick}
                data-col={colIndex}
                data-slot={slotIndex}
                data-value={generateRnd()}
              ></div>
            ))}
          </div>
        )
      })}
    </div>
  )
}
export default ForbruksGrid
