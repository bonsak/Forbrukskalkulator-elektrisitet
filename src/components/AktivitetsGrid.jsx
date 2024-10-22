import './AktivitetsGrid.css'
// import Icons from '../utils/Aktiviterer'

function AktivitetsGrid() {
  // console.log(typeof Icons)

  return (
    <div className={'aktivitets-wrapper'}>
      <img
        className={'aktivitets-slot'}
        src='./icons/dusj.svg'
      />
      <img
        className={'aktivitets-slot'}
        src='./icons/elbil.svg'
      />
      <img
        className={'aktivitets-slot'}
        src='./icons/forbruk.svg'
      />
      <img
        className={'aktivitets-slot'}
        src='./icons/kaffetrakter.svg'
      />
      <img
        className={'aktivitets-slot'}
        src='./icons/oppvarming.svg'
      />
      <img
        className={'aktivitets-slot'}
        src='./icons/oppvaskmaskin.svg'
      />
      <img
        className={'aktivitets-slot'}
        src='./icons/stekeovn-plate.svg'
      />
      <img
        className={'aktivitets-slot'}
        src='./icons/vaskemaskin.svg'
      />
    </div>
  )
}
export default AktivitetsGrid
