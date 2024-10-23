// import './AktivitetsGrid.css'
import { ICONS } from '../utils/icons'
import styled from 'styled-components'

function AktivitetsGrid() {
  // function onClickHandle(e) {
  //   console.log(e.target)
  // }

  return (
    <Wrapper>
      {ICONS.map((item, index) => (
        <Slot
          // onClick={onClickHandle}
          key={index}
          src={item['src']}
          className={'aktivitets-slot'}
          data-forbruk={item['forbruk']}
        ></Slot>
      ))}
    </Wrapper>
  )
}

const Wrapper = styled.div`
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

const Slot = styled.img`
  border-radius: 8px;
  height: 60px;
  width: 60px;
  box-shadow: rgba(0, 0, 0, 0.1) 4px 4px 6px 0px;
`
export default AktivitetsGrid
