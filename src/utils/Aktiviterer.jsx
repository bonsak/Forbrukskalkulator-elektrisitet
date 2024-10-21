// import React from 'react'
import dusj from '../assets/aktiviteter/dusj.svg'
import elbil from '../assets/aktiviteter/elbil.svg'
import forbruk from '../assets/aktiviteter/forbruk.svg'
import kaffetrakter from '../assets/aktiviteter/kaffetrakter.svg'
import oppvarming from '../assets/aktiviteter/oppvarming.svg'
import oppvaskmaskin from '../assets/aktiviteter/oppvaskmaskin.svg'
import stekeovn from '../assets/aktiviteter/stekeovn-plate.svg'
import vaskemaskin from '../assets/aktiviteter/vaskemaskin.svg'

export default function Icon() {
  const icons = [
    dusj,
    elbil,
    forbruk,
    kaffetrakter,
    oppvarming,
    oppvaskmaskin,
    stekeovn,
    vaskemaskin,
  ]

  return (
    <div className='akrivitetsgrid'>
      {icons.map((item) => (
        <img
          key={crypto.randomUUID()}
          className='aktivitet'
          src={item}
        />
      ))}
    </div>
  )
}
