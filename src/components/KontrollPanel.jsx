import useForbukStore from '../stores/useForbruk'
import styled from 'styled-components'
import { ICONS } from '../utils/icons'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { useRef, useState } from 'react'
import { Draggable } from 'gsap/Draggable'

gsap.registerPlugin(Draggable)

export default function KontrollPanel() {
  const { updateValue } = useForbukStore() // Fjernet ubrukte variabler
  const aktivitet = useRef([])
  // const [targetSlot, setTargetSlot] = useState()
  const forbruksKolonne = useRef([])
  const [position, setPosition] = useState({ x: 0, y: 0 })
  //   const [forbruksKolonne, setForbruksKolonne] = useState(0)

  const dragInstance = useRef(null)

  const FobruksGrid = () => {
    const kolonner = []
    for (var i = 0; i <= 11; i++) {
      kolonner.push(i * 2)
    }

    return (
      <ForbruksgridWrapper className={'forbruksgrid-wrapper'}>
        {kolonner.map((item, colIndex) => {
          return (
            <ForbruksKolonne
              key={colIndex}
              ref={(el) => (forbruksKolonne.current[colIndex] = el)}
              data-col={colIndex}
            ></ForbruksKolonne>
          )
        })}
      </ForbruksgridWrapper>
    )
  }
  const AktivitetsGrid = () => {
    useGSAP(() => {
      dragInstance.current = Draggable.create(
        '.forbruksenhet',
        {
          bounds: window,
          onDrag: function () {
            this.lastX = this.x
            this.lastY = this.y
            console.log(this.lastX, this.lastY)
            forbruksKolonne.current.map((kolonne, colIndex) => {
              if (
                Draggable.hitTest(
                  this.target,
                  forbruksKolonne.current[colIndex]
                )
              ) {
                this.newParent = forbruksKolonne.current[colIndex]
                // newParent = forbruksKolonne.current[colIndex][radIndex]
                // forbruksKolonne =
                //   forbruksKolonne.current[colIndex][radIndex].getAttribute(
                //     'data-col'
                //   )
                return
              }
              // })
            })
          },
          onDragEnd: function () {
            console.log('Target', this.target, 'Slot: ', this.newParent)
            let x = 0
            let y = 0
            if (this.newParent) {
              const draggedRect = this.target.getBoundingClientRect()
              const newParentRect = this.newParent.getBoundingClientRect()
              x = '+=' + (newParentRect.left - draggedRect.left)
              y = '+=' + (newParentRect.top - draggedRect.top)
              // updateValue(
              //   forbruksKolonne,
              //   this.target.getAttribute('data-forbruk')
              // )
              gsap.to(this.target, {
                duration: 0.1,
                x: x,
                y: y,
              })
            }
            //   newParent = null
          },
        },
        []
      )

      // useGSAP(() => {
      //   var droppables = aktivitet.current
      //   var dropZones = forbruksKolonne.current

      //   var overlapThreshold = '80%'

      //   // droppables.each(initDroppable)
      //   droppables.map((item, index) => {
      //     initDroppable(index, item)
      //   })

      //   function initDroppable(i, element) {
      //     var insideZone = false

      //     var highlightAnimation = gsap.to(element, 0.3, {
      //       backgroundColor: 'green',
      //       paused: true,
      //     })

      //     Draggable.create(element, {
      //       onDrag: function () {
      //         insideZone = false

      //         for (var i = 0; i < dropZones.length; i++) {
      //           if (this.hitTest(dropZones[i], overlapThreshold)) {
      //             insideZone = true
      //             break
      //           }
      //         }

      //         if (insideZone) {
      //           highlightAnimation.play()
      //         } else {
      //           highlightAnimation.reverse()
      //         }
      //       },
      //       onDragEnd: function () {
      //         if (!insideZone) {
      //           gsap.to(this.target, 0.2, {
      //             x: 0,
      //             y: 0,
      //           })
      //         }
      //       },
      //     })
      //   }
      // })
    })
    return (
      <Wrapper>
        {ICONS.map((item, index) => (
          <Forbruksenhet
            ref={(el) => (aktivitet.current[index] = el)}
            key={index}
            src={item['src']}
            className={'forbruksenhet'}
            data-forbruk={item['forbruk']}
          ></Forbruksenhet>
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
  align-items: flex-start;
  row-gap: 15px;
  background-color: rgba(255, 255, 255, 1);
  border-radius: 8px;
  box-shadow: rgba(0, 0, 0, 0.1) 4px 4px 6px 0px;
  min-height: 80px;
  width: 60px;
  outline: 3px solid rgba(224, 224, 224, 1);
`

// const ForbruksSlot = styled.div`
//   background-color: rgba(255, 255, 255, 1);
//   border-radius: 8px;
//   box-shadow: rgba(0, 0, 0, 0.1) 4px 4px 6px 0px;
//   height: 60px;
//   width: 60px;
//   outline: 3px solid rgba(224, 224, 224, 1);
// `
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

const Forbruksenhet = styled.img`
  border-radius: 8px;
  height: 60px;
  width: 60px;
  box-shadow: rgba(0, 0, 0, 0.1) 4px 4px 6px 0px;
`
