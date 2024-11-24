import { Stromsone } from '../../types/types'

type PrisData = {
  x: number // time (0-23)
  y: number // NOK_per_kWh
}

type PrisDataSet = {
  id: string
  data: PrisData[]
}

export const fetchStromPriser = async (sone: Stromsone) => {
  const idag = new Date()
  const datoString = `${idag.getFullYear()}/${(idag.getMonth() + 1)
    .toString()
    .padStart(2, '0')}-${idag.getDate().toString().padStart(2, '0')}`
  const url = `https://www.hvakosterstrommen.no/api/v1/prices/${datoString}_${sone}.json`
  try {
    const response = await fetch(url)
    const rawData = await response.json()
    const transformertData: PrisData[] = rawData.map(
      (pris: any, index: number) => ({
        x: index,
        y: pris.NOK_per_kWh,
      })
    )
    return transformertData
  } catch (error) {
    console.error('Kunne ikke hente strømpriser:', error)
    throw error
  }
}
