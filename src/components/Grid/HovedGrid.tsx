import { Stage, Layer, Rect, Line, Group, Text, Image } from 'react-konva'
import { useState, useEffect, useRef } from 'react'
import styled from 'styled-components'
import { COLORS } from '@utils/constants'
import { DEFAULT_DAG } from '@utils/DefaultDag'
import ForbruksKonfig from '@components/Dialoger/ForbruksRedigering'
import { KonvaGridProps, Rectangle, PreviewRectangle } from '@/types/types'
import { useForbruksEnheter } from '@utils/Forbruksenheter'
import { KonvaEventObject } from 'konva/lib/Node'
import { useStrom } from '@context/StroemContext'

const HovedGrid = () => {
  const FORBRUKSENHETER = useForbruksEnheter()
  const { setStroemForbruk, setTotaltForbruk } = useStrom()

  const [brukerEnheter, setBrukerEnheter] = useState<Rectangle[]>([])
  const [isDrawing, setIsDrawing] = useState(false)
  const [isResizing, setIsResizing] = useState(false)
  const [resizeEdge, setResizeEdge] = useState<'left' | 'right' | null>(null)
  const [startPos, setStartPos] = useState({ x: 0, y: 0 })
  const [previewRect, setPreviewRect] = useState<PreviewRectangle | null>(null)
  const [selectedRect, setSelectedRect] = useState<Rectangle | null>(null)
  const [isForbruksKonfigOpen, setIsForbruksKonfigOpen] = useState(false)
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [newRect, setNewRect] = useState<Rectangle | null>(null)

  const stageRef = useRef<any>(null)
  // Konstanter
  const stageWidth = 885
  const stageHeight = 360
  const RESIZE_HANDLE_WIDTH = 10
  const gridColumns = 24
  const columnWidth = stageWidth / gridColumns
  const rowHeight = 40
  const rows = Math.floor(stageHeight / rowHeight)

  // console.log(brukerEnheter, DEFAULT_DAG)
  useEffect(() => {
    setBrukerEnheter(DEFAULT_DAG)
  }, [])

  useEffect(() => {
    regnUtTotalForbruk(brukerEnheter)
  }, [brukerEnheter, isResizing, previewRect])

  const regnUtTotalForbruk = (brukerEnheter) => {
    const totalWattage = brukerEnheter.reduce(
      (sum, enhet) => sum + enhet.wattage,
      0
    )
    setTotaltForbruk(totalWattage)
  }

  const oppdaterBrukerEnheter = (
    selectedRect: Rectangle,
    snapped: { x: number; width: number },
    prevRects: Rectangle[]
  ) => {
    setBrukerEnheter((prevRects) =>
      prevRects.map((r) =>
        r.id === selectedRect.id
          ? { ...r, x: snapped.x, width: snapped.width, isDragging: true }
          : r
      )
    )
  }

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
  const handleRectMouseDown = (e: any, rect: Rectangle) => {
    const resizeEdge = isMouseOverResizeHandle(e, rect)

    if (resizeEdge) {
      e.target.draggable(false)
      setIsResizing(true)
      setResizeEdge(resizeEdge)
      setSelectedRect(rect)
      const pos = e.target.getStage().getPointerPosition()
      setStartPos({ x: pos.x, y: rect.y })

      setBrukerEnheter((prevRects) =>
        prevRects.map((r) =>
          r.id === rect.id ? { ...r, isDragging: true } : r
        )
      )

      e.cancelBubble = true
    } else {
      e.target.draggable(true)
    }
  }

  const handleMouseMoveOnStage = (e: any) => {
    const stage = e.target.getStage()
    const pos = stage.getPointerPosition()
    const rect = selectedRect ? selectedRect : null
    const id = rect?.id
    // console.log('handleMouseMoveOnStage', rect)

    if (isDrawing) {
      // setIsForbruksKonfigOpen(true)
      // setIsForbruksKonfigOpen(true)
      // const handleClose = () => {
      //   setIsForbruksKonfigOpen(false)
      // }

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
    } else if (isResizing && selectedRect) {
      setIsResizing(true)
      // e.target.attrs.isDragging = true

      let newWidth: number, newX: number

      if (resizeEdge === 'right') {
        setIsResizing(true)
        newWidth = Math.max(columnWidth, pos.x - selectedRect.x)
        const snapped = snapToGrid(selectedRect.x, newWidth)

        oppdaterBrukerEnheter(selectedRect, snapped, brukerEnheter)

        selectedRect.x = snapped.x
        selectedRect.width = snapped.width
      } else if (resizeEdge === 'left') {
        setIsResizing(true)
        newWidth = Math.max(
          columnWidth,
          selectedRect.x + selectedRect.width - pos.x
        )
        newX = Math.min(
          pos.x,
          selectedRect.x + selectedRect.width - columnWidth
        )
        const snapped = snapToGrid(newX, newWidth)

        oppdaterBrukerEnheter(selectedRect, snapped, brukerEnheter)

        selectedRect.x = snapped.x
        selectedRect.width = snapped.width
      }
    } else {
      const hoveredRect = brukerEnheter.find((rect) => {
        const resizeEdge = isMouseOverResizeHandle(
          { target: { getStage: () => stage } },
          rect
        )
        return resizeEdge !== null
      })

      document.body.style.cursor = hoveredRect ? 'ew-resize' : 'default'
    }
  }

  // Lager lite default rect når bruker løfter musen
  const handleMouseUpOnStage = (e: any) => {
    if (isDrawing) {
      const stage = e.target.getStage()
      const endPos = stage.getPointerPosition()
      const dragDistance = Math.abs(endPos.x - startPos.x)

      const snapped = snapToGrid(
        dragDistance <= 30 ? startPos.x : Math.min(startPos.x, endPos.x),
        dragDistance <= 30 ? columnWidth * 2 : dragDistance
      )

      const rndNumber: number = Math.floor(
        Math.random() * FORBRUKSENHETER.length
      )
      const defaultEnhet = FORBRUKSENHETER[rndNumber]

      const newRectangle: Rectangle = {
        x: snapped.x,
        y: startPos.y,
        width: snapped.width,
        height: rowHeight,
        stroke: COLORS.clr_lightorange,
        strokeWidth: 5,
        strokeScaleEnabled: false,
        fill: COLORS.clr_mintgreen,
        id: Math.random().toString(36).substring(7),
        draggable: false,
        isDragging: false,
        wattage: defaultEnhet.wattage,
        minWatt: defaultEnhet.minWatt,
        maxWatt: defaultEnhet.maxWatt,
        name: defaultEnhet.name,
        description: defaultEnhet.description,
        image: defaultEnhet.image,
      }

      setBrukerEnheter([...brukerEnheter, newRectangle])
      setNewRect(newRectangle)
      updateSelectedRect(newRectangle)
      setDrawerOpen(true)
      setIsForbruksKonfigOpen(true)
      // regnUtTotalForbruk(brukerEnheter)
      beregnStroemForbruk()
    } else if (isResizing && selectedRect) {
      // Oppdater rektangelet med de endelige dimensjonene
      const updatedRect = {
        ...selectedRect,
        isDragging: false,
      }

      updateSelectedRect(updatedRect)
      setBrukerEnheter((prevRects) =>
        prevRects.map((rect) =>
          rect.id === selectedRect.id ? { ...rect, isDragging: false } : rect
        )
      )
      beregnStroemForbruk()
    }

    setIsDrawing(false)
    setIsResizing(false)
    setResizeEdge(null)
    setPreviewRect(null)
  }

  const handleDeleteClick = (rectId: string) => {
    setBrukerEnheter(brukerEnheter.filter((rect) => rect.id !== rectId))
    beregnStroemForbruk()
  }

  const beregnStroemForbruk = () => {
    const forbrukPerKolonne = new Array(gridColumns + 1).fill(0)

    brukerEnheter.forEach((rect) => {
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
  }, [brukerEnheter])

  const snapToGrid = (x: number, width: number) => {
    const startColumn = Math.round(x / columnWidth)
    const endColumn = Math.round((x + width) / columnWidth)
    return {
      x: startColumn * columnWidth,
      width: (endColumn - startColumn) * columnWidth,
    }
  }
  const snapRectToPosition = (
    position: { x: number; y: number },
    width: number
  ) => {
    const snapped = snapToGrid(position.x, width)
    let x = snapped.x
    let y = Math.round(position.y / rowHeight) * rowHeight
    return { x, y }
  }
  const onDragStart = (e: any) => {
    const id = e.target.attrs.id

    setBrukerEnheter(
      brukerEnheter.map((rect) => {
        return {
          ...rect,
          isDragging: rect.id === id,
        }
      })
    )
  }
  const onDragMove = (e: any) => {
    const movingRect = e.target
    const snapped = snapRectToPosition(
      movingRect.position(),
      movingRect.width()
    )
    setBrukerEnheter((prevRects) =>
      prevRects.map((r) =>
        r.id === movingRect.attrs.id
          ? { ...r, x: snapped.x, y: snapped.y, isDragging: true }
          : r
      )
    )
    const pos = movingRect.position()
  }
  const onDragEnd = (e: any) => {
    const movedRect = e.target
    const snapped = snapRectToPosition(movedRect.position(), movedRect.width())

    setBrukerEnheter((prevRects) =>
      prevRects.map((r) =>
        r.id === movedRect.attrs.id
          ? { ...r, x: snapped.x, y: snapped.y, isDragging: false }
          : r
      )
    )
    movedRect.position(snapped)

    // setIsDragging(false)
    beregnStroemForbruk()
  }
  const handleRectDblclick = (
    e: KonvaEventObject<MouseEvent>,
    rect: Rectangle
  ) => {
    updateSelectedRect(rect)
    setIsForbruksKonfigOpen(true)
  }

  const updateWattage = (wattage: number) => {
    if (!selectedRect) return

    const updatedRect = {
      ...selectedRect,
      wattage: wattage,
    }

    updateSelectedRect(updatedRect)
    beregnStroemForbruk()
  }

  // Deaktiverer stage når dialog er åpen
  useEffect(() => {
    if (stageRef.current) {
      const stage = stageRef.current.getStage()
      stage.listening(!isForbruksKonfigOpen)
      // stage.opacity(isForbruksKonfigOpen ? 0.25 : 1)
      stage.batchDraw()
      // console.log(isForbruksKonfigOpen, stage.listening())
    }
  }, [isForbruksKonfigOpen])

  const updateSelectedRect = (updatedRect: Rectangle) => {
    setSelectedRect(updatedRect)
    setBrukerEnheter((prevRects) =>
      prevRects.map((rect) => (rect.id === updatedRect.id ? updatedRect : rect))
    )
  }

  return (
    <Wrapper>
      <Stage
        ref={stageRef}
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

          {brukerEnheter.map((rect) => {
            return (
              <Group key={rect.id}>
                <Rect
                  {...rect}
                  cornerRadius={8}
                  image={rect.image}
                  onDragStart={onDragStart}
                  onDragEnd={onDragEnd}
                  onDragMove={onDragMove}
                  onMouseDown={(e: KonvaEventObject<MouseEvent>) =>
                    handleRectMouseDown(e, rect)
                  }
                  onDblclick={(e: KonvaEventObject<MouseEvent>) =>
                    handleRectDblclick(e, rect)
                  }
                  draggable
                  opacity={rect.isDragging ? 0.5 : 1}
                  fill={rect.isDragging ? 'transparent' : COLORS.clr_mintgreen}
                  stroke={rect.isDragging ? '#92908b' : COLORS.clr_lightorange}
                  strokeWidth={rect.isDragging ? 2 : 5}
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
                    image={rect.image}
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
        setSelectedRect={updateSelectedRect}
        isOpen={isForbruksKonfigOpen}
        setIsOpen={setIsForbruksKonfigOpen}
        updateWattage={updateWattage}
        drawerOpen={drawerOpen}
        setDrawerOpen={setDrawerOpen}
        newRect={newRect}
      />
    </Wrapper>
  )
}

const Wrapper = styled.div`
  grid-area: grid;
  position: relative;
  background: ${COLORS.clr_lightorange};
  border-radius: 0 0 40px 0;
  max-height: 360px;
  /* overflow: hidden; */
`

export default HovedGrid
