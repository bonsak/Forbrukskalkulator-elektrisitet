// import './AktivitetsGrid.css'
import { ICONS } from '../utils/icons'
import styled from 'styled-components'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { useEffect, useRef, useState } from 'react'
import { Draggable } from 'gsap/Draggable'
import useTargetSlotStore from '../stores/useTargetSlot'
import { create } from 'zustand'

gsap.registerPlugin(Draggable)

function AktivitetsGrid() {
  const aktiviteter = useRef()
  const aktivitet = useRef([])
  const forbruksSlotRef = useRef([])

  const [targetSlot, setTargetSlot] = useState()

  // const { contextSafe } = useGSAP({ scope: aktiviteter })

  useGSAP(() => {
    Draggable.create(aktivitet.current, {
      bounds: window,
      // onPress: (e) => {
      // },
      onDrag: (e) => {
        for (let y = 0; y < forbruksSlotRef.current.length; y++) {
          if (Draggable.hitTest(e.target, forbruksSlotRef.current[y])) {
            // let targetPos = gsap.getProperty(
            //   forbruksSlotRef.current[y],
            //   'x',
            //   'px'
            // )
            // setTargetSlot(forbruksSlotRef.current[y])
            console.log(
              'targetSlot rect',
              forbruksSlotRef.current[y].getBoundingClientRect()
            )
            break
          }
        }
      },
      onDragEnd: (e) => {},
    })
  }, [])

  function handleEnter(e) {
    gsap.to(e.target, {
      duration: 0.1,
      rotation: -10,
    })
  }
  function handleLeave(e) {
    gsap.to(e.target, {
      duration: 0.1,
      rotation: 0,
    })
  }
  // const handleClick = useEffect((e) => {
  function onClickHandle(e) {
    setTargetSlot(e.target)
    console.log('on click target slot: ', targetSlot)
  }
  // }, [])
  //
  return (
    <Wrapper ref={aktiviteter}>
      {ICONS.map((item, index) => (
        <Slot
          onClick={onClickHandle}
          // onClick={onClickEvent}
          // onMouseEnter={handleEnter}
          // onMouseLeave={handleLeave}
          ref={(el) => (aktivitet.current[index] = el)}
          key={index}
          src={item['src']}
          className={'aktivitets-slot'}
          data-forbruk={item['forbruk']}
        ></Slot>
      ))}
      <ForbruksSlot
        key={0}
        ref={(el) => (forbruksSlotRef.current[0] = el)}
      >
        Hit test 0
      </ForbruksSlot>
      <ForbruksSlot
        key={1}
        ref={(el) => (forbruksSlotRef.current[1] = el)}
      >
        Hit test 1
      </ForbruksSlot>
      <ForbruksSlot
        key={2}
        ref={(el) => (forbruksSlotRef.current[2] = el)}
      >
        Hit test 2
      </ForbruksSlot>
      <ForbruksSlot
        key={3}
        ref={(el) => (forbruksSlotRef.current[3] = el)}
      >
        Hit test 3
      </ForbruksSlot>
      <ForbruksSlot
        key={4}
        ref={(el) => (forbruksSlotRef.current[4] = el)}
      >
        Hit test 4
      </ForbruksSlot>
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
