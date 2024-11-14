import { Stage, Layer, Rect, Line, Group, Text } from 'react-konva'
import { useState } from 'react'
import styled from 'styled-components'

const KonvaGrid = () => {
  const [rectangles, setRectangles] = useState([])
  const [isDrawing, setIsDrawing] = useState(false)
  const [isResizing, setIsResizing] = useState(false)
  const [resizeEdge, setResizeEdge] = useState(null) // 'left' eller 'right'
  const [startPos, setStartPos] = useState({ x: 0, y: 0 })
  const [previewRect, setPreviewRect] = useState(null)
  const [selectedRect, setSelectedRect] = useState(null)
  const stageWidth = 885
  const stageHeight = 300
  const RESIZE_HANDLE_WIDTH = 10

  // Grid konfigurasjon
  const gridColumns = 24
  const columnWidth = stageWidth / gridColumns
  const rowHeight = 40
  const rows = Math.floor(stageHeight / rowHeight)

  // Snap til grid
  const snapToGrid = (x, width) => {
    const startColumn = Math.round(x / columnWidth)
    const endColumn = Math.round((x + width) / columnWidth)
    return {
      x: startColumn * columnWidth,
      width: (endColumn - startColumn) * columnWidth,
    }
  }

  const isMouseOverResizeHandle = (e, rect) => {
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

  const handleMouseDown = (e) => {
    if (e.target === e.target.getStage()) {
      setIsDrawing(true)
      const pos = e.target.getStage().getPointerPosition()
      const snapped = snapToGrid(pos.x, 0)
      setStartPos({
        x: snapped.x,
        y: Math.round(pos.y / rowHeight) * rowHeight,
      })

      setPreviewRect({
        x: snapped.x,
        y: Math.round((pos.y - rowHeight / 2) / rowHeight) * rowHeight,
        width: 0,
        height: rowHeight,
        fill: 'transparent',
        stroke: '#b1afa9',
        strokeWidth: 2,
        dash: [5, 5],
      })
    }
  }

  const handleRectMouseDown = (e, rect) => {
    const resizeEdge = isMouseOverResizeHandle(e, rect)
    if (resizeEdge) {
      e.target.draggable(false)
      setIsResizing(true)
      setResizeEdge(resizeEdge)
      setSelectedRect(rect)
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

  const handleDragEnd = (e) => {
    const rect = e.target
    const pos = rect.position()
    const snapped = snapToGrid(pos.x, rect.width())

    // Oppdater posisjonen med snapped verdier
    setRectangles(
      rectangles.map((r) =>
        r.id === rect.attrs.id ? { ...r, x: snapped.x } : r
      )
    )

    // Sett den faktiske posisjonen på scenen
    rect.position({ x: snapped.x, y: pos.y })
  }

  const handleMouseMove = (e) => {
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
      let newWidth, newX

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
        newWidth = Math.max(
          columnWidth,
          selectedRect.x + selectedRect.width - pos.x
        )
        newX = Math.min(
          pos.x,
          selectedRect.x + selectedRect.width - columnWidth
        )
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
      // Håndter cursor stil
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

  const handleMouseUp = (e) => {
    if (isDrawing) {
      const stage = e.target.getStage()
      const endPos = stage.getPointerPosition()
      const dragDistance = Math.abs(endPos.x - startPos.x)

      const snapped = snapToGrid(
        dragDistance <= 2 ? startPos.x : Math.min(startPos.x, endPos.x),
        dragDistance <= 2 ? columnWidth * 2 : dragDistance
      )

      const newRectangle = {
        x: snapped.x,
        y: startPos.y,
        width: snapped.width,
        height: rowHeight,
        fill: '#b1afa9',
        // id: `rect${rectangles.length + 1}`,
        id: `rect${crypto.randomUUID()}`,
        draggable: true,
        kwt: 100,
      }

      setRectangles([...rectangles, newRectangle])
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
    }

    setIsDrawing(false)
    setIsResizing(false)
    setSelectedRect(null)
    setPreviewRect(null)
  }

  const handleDragMove = (e) => {
    const rect = e.target
    const pos = rect.position()
    const snapped = snapToGrid(pos.x, rect.width())

    // Oppdater posisjonen mens vi drar
    rect.position({
      x: snapped.x,
      y: Math.round(pos.y / rowHeight) * rowHeight,
    })
  }

  const handleDeleteClick = (rectId) => {
    setRectangles(rectangles.filter((rect) => rect.id !== rectId))
  }

  // Tegn grid-linjer
  const gridLines = []
  // Vertikale linjer
  for (let i = 0; i <= gridColumns; i++) {
    gridLines.push(
      <Line
        key={`v${i}`}
        points={[i * columnWidth, 0, i * columnWidth, stageHeight]}
        stroke='#ddd'
        strokeWidth={0.5}
      />
    )
  }
  // Horisontale linjer
  for (let i = 0; i <= rows; i++) {
    gridLines.push(
      <Line
        key={`h${i}`}
        points={[0, i * rowHeight, stageWidth, i * rowHeight]}
        stroke='#ddd'
        strokeWidth={0.5}
      />
    )
  }

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
          {gridLines}
          {rectangles.map((rect) => (
            <Group key={rect.id}>
              <Rect
                {...rect}
                onMouseDown={(e) => handleRectMouseDown(e, rect)}
                onDragMove={handleDragMove}
                onDragEnd={handleDragEnd}
                cornerRadius={8}
                opacity={selectedRect?.id === rect.id ? 0 : 1}
              />
              <Group
                x={rect.x + rect.width - 20}
                y={rect.y + 5}
                onClick={() => handleDeleteClick(rect.id)}
                onTap={() => handleDeleteClick(rect.id)}
              >
                <Rect
                  width={15}
                  height={15}
                  fill='#b1afa9'
                  cornerRadius={3}
                />
                <Text
                  text='×'
                  fill='#fff'
                  fontSize={14}
                  x={3}
                  y={-1}
                />
              </Group>
            </Group>
          ))}
          {(isResizing || isDrawing) && previewRect && (
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
  background: #ebe7e0;
  border-radius: 8px;
  box-shadow: rgba(0, 0, 0, 0.1) 4px 4px 6px 0px;
  margin-top: 1rem;
  overflow: hidden;
`

export default KonvaGrid
