import useForbukStore from '../stores/useForbruk'
import styled from 'styled-components'
import { ICONS } from '../utils/icons'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { useEffect, useRef, useState } from 'react'
import { Draggable } from 'gsap/Draggable'

export default function KontrollPanel() {
  const { forbruk, updateValue, addValue, subtractValue } = useForbukStore()
  const aktivitet = useRef([])
  // const [targetSlot, setTargetSlot] = useState()
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [parent, setParent] = useState()
  const forbruksSlotRef = useRef([])
  //   const [forbruksKolonne, setForbruksKolonne] = useState(0)

  const FobruksGrid = () => {
    var refIndex = 0
    const kolonner = []
    for (var i = 0; i <= 11; i++) {
      kolonner.push(i * 2)
    }
    const rader = [0, 1]

    return (
      <ForbruksgridWrapper className={'forbruksgrid-wrapper'}>
        {kolonner.map((item, colIndex) => {
          return (
            <ForbruksKolonne
              key={colIndex}
              data-col={colIndex}
            >
              {rader.map((rad, slotIndex) => (
                <ForbruksSlot
                  key={rad}
                  //   ref={(el) => (forbruksSlotRef.current[colIndex] = el)}
                  ref={(el) => {
                    // Opprett en nested array for refs hvis den ikke eksisterer
                    if (!forbruksSlotRef.current[slotIndex]) {
                      forbruksSlotRef.current[slotIndex] = []
                    }
                    forbruksSlotRef.current[slotIndex][colIndex] = el // Lagre referansen
                  }}
                  data-col={colIndex}
                  data-slot={slotIndex}
                ></ForbruksSlot>
              ))}
            </ForbruksKolonne>
          )
          refIndex += 1
          console.log(refIndex)
        })}
      </ForbruksgridWrapper>
    )
  }
  const AktivitetsGrid = () => {
    // const aktiviteter = useRef()
    gsap.registerPlugin(Draggable)
    useGSAP(() => {
      var newParent = undefined
      var forbruksKolonne = 0
      Draggable.create(aktivitet.current, {
        bounds: window,
        onDrag: function () {
          // Check for collision

          forbruksSlotRef.current.map((kolonne, colIndex) => {
            kolonne.map((rad, radIndex) => {
              if (
                Draggable.hitTest(
                  this.target,
                  forbruksSlotRef.current[colIndex][radIndex]
                )
              ) {
                newParent = forbruksSlotRef.current[colIndex][radIndex]
                forbruksKolonne =
                  forbruksSlotRef.current[colIndex][radIndex].getAttribute(
                    'data-col'
                  )
                // console.log('Hit', newParent, forbruksKolonne)
                // setParent(forbruksSlotRef.current[colIndex][radIndex])

                return
              }
              // Hvis vi ikke treffer noe set newParent til null
              //   newParent = null
              //   console.log(rad)
            })
          })
        },
        onDragEnd: function () {
          //   console.log('Target', this.target, 'Slot: ', newParent)
          let x = 0
          let y = 0

          if (newParent) {
            const draggedRect = this.target.getBoundingClientRect()
            const newParentRect = newParent.getBoundingClientRect()

            x = '+=' + (newParentRect.left - draggedRect.left)
            y = '+=' + (newParentRect.top - draggedRect.top)

            updateValue(
              forbruksKolonne,
              this.target.getAttribute('data-forbruk')
            )

            // console.log('Target: ', this.target, 'New parent: ', newParent)
            // console.log('Position: ', position)
            gsap.to(this.target, {
              duration: 0.1,
              x: x,
              y: y,
            })
          }
          //   newParent = null
        },
      })
    }, [])

    return (
      <Wrapper>
        {ICONS.map((item, index) => (
          <Slot
            ref={(el) => (aktivitet.current[index] = el)}
            key={index}
            src={item['src']}
            className={'aktivitets-slot'}
            data-forbruk={item['forbruk']}
          ></Slot>
        ))}
      </Wrapper>
    )
  }

  return (
    <>
      <FobruksGrid />
      <AktivitetsGrid />
    </>
  )
}

// Forbruk
const ForbruksgridWrapper = styled.div`
  align-items: center;
  column-gap: 15px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin-bottom: 1rem;
  margin-top: 1rem;
  row-gap: 15px;
  width: 885px;
`

const ForbruksKolonne = styled.div`
  column-gap: 15px;
  display: flex;
  flex-direction: column;
  row-gap: 15px;
`

const ForbruksSlot = styled.div`
  background-color: rgba(255, 255, 255, 1);
  border-radius: 8px;
  box-shadow: rgba(0, 0, 0, 0.1) 4px 4px 6px 0px;
  height: 60px;
  width: 60px;
  outline: 3px solid rgba(224, 224, 224, 1);
`
// Aktiviteter
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
