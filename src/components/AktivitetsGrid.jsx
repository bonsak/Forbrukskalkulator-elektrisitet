// import './AktivitetsGrid.css'

// Liste sorterbar
// https://www.youtube.com/watch?v=dL5SOdgMbRY
// https://www.hover.dev/components/boards

// https://www.youtube.com/watch?v=O5lZqqy7VQE

import { ICONS } from '../utils/icons'
import styled from 'styled-components'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { useEffect, useRef, useState } from 'react'
import { Draggable } from 'gsap/Draggable'
import useTargetSlotStore from '../stores/useTargetSlot'
import { create } from 'zustand'
import {
  DndContext,
  useDroppable,
  useDraggable,
  DragOverlay,
  closestCorners,
} from '@dnd-kit/core'
import { CSS } from '@dnd-kit/utilities'
import { produceWithPatches } from 'immer'

// gsap.registerPlugin(Draggable)

function AktivitetsGrid(bounds, ...delegated) {
  const aktiviteter = useRef()
  const aktivitet = useRef([])
  const forbruksSlotRef = useRef([])

  const [targetSlot, setTargetSlot] = useState()
  // const { targetSlot, setTargetSlot, resetTargetSlot } = useTargetSlotStore()

  // const { contextSafe } = useGSAP({ scope: aktiviteter })

  // useGSAP(() => {
  //   const drag = Draggable.create(aktivitet.current, {
  //     bounds: window,
  //     onPress: (e) => {
  //       // setTargetSlot(e.target)
  //       // console.log('on Press: ', e.target)
  //       //   // gsap.to(e.target, {
  //       //   //   scale: 1.1,
  //       //   // })
  //       //   // gsap.to(e.target, {
  //       //   //   duration: 0.1,
  //       //   //   rotate: 0,
  //       //   // })
  //     },
  //     onDrag: (e) => {
  //       // console.log(
  //       //   'refs: ',
  //       //   e.target,
  //       //   aktivitet.current,
  //       //   forbruksSlotRef.current
  //       // )
  //       // console.log('Slots lengde', forbruksSlotRef.current.length)

  //       var i = forbruksSlotRef.current.length
  //       while (--i >= 0) {
  //         if (Draggable.hitTest(e.target, forbruksSlotRef.current[i], 12)) {
  //           // gsap.to(e.target, {
  //           //   rotate: -10,
  //           // })
  //           // let aktivitetsBB = e.target.getBoundingClientRect()
  //           // let forbruksBB = forbruksSlotRef.current.getBoundingClientRect()
  //           setTargetSlot(forbruksSlotRef.current[i])
  //           // x = '+=' + (forbruksBB.left - aktivitetsBB.left)
  //           // y = '+=' + (forbruksBB.top - aktivitetsBB.top)
  //           // useTargetSlotStore((state) => state.bears)
  //           // const ttt = setTargetSlot(forbruksSlotRef.current[i])
  //           console.log('Loop Hit target object', targetSlot)
  //           // setTargetSlot(forbruksSlotRef.current[i])

  //           // }))
  //           // return
  //         } else {
  //           // resetTargetSlot()
  //           // setTargetSlot(null)
  //           // gsap.to(e.target, {
  //           //   duration: 0.1,
  //           //   x: 0,
  //           //   y: 0,
  //           // })
  //           console.log('No hit', targetSlot)
  //         }
  //       }
  //     },
  //     onDragEnd: (e) => {
  //       // let x = 0
  //       // let y = 0
  //       // let aktivitetsBB = e.target.getBoundingClientRect()
  //       // let forbruksBB = forbruksSlotRef.current.getBoundingClientRect()
  //       // x = '+=' + (forbruksBB.left - aktivitetsBB.left)
  //       // y = '+=' + (forbruksBB.top - aktivitetsBB.top)
  //       // console.log('Forbruks BB: ', forbruksBB)
  //       // console.log('Aktivitets BB: ', aktivitetsBB)
  //       // gsap.to(e.target, {
  //       //   duration: 0.1,
  //       //   rotation: 0,
  //       //   x: x,
  //       //   y: y,
  //       // })
  //       // console.log('Targetslot: ', targetSlot)
  //     },
  //   })
  //   // const increasePopulation = useStore((state) => state.increasePopulation)
  //   // const updateTarget = useTargetSlotStore((forbruksSlotRef.current[i]) => set({targetSlot: forbruksSlotRef.current[i]}));
  // }, [])
  // function updateTargetSlot(target) {
  //   setTargetSlot(target)
  //   console.log('Her', targetSlot)
  // }
  // function handleEnter(e) {
  //   gsap.to(e.target, {
  //     duration: 0.1,
  //     rotation: -10,
  //   })
  // }
  // function handleLeave(e) {
  //   gsap.to(e.target, {
  //     duration: 0.1,
  //     rotation: 0,
  //   })
  // }
  // const handleClick = useEffect((e) => {
  // function onClickHandle(e) {
  //   setTargetSlot(e.target)
  //   console.log('on click target slot: ', targetSlot)
  // }
  // }, [])
  //

  function Droppable() {
    const { isOver, setNodeRef } = useDroppable({
      id: 'unique-id',
    })

    const style = { color: isOver ? 'green' : undefined }

    return (
      <div
        ref={setNodeRef}
        style={style}
      >
        <ForbruksSlot />
      </div>
    )
  }

  function Draggable(props) {
    const { attributes, listeners, setNodeRef, transform, transition } =
      useDraggable({
        id: 'unique-id',
      })
    // const style = transform
    //   ? {
    //       // transform: CSS.Translate.toString(transform),
    //       transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
    //     }
    //   : undefined
    const style = {
      transition,
      transform: CSS.Transform.toString(transform),
    }

    return (
      <button
        ref={setNodeRef}
        style={style}
        {...listeners}
        {...attributes}
        {...props}
      >
        <ForbruksSlot />
      </button>
    )
  }

  const [activeId, setActiveId] = useState(null)
  const [items] = useState(['1'])
  const [isDragging, setIsDragging] = useState(false)

  return (
    <>
      <ForbruksSlot
        draggable='true'
        onDragStart={(e) => setIsDragging(true)}
        // style={{ cursor: isDragging ? 'grab' : undefined }}
      ></ForbruksSlot>
    </>
    // <DndContext
    //   // onDragStart={handleDragStart}
    //   onDragEnd={handleDragEnd}
    //   // onDragOver={handleDragOver}
    //   colissionDetection={closestCorners}
    // >
    //   <Droppable />
    //   {/* <Draggable /> */}
    //   {items.map((id) => (
    //     <Draggable
    //       key={id}
    //       id={id}
    //     >
    //       <div value={`Item ${id}`} />
    //     </Draggable>
    //   ))}
    //   {/* <DragOverlay>
    //     {activeId ? <div value={`Item ${activeId}`} /> : null}
    //   </DragOverlay> */}
    // </DndContext>
  )

  function handleDragEnd(event) {
    const { active, over } = event
    // let x = 0
    // let y = 0
    // let aktivitetsBB = active.getBoundingClientRect()
    // let forbruksBB = v.getBoundingClientRect()
    // x = '+=' + (forbruksBB.left - aktivitetsBB.left)
    // y = '+=' + (forbruksBB.top - aktivitetsBB.top)
    // console.log('Forbruks BB: ', forbruksBB)
    // console.log('Aktivitets BB: ', aktivitetsBB)

    console.log('Active', active, 'Over', over)
    // if (active.id === over.id) return
  }
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
  classname: '[add your classes here]';
  width: 60px;
  height: 60px;
  background-color: deeppink;
  &:hover {
    cursor: grab;
  }
  &:active {
    cursor: grabbing;
  }
`
export default AktivitetsGrid
