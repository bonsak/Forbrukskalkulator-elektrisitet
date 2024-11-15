import { Stage, Layer, Rect, Line, Group, Text, Image } from 'react-konva'
import { useState, useEffect } from 'react'
import styled from 'styled-components'
import useImage from 'use-image'
import { COLORS } from '../utils/constants'

const KonvaGrid = ({ setStroemForbruk }) => {
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

  // };

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
    setRectangles((prevRectangles) =>
      prevRectangles.map((r) =>
        r.id === rect.attrs.id
          ? { ...r, x: snapped.x, y: Math.round(pos.y / rowHeight) * rowHeight }
          : r
      )
    )

    // Sett den faktiske posisjonen på scenen med snap til rad
    rect.position({
      x: snapped.x,
      y: Math.round(pos.y / rowHeight) * rowHeight,
    })
    // Vis rektangelet igjen ved å sette opacity tilbake til 1
    rect.opacity(1)

    // Fjern forhåndsvisningen
    setPreviewRect(null)

    beregnStroemForbruk()
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
        dragDistance <= 30 ? startPos.x : Math.min(startPos.x, endPos.x),
        dragDistance <= 30 ? columnWidth * 2 : dragDistance
      )
      // console.log('image',image.src)

      const newRectangle = {
        x: snapped.x,
        y: startPos.y,
        width: snapped.width,
        height: rowHeight,
        stroke: `${COLORS.clr_lightorange}`,
        strokeWidth: 5,
        strokeScaleEnabled: false,
        // fill: 'var(--clr_mintgreen)',
        fill: COLORS.clr_mintgreen,
        onDragMove: (e) => handleDragMove(e),
        onDragEnd: (e) => handleDragEnd(e),
        onDblclick: (e) => console.log('dblclick', e.target),
        // onDragStart: (e) => console.log('Starte drag:', e.target.id()),
        // id: `rect${rectangles.length + 1}`,
        id: `rect${crypto.randomUUID()}`,
        draggable: true,
        kwt: 100,
        image: Math.floor(Math.random() * images.length),
      }
      // console.log('newRectangle', newRectangle.image)

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

  const handleDragMove = (e) => {
    const rect = e.target
    const pos = rect.position()
    const snapped = snapToGrid(pos.x, rect.width())

    // Oppdater forhåndsvisningen mens vi drar
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
    // Skjul det faktiske rektangelet ved å sette opacity til 0
    rect.opacity(0)
  }

  const handleDeleteClick = (rectId) => {
    setRectangles(rectangles.filter((rect) => rect.id !== rectId))
    beregnStroemForbruk()
  }

  // Tegn grid-linjer
  const gridLines = []
  // Vertikale linjer
  const gridLinesColor = '#ddd'
  for (let i = 0; i <= gridColumns; i++) {
    gridLines.push(
      <Line
        key={`v${i}`}
        points={[i * columnWidth, 0, i * columnWidth, stageHeight]}
        stroke={gridLinesColor}
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
        stroke={gridLinesColor}
        strokeWidth={0.5}
      />
    )
  }

  // Legg til denne funksjonen for å beregne strømforbruk per kolonne
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

    // Konverter til nytt format
    setStroemForbruk({
      id: 'stroemforbruk',
      data: forbrukPerKolonne.map((y, x) => ({ x, y })),
    })
  }

  // La oss også legge til en useEffect for å se initialverdiene
  useEffect(() => {
    // console.log('Initial rectangles:', rectangles)
    beregnStroemForbruk()
  }, []) // Kjører én gang ved oppstart

  // Legg til denne useEffect for å lytte på endringer i rectangles
  useEffect(() => {
    beregnStroemForbruk()
  }, [rectangles]) // Kjører hver gang rectangles endres

  // useEffect(() => {
  //   // Initialiser strømforbruk med nuller i nytt format
  //   const initialData = {
  //     id: 'stroemforbruk',
  //     data: Array(gridColumns)
  //       .fill(0)
  //       .map((verdi, index) => ({
  //         x: index,
  //         y: verdi,
  //       })),
  //   }
  //   setStroemForbruk(initialData)
  // }, [])
  // Kjør kun én gang ved oppstart

  // Oppdater useEffect for å laste fra localStorage
  // useEffect(() => {
  //   const savedRectangles = localStorage.getItem('rectangles')
  //   if (savedRectangles) {
  //     setRectangles(JSON.parse(savedRectangles))
  //   }
  // }, [])

  // // Legg til useEffect for å lagre til localStorage
  // useEffect(() => {
  //   localStorage.setItem('rectangles', JSON.stringify(rectangles))
  //   beregnStroemForbruk()
  // }, [rectangles])

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
                cornerRadius={8}
                opacity={selectedRect?.id === rect.id ? 0 : 1}
              />
              <Group
                x={rect.x + rect.width - 20}
                y={rect.y + 5}
                onClick={() => handleDeleteClick(rect.id)}
                onTap={() => handleDeleteClick(rect.id)}
                opacity={previewRect ? 0 : 1}
              >
                <Text
                  text='×'
                  fill='#007B50'
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
          ))}
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
  /* box-shadow: rgba(0, 0, 0, 0.1) 4px 4px 6px 0px; */
  /* margin-top: 1rem; */
  overflow: hidden;
`

export default KonvaGrid
