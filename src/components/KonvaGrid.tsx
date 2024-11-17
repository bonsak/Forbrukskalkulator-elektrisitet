import { Stage, Layer, Rect, Line, Group, Text, Image } from 'react-konva'
import { useState, useEffect } from 'react'
import styled from 'styled-components'
import useImage from 'use-image'
import { COLORS } from '../utils/constants'

interface KonvaGridProps {
  setStroemForbruk: (data: StroemForbrukData) => void
}

interface StroemForbrukData {
  id: string
  data: Array<{x: number, y: number}>
}

interface Rectangle {
  x: number
  y: number
  width: number
  height: number
  stroke: string
  strokeWidth: number
  strokeScaleEnabled: boolean
  fill: string
  onDragMove: (e: any) => void
  onDragEnd: (e: any) => void
  onDblclick: (e: any) => void
  id: string
  draggable: boolean
  kwt: number
  image: number
}

interface PreviewRectangle {
  x: number
  y: number
  width: number
  height: number
  fill: string
  stroke: string
  strokeWidth: number
  dash: number[]
}

const KonvaGrid = ({ setStroemForbruk }: KonvaGridProps) => {
  const [dusj] = useImage('/icons/dusj.png')
  const [elbil] = useImage('/icons/elbil.png')
  const [forbruk] = useImage('/icons/forbruk.png')
  const [kaffetrakter] = useImage('/icons/kaffetrakter.png')
  const [oppvarming] = useImage('/icons/oppvarming.png')
  const [oppvaskmaskin] = useImage('/icons/oppvaskmaskin.png')
  const [stekeovnplate] = useImage('/icons/stekeovn-plate.png')
  const [vaskemaskin] = useImage('/icons/vaskemaskin.png')

  const images = [
    dusj,
    elbil,
    forbruk,
    kaffetrakter,
    oppvarming,
    oppvaskmaskin,
    stekeovnplate,
    vaskemaskin,
  ]

  const [rectangles, setRectangles] = useState<Rectangle[]>([])
  const [isDrawing, setIsDrawing] = useState(false)
  const [isResizing, setIsResizing] = useState(false)
  const [resizeEdge, setResizeEdge] = useState<'left' | 'right' | null>(null)
  const [startPos, setStartPos] = useState({ x: 0, y: 0 })
  const [previewRect, setPreviewRect] = useState<PreviewRectangle | null>(null)
  const [selectedRect, setSelectedRect] = useState<Rectangle | null>(null)

  // Konstanter
  const stageWidth = 885
  const stageHeight = 300
  const RESIZE_HANDLE_WIDTH = 10
  const gridColumns = 24
  const columnWidth = stageWidth / gridColumns
  const rowHeight = 40
  const rows = Math.floor(stageHeight / rowHeight)

  // Snap til grid
  // Bruk senere
  const snapToGrid = (x: number, width: number) => {
    const startColumn = Math.round(x / columnWidth)
    const endColumn = Math.round((x + width) / columnWidth)
    return {
      x: startColumn * columnWidth,
      width: (endColumn - startColumn) * columnWidth,
    }
  }

  // Sjekk om musen er over resize håndtak
  // Kan dette gjøre ved onMouseOver onMouseOut?
  // Bruk senere
  const isMouseOverResizeHandle = (e: any, rect: Rectangle): 'left' | 'right' | null => {
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
      console.log('Selected rect:', rect.id)
      const pos = e.target.getStage().getPointerPosition()
      setStartPos({ x: pos.x, y: rect.y })

      setPreviewRect({
        ...rect,
        fill: 'transparent',
        stroke: '#b1afa9',
        strokeWidth: 2,
        dash: [5, 5],
      })
      e.cancelBubble = true
    } else {
      e.target.draggable(true)
    }
  }

  const handleDragEnd = (e: any) => {
    const rect = e.target
    const pos = rect.position()
    const snapped = snapToGrid(pos.x, rect.width())

    setRectangles((prevRectangles) =>
      prevRectangles.map((r) =>
        r.id === rect.attrs.id
          ? { ...r, x: snapped.x, y: Math.round(pos.y / rowHeight) * rowHeight }
          : r
      )
    )

    rect.position({
      x: snapped.x,
      y: Math.round(pos.y / rowHeight) * rowHeight,
    })
    rect.opacity(1)
    setPreviewRect(null)
    beregnStroemForbruk()
  }

  // Dette er nok ikke helt bra. 
  const handleMouseMove = (e: any) => {
    const stage = e.target.getStage()
    const pos = stage.getPointerPosition()

    if (isDrawing) {
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
      let newWidth: number, newX: number

      if (resizeEdge === 'right') {
        newWidth = Math.max(columnWidth, pos.x - selectedRect.x)
        const snapped = snapToGrid(selectedRect.x, newWidth)
        setPreviewRect({
          ...selectedRect,
          width: snapped.width,
          fill: 'transparent',
          stroke: '#b1afa9',
          strokeWidth: 2,
          dash: [5, 5],
        })
      } else if (resizeEdge === 'left') {
        newWidth = Math.max(columnWidth, selectedRect.x + selectedRect.width - pos.x)
        newX = Math.min(pos.x, selectedRect.x + selectedRect.width - columnWidth)
        const snapped = snapToGrid(newX, newWidth)
        setPreviewRect({
          ...selectedRect,
          x: snapped.x,
          width: snapped.width,
          fill: 'transparent',
          stroke: '#b1afa9',
          strokeWidth: 2,
          dash: [5, 5],
        })
      }
    } else {
      const hoveredRect = rectangles.find((rect) => {
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
  const handleMouseUp = (e: any) => {
    if (isDrawing) {
      const stage = e.target.getStage()
      const endPos = stage.getPointerPosition()
      const dragDistance = Math.abs(endPos.x - startPos.x)

      const snapped = snapToGrid(
        dragDistance <= 30 ? startPos.x : Math.min(startPos.x, endPos.x),
        dragDistance <= 30 ? columnWidth * 2 : dragDistance
      )

      const newRectangle: Rectangle = {
        x: snapped.x,
        y: startPos.y,
        width: snapped.width,
        height: rowHeight,
        stroke: COLORS.clr_lightorange,
        strokeWidth: 5,
        strokeScaleEnabled: false,
        fill: COLORS.clr_mintgreen,
        onDragMove: handleDragMove,
        onDragEnd: handleDragEnd,
        onDblclick: (e) => console.log('dblclick', e.target),
        id: `rect${crypto.randomUUID()}`,
        draggable: true,
        kwt: 100,
        image: Math.floor(Math.random() * images.length),
      }

      setRectangles([...rectangles, newRectangle])
      beregnStroemForbruk()
    } else if (isResizing && selectedRect && previewRect) {
      setRectangles(
        rectangles.map((rect) =>
          rect.id === selectedRect.id
            ? {
                ...rect,
                x: previewRect.x,
                width: previewRect.width,
              }
            : rect
        )
      )
      beregnStroemForbruk()
    }

    setIsDrawing(false)
    setIsResizing(false)
    setSelectedRect(null)
    setPreviewRect(null)
  }

  // Fyrer n
  const handleDragMove = (e: any) => {
    console.log('handleDragMove')
    const rect = e.target
    const pos = rect.position()
    const snapped = snapToGrid(pos.x, rect.width())

    setPreviewRect({
      x: snapped.x,
      y: Math.round(pos.y / rowHeight) * rowHeight,
      width: rect.width(),
      height: rowHeight,
      fill: 'transparent',
      stroke: '#b1afa9',
      strokeWidth: 2,
      dash: [5, 5],
    })
    rect.opacity(0)
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
          forbrukPerKolonne[i] += rect.kwt
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

  return (
    <Wrapper>
      <Stage
        width={stageWidth}
        height={stageHeight}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
      >
        <Layer>
          {/* Grid lines */}
          {Array.from({ length: gridColumns + 1 }).map((_, i) => (
            <Line
              key={`v${i}`}
              points={[i * columnWidth, 0, i * columnWidth, stageHeight]}
              stroke="#ddd"
              strokeWidth={0.5}
            />
          ))}
          {Array.from({ length: rows + 1 }).map((_, i) => (
            <Line
              key={`h${i}`}
              points={[0, i * rowHeight, stageWidth, i * rowHeight]}
              stroke="#ddd"
              strokeWidth={0.5}
            />
          ))}
          {/* Rectangles */}
          {rectangles.map((rect) => {
            const isSelected = selectedRect?.id === rect.id
            const shouldHide = isSelected && isResizing && previewRect
            
            return (
              <Group key={rect.id}>
                <Rect
                  {...rect}
                  onMouseDown={(e) => handleRectMouseDown(e, rect)}
                  cornerRadius={8}
                  opacity={shouldHide ? 0 : 1}
                />
                <Group
                  x={rect.x + rect.width - 20}
                  y={rect.y + 5}
                  onClick={() => handleDeleteClick(rect.id)}
                  onTap={() => handleDeleteClick(rect.id)}
                  opacity={shouldHide ? 0 : 1}
                >
                  <Text
                    text="×"
                    fill="#007B50"
                    fontSize={14}
                    x={3}
                    y={-1}
                  />
                  <Image
                    image={images[rect.image]}
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
    </Wrapper>
  )
}

const Wrapper = styled.div`
  background: ${COLORS.clr_lightorange};
  border-radius: 0 0 40px 40px;
  overflow: hidden;
`

export default KonvaGrid