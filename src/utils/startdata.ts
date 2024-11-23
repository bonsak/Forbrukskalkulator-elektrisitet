const DATAPUNKTER = 12

function generateData() {
  return Array.from({ length: DATAPUNKTER }, (_, i) => {
    let x = i - 1 + 1
    let y = Math.random() + 1 * 0.5
    return { x, y }
  })
}

export const FORBRUKSDATA = generateData()
export const PRISDATA = generateData()
export const NETTDATA = generateData()
