import styled from 'styled-components'
import dusj from '@assets/aktiviteter/dusj.svg'
import elbil from '@assets/aktiviteter/elbil.svg'
import forbruk from '@assets/aktiviteter/forbruk.svg'
import kaffetrakter from '@assets/aktiviteter/kaffetrakter.svg'
import oppvarming from '@assets/aktiviteter/oppvarming.svg'
import oppvaskmaskin from '@assets/aktiviteter/oppvaskmaskin.svg'
import stekeovn from '@assets/aktiviteter/stekeovn-plate.svg'
import vaskemaskin from '@assets/aktiviteter/vaskemaskin.svg'

const AktivitetsGrid = styled.div`
  display: grid;
  gap: 1rem;
`

const AktivitetsIkon = styled.img`
  // Legg til din ikon-styling her
`

export default function Icons() {
  const icons = [
    { src: dusj, alt: 'Dusj ikon' },
    { src: elbil, alt: 'Elbil ikon' },
    { src: forbruk, alt: 'Forbruk ikon' },
    { src: kaffetrakter, alt: 'Kaffetrakter ikon' },
    { src: oppvarming, alt: 'Oppvarming ikon' },
    { src: oppvaskmaskin, alt: 'Oppvaskmaskin ikon' },
    { src: stekeovn, alt: 'Stekeovn ikon' },
    { src: vaskemaskin, alt: 'Vaskemaskin ikon' },
  ]

  return (
    <AktivitetsGrid>
      {icons.map((item, index) => (
        <AktivitetsIkon
          key={index}
          src={item.src}
          alt={item.alt}
        />
      ))}
    </AktivitetsGrid>
  )
}
