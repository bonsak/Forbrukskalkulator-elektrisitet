import { Stromsone } from '../../types/types'

type PrisData = {
  x: number // time (0-23)
  y: number // NOK_per_kWh
}

type PrisDataSet = {
  id: string
  data: PrisData[]
}

const datoTilString = (dato: Date): string =>
  `${dato.getFullYear()}/${(dato.getMonth() + 1).toString().padStart(2, '0')}-${dato.getDate().toString().padStart(2, '0')}`

export const fetchStromPriser = async (sone: Stromsone) => {
  const url = `https://www.hvakosterstrommen.no/api/v1/prices/${datoTilString(new Date())}_${sone}.json`
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

export const fetchHistoriskSnittPris = async (sone: Stromsone): Promise<number> => {
  const idag = new Date()
  const fetchMåned = (månederSiden: number): Promise<number[]> => {
    const dato = new Date(idag.getFullYear(), idag.getMonth() - månederSiden, 15)
    const url = `https://www.hvakosterstrommen.no/api/v1/prices/${datoTilString(dato)}_${sone}.json`
    return fetch(url)
      .then((r) => r.json())
      .then((raw: any[]) => raw.map((p) => p.NOK_per_kWh))
  }

  const resultater = await Promise.allSettled(
    Array.from({ length: 12 }, (_, i) => fetchMåned(i + 1))
  )

  const allePriser = resultater
    .filter((r): r is PromiseFulfilledResult<number[]> => r.status === 'fulfilled')
    .flatMap((r) => r.value)

  if (allePriser.length === 0) throw new Error('Ingen historiske priser tilgjengelig')

  return allePriser.reduce((sum, p) => sum + p, 0) / allePriser.length
}
