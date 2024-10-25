// import './AktivitetsGrid.css'
import { ICONS } from '../utils/icons'
import styled from 'styled-components'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { useEffect, useRef, useState } from 'react'
import { Draggable } from 'gsap/Draggable'
import useForbukStore from '../stores/useForbruk'
// NB
// Forbrukergrid må være kunne holde en array av iconer. Hver kolonne må kunne oppdateres med nytt innhold.
// Starte med 12 blanke iconer. Eller 12 tomme kolonner som hver kan holde iconer.

function AktivitetsGrid() {
  gsap.registerPlugin(Draggable)
  const aktiviteter = useRef()
  const aktivitet = useRef([])
  const forbruksSlotRef = useRef([])

  const [targetSlot, setTargetSlot] = useState()
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [parent, setParent] = useState()
  const { forbruk, updateValue } = useForbukStore()

  useGSAP(() => {
    var newParent = undefined
    Draggable.create(aktivitet.current, {
      bounds: window,
      // onPress: (e) => {
      // },
      onDrag: function () {
        // Check for collision
        for (let y = 0; y < forbruksSlotRef.current.length; y++) {
          if (Draggable.hitTest(this.target, forbruksSlotRef.current[y])) {
            // setPosition({ x: this.target.x, y: this.target.y })
            newParent = forbruksSlotRef.current[y]

            return
          }
          // Hvis vi ikke treffer noe set newParent til null
          newParent = null
        }
      },
      onDragEnd: function () {
        let x = 0
        let y = 0

        if (newParent) {
          const draggedRect = this.target.getBoundingClientRect()
          const newParentRect = newParent.getBoundingClientRect()

          x = '+=' + (newParentRect.left - draggedRect.left)
          y = '+=' + (newParentRect.top - draggedRect.top)

          updateValue(1, this.target.getAttribute('data-forbruk'))

          console.log('Forbruk: ', this.target.getAttribute('data-forbruk'))
        }
        gsap.to(this.target, {
          duration: 0.1,
          x: x,
          y: y,
        })
      },
    })
  }, [])

  return (
    <Wrapper ref={aktiviteter}>
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
const ForbruksSlot = styled.div`
  width: 60px;
  height: 60px;
  background-color: deeppink;
`
export default AktivitetsGrid
