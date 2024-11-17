import useImage from 'use-image'
import { ForbruksEnhet } from '../types/types'

export const useForbruksEnheter = (): ForbruksEnhet[] => {
  const [dusj] = useImage('/icons/dusj.png')
  const [elbil] = useImage('/icons/elbil.png')
  const [forbruk] = useImage('/icons/forbruk.png')
  const [kaffetrakter] = useImage('/icons/kaffetrakter.png')
  const [oppvarming] = useImage('/icons/oppvarming.png')
  const [oppvaskmaskin] = useImage('/icons/oppvaskmaskin.png')
  const [stekeovnplate] = useImage('/icons/stekeovn-plate.png')
  const [vaskemaskin] = useImage('/icons/vaskemaskin.png')

  const enheter: ForbruksEnhet[] = [
    { id: '1', icon: elbil, name: 'Elbil-lading', wattage: 7400, description: 'Elbil-lading', minWatt: 2500, maxWatt: 9500 },
    { id: '2', icon: oppvarming, name: 'Oppvarming', wattage: 2500, description: 'Oppvarming', minWatt: 1000, maxWatt: 3500 },
    { id: '3', icon: dusj, name: 'Dusj', wattage: 1200, description: 'Dusj', minWatt: 500, maxWatt: 1500 },
    { id: '4', icon: forbruk, name: 'TV', wattage: 150, description: 'TV', minWatt: 50, maxWatt: 200 },
    { id: '5', icon: forbruk, name: 'Laptop', wattage: 65, description: 'Laptop', minWatt: 20, maxWatt: 100 },
    { id: '6', icon: kaffetrakter, name: 'Kaffemaskin', wattage: 1500, description: 'Kaffemaskin', minWatt: 500, maxWatt: 1800 },
    { id: '7', icon: forbruk, name: 'Lamper', wattage: 60, description: 'Lamper', minWatt: 20, maxWatt: 100 },
    { id: '8', icon: vaskemaskin, name: 'Vaskemaskin', wattage: 2000, description: 'Vaskemaskin', minWatt: 1000, maxWatt: 3000 },
    { id: '9', icon: oppvaskmaskin, name: 'Oppvaskmaskin', wattage: 1800, description: 'Oppvaskmaskin', minWatt: 900, maxWatt: 2500 },
    { id: '10', icon: vaskemaskin, name: 'Tørketrommel', wattage: 3000, description: 'Tørketrommel', minWatt: 1500, maxWatt: 3000 },
    { id: '11', icon: forbruk, name: 'Kjøleskap', wattage: 150, description: 'Kjøleskap', minWatt: 75, maxWatt: 150 },
    { id: '12', icon: stekeovnplate, name: 'Komfyr', wattage: 2200, description: 'Komfyr', minWatt: 1100, maxWatt: 3000 },
    { id: '13', icon: forbruk, name: 'Varmepumpe', wattage: 1000, description: 'Varmepumpe', minWatt: 500, maxWatt: 2000 },
    { id: '14', icon: forbruk, name: 'Varmtvannstank', wattage: 2000, description: 'Varmtvannstank', minWatt: 1000, maxWatt: 3000 },
    { id: '15', icon: forbruk, name: 'PC', wattage: 300, description: 'PC', minWatt: 150, maxWatt: 500 },
    { id: '16', icon: forbruk, name: 'Stereoanlegg', wattage: 100, description: 'Stereoanlegg', minWatt: 50, maxWatt: 250 },
    { id: '17', icon: forbruk, name: 'Mobillading', wattage: 20, description: 'Mobillading', minWatt: 10, maxWatt: 35 },
  ]

  return enheter
}
