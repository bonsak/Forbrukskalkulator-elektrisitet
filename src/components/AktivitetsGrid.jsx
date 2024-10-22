import './AktivitetsGrid.css'
import { ICONS } from '../utils/icons'

function AktivitetsGrid() {
  // function onClickHandle(e) {
  //   console.log(e.target)
  // }

  return (
    <div className={'aktivitets-wrapper'}>
      {ICONS.map((item, index) => (
        <img
          // onClick={onClickHandle}
          key={index}
          src={item['src']}
          className={'aktivitets-slot'}
          data-forbruk={item['forbruk']}
        />
      ))}
    </div>
  )
}
export default AktivitetsGrid
