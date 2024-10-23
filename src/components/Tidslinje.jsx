// import './Tidslinje.css'
import styled from 'styled-components'

function Tidslinje() {
  return (
    <TidContainer>
      <TidWrapper>
        <Natt>Natt</Natt>
        <MorgenKveld>Morgen</MorgenKveld>
        <Dag>Dag</Dag>
        <MorgenKveld>Kveld</MorgenKveld>
        <Natt>Natt</Natt>
      </TidWrapper>
    </TidContainer>
  )
}

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

export default Tidslinje
