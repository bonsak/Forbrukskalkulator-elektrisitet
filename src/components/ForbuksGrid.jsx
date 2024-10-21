import './ForbruksGrid.css'

function ForbruksGrid() {

  const kolonner = []
  for(var i = 0; i<=11 ;i ++){
    kolonner.push(i * 2)
  }
  const rader = [0,1]


  // kolonner.map((item, index) =>{
  //   kolonner[index] = index * 2
  // })
  console.log(kolonner)

  return (
    <div className={'forbruksgrid-wrapper'}>
      {kolonner.map((item, index) => {
        // console.log(item)
        return <div key={index} className={'forbruks-kolonne'}>
         {rader.map((rad, index) => (
            <div key={rad} className={'forbruks-slot'}></div>
      ))}
        </div>
    })}
    </div>
  )
  
}
export default ForbruksGrid
