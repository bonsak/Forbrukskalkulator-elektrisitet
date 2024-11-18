import { Stage, Layer, Rect, Line, Group, Text, Image } from 'react-konva'
import { useState, useEffect } from 'react'
import styled from 'styled-components'
import { COLORS } from '../utils/constants'
import ForbruksKonfig from './ForbruksKonfig'
import { KonvaGridProps, Rectangle, PreviewRectangle } from '../types/types'
import { useForbruksEnheter } from '../utils/Forbruksenheter'

const KonvaGrid = ({ setStroemForbruk }: KonvaGridProps) => {

  const FORBRUKSENHETER = useForbruksEnheter()

  const [rectangles, setRectangles] = useState<Rectangle[]>([])
  const [isDrawing, setIsDrawing] = useState(false)
  const [isResizing, setIsResizing] = useState(false)
  const [resizeEdge, setResizeEdge] = useState<'left' | 'right' | null>(null)
  const [startPos, setStartPos] = useState({ x: 0, y: 0 })
  const [previewRect, setPreviewRect] = useState<PreviewRectangle | null>(null)
  const [selectedRect, setSelectedRect] = useState<Rectangle | null>(null)
  const [isForbruksKonfigOpen, setIsForbruksKonfigOpen] = useState(false)
  const [isManipulating, setIsManipulating] = useState(false)

  // Konstanter
  const stageWidth = 885
  const stageHeight = 300
  const RESIZE_HANDLE_WIDTH = 10
  const gridColumns = 24
  const columnWidth = stageWidth / gridColumns
  const rowHeight = 40
  const rows = Math.floor(stageHeight / rowHeight)


  // Sjekk om musen er over resize håndtak
  // Kan dette gjøre ved onMouseOver onMouseOut?
  // Bruk senere
  const isMouseOverResizeHandle = (
    e: any,
    rect: Rectangle
  ): 'left' | 'right' | null => {
    const stage = e.target.getStage()
    const mouseX = stage.getPointerPosition().x
    const leftHandle =
      mouseX >= rect.x && mouseX <= rect.x + RESIZE_HANDLE_WIDTH
    const rightHandle =
      mouseX >= rect.x + rect.width - RESIZE_HANDLE_WIDTH &&
      mouseX <= rect.x + rect.width

    if (leftHandle) return 'left'
    if (rightHandle) return 'right'
    return null
  }

  // Hvis vi treffer stage, start å tegne
  const handleMouseDown = (e: any) => {
    if (e.target === e.target.getStage()) {
      console
      setIsDrawing(true)
      const pos = e.target.getStage().getPointerPosition()
      const snapped = snapToGrid(pos.x, 0)
      const yPos = Math.floor(pos.y / rowHeight) * rowHeight

      setStartPos({
        x: snapped.x,
        y: yPos,
      })

      setPreviewRect({
        x: snapped.x,
        y: yPos,
        width: 0,
        height: rowHeight,
        fill: 'transparent',
        stroke: '#b1afa9',
        strokeWidth: 2,
        dash: [5, 5],
      })
    }
  }

  // Mulig denne logikken kan flyttes til handleDragMove
  // const handleRectMouseDown = (e: any, rect: Rectangle) => {
    
  //   // const resizeEdge = isMouseOverResizeHandle(e, rect)
  //   if (resizeEdge) {
  //     // console.log('resizeEdge', resizeEdge)
  //     e.target.draggable(false)
  //     setIsResizing(true)
  //     setResizeEdge(resizeEdge)
  //     setSelectedRect(rect)
  //     // console.log('Selected rect:', e.target.attrs.id)
  //     const pos = e.target.getStage().getPointerPosition()
  //     setStartPos({ x: pos.x, y: rect.y })

  //     setPreviewRect({
  //       ...rect,
  //       fill: 'transparent',
  //       stroke: '#b1afa9',
  //       strokeWidth: 2,
  //       dash: [5, 5],
  //     })
  //     e.cancelBubble = true
  //   } else {
  //     e.target.draggable(true)
  //   }
  // }

  // Når vi slutter å dra, snap til grid
  // const handleDragEnd = (e: any) => {
  //   setIsManipulating(false)
  //   const rect = e.target
  //   const pos = rect.position()
  //   const snapped = snapToGrid(pos.x, rect.width())

  //   setRectangles((prevRectangles) =>
  //     prevRectangles.map((r) =>
  //       r.id === rect.attrs.id
  //         ? { ...r, x: snapped.x, y: Math.round(pos.y / rowHeight) * rowHeight }
  //         : r
  //     )
  //   )

  //   rect.position({
  //     x: snapped.x,
  //     y: Math.round(pos.y / rowHeight) * rowHeight,
  //   })
  //   rect.opacity(1)
  //   setPreviewRect(null)
  //   beregnStroemForbruk()
  // }

  // Dette er nok ikke helt bra.
  const handleMouseMoveOnStage = (e: any) => {
    const stage = e.target.getStage()
    const pos = stage.getPointerPosition()

    if (isDrawing) {
      setIsManipulating(true)
      const width = Math.abs(pos.x - startPos.x)
      const snapped = snapToGrid(Math.min(startPos.x, pos.x), width)
      setPreviewRect({
        x: snapped.x,
        y: startPos.y,
        width: snapped.width,
        height: rowHeight,
        fill: 'transparent',
        stroke: '#b1afa9',
        strokeWidth: 2,
        dash: [5, 5],
      })
    } 
    // else if (isResizing && selectedRect) {
    //   setIsManipulating(true)
    //   let newWidth: number, newX: number

    //   if (resizeEdge === 'right') {
    //     newWidth = Math.max(columnWidth, pos.x - selectedRect.x)
    //     const snapped = snapToGrid(selectedRect.x, newWidth)
    //     setPreviewRect({
    //       ...selectedRect,
    //       width: snapped.width,
    //       fill: 'transparent',
    //       stroke: '#b1afa9',
    //       strokeWidth: 2,
    //       dash: [5, 5],
    //     })
    //   } else if (resizeEdge === 'left') {
    //     newWidth = Math.max(
    //       columnWidth,
    //       selectedRect.x + selectedRect.width - pos.x
    //     )
    //     newX = Math.min(
    //       pos.x,
    //       selectedRect.x + selectedRect.width - columnWidth
    //     )
    //     const snapped = snapToGrid(newX, newWidth)
    //     setPreviewRect({
    //       ...selectedRect,
    //       x: snapped.x,
    //       width: snapped.width,
    //       fill: 'transparent',
    //       stroke: '#b1afa9',
    //       strokeWidth: 2,
    //       dash: [5, 5],
    //     })
    //   }
    // } 
    else {
      // const hoveredRect = rectangles.find((rect) => {
      //   const resizeEdge = isMouseOverResizeHandle(
      //     { target: { getStage: () => stage } },
      //     rect
      //   )
      //   return resizeEdge !== null
      // })

      // document.body.style.cursor = hoveredRect ? 'ew-resize' : 'default'
    }
  }

  // Lager lite default rect når bruker løfter musen
  const handleMouseUpOnStage = (e: any) => {
    // setIsDragging(false)
    // setIsManipulating(false)
    if (isDrawing) {
      console.log('handleMouseUpOnStage', "isDrawing")
      const stage = e.target.getStage()
      const endPos = stage.getPointerPosition()
      const dragDistance = Math.abs(endPos.x - startPos.x)

      const snapped = snapToGrid(
        dragDistance <= 30 ? startPos.x : Math.min(startPos.x, endPos.x),
        dragDistance <= 30 ? columnWidth * 2 : dragDistance
      )

      const rndNumber: number = Math.floor(Math.random() * FORBRUKSENHETER.length)

      const newRectangle: Rectangle = {
        x: snapped.x,
        y: startPos.y,
        width: snapped.width,
        height: rowHeight,
        stroke: COLORS.clr_lightorange,
        strokeWidth: 5,
        strokeScaleEnabled: false,
        fill: COLORS.clr_mintgreen,
        // onDragStart: handleDragStart,
        // onDragMove: handleDragMove,
        // onDragEnd: handleDragEnd,
        onDblclick: (e) => {
          const clickedRect = e.target
          setSelectedRect(clickedRect)
          setIsForbruksKonfigOpen(true)
        },
        id: Math.random().toString(36).substring(7),
        draggable: false,
        isDragging: false,
        wattage: FORBRUKSENHETER[rndNumber].wattage,
        minWatt: FORBRUKSENHETER[rndNumber].minWatt,
        maxWatt: FORBRUKSENHETER[rndNumber].maxWatt,
        name: FORBRUKSENHETER[rndNumber].name,
        description: FORBRUKSENHETER[rndNumber].description,
        image: rndNumber,
      }

      setRectangles([...rectangles, newRectangle])
      beregnStroemForbruk()
    // } else if (isResizing && selectedRect && previewRect) {
    //   setRectangles(
    //     rectangles.map((rect) =>
    //       rect.id === selectedRect.id
    //         ? {
    //             ...rect,
    //             x: previewRect.x,
    //             width: previewRect.width,
    //           }
    //         : rect
    //     )
    //   )
      beregnStroemForbruk()
    }

    setIsDrawing(false)
    // setIsResizing(false)
    setSelectedRect(null)
    setPreviewRect(null)
  }

  // Fyrer n
  const handleDragMove = (e: any) => {
    setIsManipulating(true)

    setSelectedRect(e.target)
    const activeRect = e.target

    const pos = activeRect.position()
    const snapped = snapToGrid(pos.x, activeRect.width())

    setPreviewRect({
      x: snapped.x,
      y: Math.round(pos.y / rowHeight) * rowHeight,
      width: activeRect.width(),
      height: rowHeight,
      fill: 'transparent',
      stroke: '#b1afa9',
      strokeWidth: 2,
      dash: [5, 5],
    })
    activeRect.opacity(0)
  }

  const handleDeleteClick = (rectId: string) => {
    setRectangles(rectangles.filter((rect) => rect.id !== rectId))
    beregnStroemForbruk()
  }

  const beregnStroemForbruk = () => {
    const forbrukPerKolonne = new Array(gridColumns).fill(0)

    rectangles.forEach((rect) => {
      const startKolonne = Math.floor(rect.x / columnWidth)
      const sluttKolonne = Math.ceil((rect.x + rect.width) / columnWidth)

      for (let i = startKolonne; i < sluttKolonne; i++) {
        if (i >= 0 && i < gridColumns) {
          forbrukPerKolonne[i] += rect.wattage
        }
      }
    })

    setStroemForbruk({
      id: 'stroemforbruk',
      data: forbrukPerKolonne.map((y, x) => ({ x, y })),
    })
  }

  useEffect(() => {
    beregnStroemForbruk()
  }, [])

  useEffect(() => {
    beregnStroemForbruk()
  }, [rectangles])
  
  const snapToGrid = (x: number, width: number) => {
    const startColumn = Math.round(x / columnWidth)
    const endColumn = Math.round((x + width) / columnWidth)
    return {
      x: startColumn * columnWidth,
      width: (endColumn - startColumn) * columnWidth,
    }
  }

  const snapRectToPosition = (position: {x: number, y: number}, width: number) => {

    const snapped = snapToGrid(position.x, width)
    let x = snapped.x
    let y = Math.round(position.y / rowHeight) * rowHeight
    return({x,y})
  }

  const handleResize = (e: any) => {

    const resizeEdge = isMouseOverResizeHandle(e, e.target.attrs)
    // console.log('handleResize', e.target, resizeEdge)
    // e.target.draggable(false)
    if (resizeEdge) {
      // console.log('resizeEdge', resizeEdge)
      // e.target.draggable(false)
      // setIsResizing(true)
      // setResizeEdge(resizeEdge)
      // setSelectedRect(e.target)
    //   // console.log('Selected rect:', e.target.attrs.id)
      // const pos = e.target.getStage().getPointerPosition()
      // setStartPos({ x: pos.x, y: e.target.attrs.y })

    //   setPreviewRect({
    //     ...rect,
    //     fill: 'transparent',
    //     stroke: '#b1afa9',
    //     strokeWidth: 2,
    //     dash: [5, 5],
    //   })
      e.cancelBubble = true
    } else {
      e.target.draggable(true)
    }
  }

  const onDragStart = (e: any) => {
    
    const id = e.target.attrs.id
    // console.log('onDragStart', e.target.get)
    // if (resizeEdge) {
    //   e.target.draggable(false)
    // }
    setRectangles(
      rectangles.map((rect) => {
        return {
          ...rect,
          isDragging: rect.id === id,
        };
      })
    );

  }
  const onDragMove = (e: any) => {
    const movingRect = e.target
    const pos = movingRect.position()
    // console.log('onDragMove', pos)
  } 
  const onDragEnd = (e: any) => {
    const movedRect = e.target
    // const pos = {x: movedRect.attrs.x, y: movedRect.attrs.y}

    const snapped = (snapRectToPosition(movedRect.position(), movedRect.width() ))
    

    setRectangles(prevRects => prevRects.map(r => 
      r.id === movedRect.attrs.id ? {...r, x: snapped.x, y: snapped.y, isDragging: false} : r
    ))  
    movedRect.position(snapped)
    console.log('snapped values on end', snapped)
    console.log('snapped values on end movedRect', movedRect.position())
    
    beregnStroemForbruk()
    // console.log('onDragEnd', e.target.attrs)
  } 

  return (
    <Wrapper>
      <Stage
        width={stageWidth}
        height={stageHeight}

        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMoveOnStage}
        onMouseUp={handleMouseUpOnStage}
      >
        <Layer>
          {/* Grid lines */}
          {Array.from({ length: gridColumns + 1 }).map((_, i) => (
            <Line
              key={`v${i}`}
              points={[i * columnWidth, 0, i * columnWidth, stageHeight]}
              stroke='#ddd'
              strokeWidth={0.5}
            />
          ))}
          {Array.from({ length: rows + 1 }).map((_, i) => (
            <Line
              key={`h${i}`}
              points={[0, i * rowHeight, stageWidth, i * rowHeight]}
              stroke='#ddd'
              strokeWidth={0.5}
            />
          ))}
          {/* Rectangles */}
          {rectangles.map((rect) => {
            // const isSelected = selectedRect?.id === rect.id
            // const shouldHide = isSelected && previewRect && isResizing
            // console.log(rect.x, rect.y, rect.width)

            return (
              <Group key={rect.id}>
                <Rect
                  {...rect}
                  // onMouseDown={(e) => handleRectMouseDown(e, rect)}
                  cornerRadius={8}
                  // opacity={shouldHide ? 0 : 1}
                  image={FORBRUKSENHETER[rect.image].image}
                  onDragStart={onDragStart}
                  onDragEnd={onDragEnd}
                  onDragMove={onDragMove}
                  // onMouseOver={handleResize}
                  draggable
                  opacity={rect.isDragging ? 0.5 : 1}
                  fill={rect.isDragging ? 'transparent' : COLORS.clr_mintgreen}
                  stroke={rect.isDragging ? '#b1afa9' : 'none'}
                  strokeWidth={rect.isDragging ? 2 : 0}
                  dash={rect.isDragging ? [5, 5] : []}
                />
                <Group
                  x={rect.x + rect.width - 20}
                  y={rect.y + 5}
                  onClick={() => handleDeleteClick(rect.id)}
                  onTap={() => handleDeleteClick(rect.id)}
                  opacity={rect.isDragging ? 0 : 1}
                >
                  <Text
                    text='×'
                    fill='#007B50'
                    fontSize={14}
                    x={3}
                    y={-1}
                  />
                  <Image
                    image={FORBRUKSENHETER[rect.image].image}
                    x={-(rect.width / 2)}
                    y={-5}
                    listening={false}
                  />
                </Group>
              </Group>
            )
          })}
          {/* Preview rectangle */}
          {(isResizing || isDrawing || previewRect) && (
            <Rect
              {...previewRect}
              cornerRadius={8}
            />
          )}
        </Layer>
      </Stage>
      <ForbruksKonfig
        selectedRect={selectedRect}
        isOpen={isForbruksKonfigOpen}
        setIsOpen={setIsForbruksKonfigOpen}
      />
    </Wrapper>
  )
}

const Wrapper = styled.div`
  position: relative;
  background: ${COLORS.clr_lightorange};
  border-radius: 0 0 40px 40px;
  overflow: hidden;
`

export default KonvaGrid
