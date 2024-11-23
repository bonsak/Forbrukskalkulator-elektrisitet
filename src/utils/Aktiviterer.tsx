import styled from 'styled-components'
import '@assets/aktiviteter/dusj.svg'
import '@assets/aktiviteter/elbil.svg'
import '@assets/aktiviteter/forbruk.svg'
import '@assets/aktiviteter/kaffetrakter.svg'
import '@assets/aktiviteter/oppvarming.svg'
import '@assets/aktiviteter/oppvaskmaskin.svg'
import '@assets/aktiviteter/stekeovn-plate.svg'
import '@assets/aktiviteter/vaskemaskin.svg'

const AktivitetsGrid = styled.div`
  display: grid;
  gap: 1rem;
`

const AktivitetsIkon = styled.img`
  width: 100%;
  height: auto;
  max-width: 40px;
  object-fit: contain;
`

export default function Icons() {
  const icons = [
    { src: '@assets/aktiviteter/dusj.svg', alt: 'Dusj ikon' },
    { src: '@assets/aktiviteter/elbil.svg', alt: 'Elbil ikon' },
    { src: '@assets/aktiviteter/forbruk.svg', alt: 'Forbruk ikon' },
    { src: '@assets/aktiviteter/kaffetrakter.svg', alt: 'Kaffetrakter ikon' },
    { src: '@assets/aktiviteter/oppvarming.svg', alt: 'Oppvarming ikon' },
    { src: '@assets/aktiviteter/oppvaskmaskin.svg', alt: 'Oppvaskmaskin ikon' },
    { src: '@assets/aktiviteter/stekeovn-plate.svg', alt: 'Stekeovn ikon' },
    { src: '@assets/aktiviteter/vaskemaskin.svg', alt: 'Vaskemaskin ikon' },
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
