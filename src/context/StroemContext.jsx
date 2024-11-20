import { createContext, useState, useContext, useEffect } from 'react'
import { DEFAULT_DAG } from '../utils/DefaultDag'

const StromContext = createContext()

export const StromProvider = ({ children }) => {
  const [totaltForbruk, setTotaltForbruk] = useState(0)
  const [gjennomsnittsPris, setGjennomsnittsPris] = useState(0)
  const [stroemForbruk, setStroemForbruk] = useState({
    id: 'stroemforbruk',
    data: [],
  })
  const [priser, setPriser] = useState([])
  const [dagensStroemPris, setDagensStroemPris] = useState(null)
  const [mittHus, setMittHus] = useState({
    navn: 'Wessels gt 4',
    antallRom: 5,
    antallVoksne: 2,
    antallBarn: 1,
    antallKvadrat: 110,
    antallVarmtvannstanker: 1,
    effektVarmtvannstanker: 2.5,
    effektElbillader: 6.5,
  })

  // useEffect(() => {
  //   setStroemForbruk(DEFAULT_DAG)
  // }, [])

  const verdier = {
    gjennomsnittsPris,
    setGjennomsnittsPris,
    stroemForbruk,
    setStroemForbruk,
    priser,
    setPriser,
    dagensStroemPris,
    setDagensStroemPris,
    mittHus,
    setMittHus,
    totaltForbruk,
    setTotaltForbruk,
  }

  return (
    <StromContext.Provider value={verdier}>{children}</StromContext.Provider>
  )
}

export const useStrom = () => {
  const context = useContext(StromContext)
  if (!context) {
    throw new Error('useStrom må brukes innenfor en StromProvider')
  }
  return context
}
