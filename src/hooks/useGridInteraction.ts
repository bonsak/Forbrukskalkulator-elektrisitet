import { useState, useEffect, useRef } from 'react'
import { KonvaEventObject } from 'konva/lib/Node'
import { Rectangle, PreviewRectangle } from '@/types/types'
import { useStroemForbrukStore } from '@/stores/stroemForbrukStore'
import { useForbruksEnheter } from '@/utils/Forbruksenheter'
import { DEFAULT_DAG } from '@/utils/DefaultDag'
import { COLORS } from '@/utils/constants'
import {
  snapToGrid,
  snapRectToPosition,
  beregnStroemForbruk,
  totalForbruk,
  isMouseOverResizeHandle,
  COLUMN_WIDTH,
  ROW_HEIGHT,
} from '@/utils/gridEngine'

export const useGridInteraction = () => {
  const FORBRUKSENHETER = useForbruksEnheter()

  const brukerEnheter = useStroemForbrukStore((state) => state.brukerEnheter)
  const setBrukerEnheter = useStroemForbrukStore((state) => state.setBrukerEnheter)
  const setStroemForbruk = useStroemForbrukStore((state) => state.setStroemForbruk)
  const setTotaltForbruk = useStroemForbrukStore((state) => state.setTotaltForbruk)

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

  useEffect(() => {
    setBrukerEnheter(DEFAULT_DAG)
  }, [])

  useEffect(() => {
    setStroemForbruk(beregnStroemForbruk(brukerEnheter))
    setTotaltForbruk(totalForbruk(brukerEnheter))
  }, [brukerEnheter])

  useEffect(() => {
    if (stageRef.current) {
      const stage = stageRef.current.getStage()
      stage.listening(!isForbruksKonfigOpen)
      stage.batchDraw()
    }
  }, [isForbruksKonfigOpen])

  const oppdaterBrukerEnheter = (
    rect: Rectangle,
    snapped: { x: number; width: number }
  ) => {
    setBrukerEnheter((prevRects) =>
      prevRects.map((r) =>
        r.id === rect.id ? { ...r, x: snapped.x, width: snapped.width, isDragging: true } : r
      )
    )
  }

  const handleMouseDown = (e: any) => {
    if (e.target === e.target.getStage()) {
      setIsDrawing(true)
      const pos = e.target.getStage().getPointerPosition()
      const snapped = snapToGrid(pos.x, 0)
      const yPos = Math.floor(pos.y / ROW_HEIGHT) * ROW_HEIGHT

      setStartPos({ x: snapped.x, y: yPos })
      setPreviewRect({
        x: snapped.x,
        y: yPos,
        width: 0,
        height: ROW_HEIGHT,
        fill: 'transparent',
        stroke: '#b1afa9',
        strokeWidth: 2,
        dash: [5, 5],
      })
    }
  }

  const handleRectMouseDown = (e: any, rect: Rectangle) => {
    const stage = e.target.getStage()
    const mouseX = stage.getPointerPosition().x
    const edge = isMouseOverResizeHandle(mouseX, rect)

    if (edge) {
      e.target.draggable(false)
      setIsResizing(true)
      setResizeEdge(edge)
      setSelectedRect(rect)
      setStartPos({ x: mouseX, y: rect.y })

      setBrukerEnheter((prevRects) =>
        prevRects.map((r) => (r.id === rect.id ? { ...r, isDragging: true } : r))
      )

      e.cancelBubble = true
    } else {
      e.target.draggable(true)
    }
  }

  const handleMouseMoveOnStage = (e: any) => {
    const stage = e.target.getStage()
    const pos = stage.getPointerPosition()

    if (isDrawing) {
      const width = Math.abs(pos.x - startPos.x)
      const snapped = snapToGrid(Math.min(startPos.x, pos.x), width)
      setPreviewRect({
        x: snapped.x,
        y: startPos.y,
        width: snapped.width,
        height: ROW_HEIGHT,
        fill: 'transparent',
        stroke: '#b1afa9',
        strokeWidth: 2,
        dash: [5, 5],
      })
    } else if (isResizing && selectedRect) {
      if (resizeEdge === 'right') {
        const newWidth = Math.max(COLUMN_WIDTH, pos.x - selectedRect.x)
        const snapped = snapToGrid(selectedRect.x, newWidth)
        oppdaterBrukerEnheter(selectedRect, snapped)
        selectedRect.x = snapped.x
        selectedRect.width = snapped.width
      } else if (resizeEdge === 'left') {
        const newWidth = Math.max(COLUMN_WIDTH, selectedRect.x + selectedRect.width - pos.x)
        const newX = Math.min(pos.x, selectedRect.x + selectedRect.width - COLUMN_WIDTH)
        const snapped = snapToGrid(newX, newWidth)
        oppdaterBrukerEnheter(selectedRect, snapped)
        selectedRect.x = snapped.x
        selectedRect.width = snapped.width
      }
    } else {
      const hoveredRect = brukerEnheter.find(
        (rect) => isMouseOverResizeHandle(pos.x, rect) !== null
      )
      document.body.style.cursor = hoveredRect ? 'ew-resize' : 'default'
    }
  }

  const handleMouseUpOnStage = (e: any) => {
    if (isDrawing) {
      const stage = e.target.getStage()
      const endPos = stage.getPointerPosition()
      const dragDistance = Math.abs(endPos.x - startPos.x)

      const snapped = snapToGrid(
        dragDistance <= 30 ? startPos.x : Math.min(startPos.x, endPos.x),
        dragDistance <= 30 ? COLUMN_WIDTH * 2 : dragDistance
      )

      const rndNumber = Math.floor(Math.random() * FORBRUKSENHETER.length)
      const defaultEnhet = FORBRUKSENHETER[rndNumber]

      const newRectangle: Rectangle = {
        x: snapped.x,
        y: startPos.y,
        width: snapped.width,
        height: ROW_HEIGHT,
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
    } else if (isResizing && selectedRect) {
      const updatedRect = { ...selectedRect, isDragging: false }
      updateSelectedRect(updatedRect)
      setBrukerEnheter((prevRects) =>
        prevRects.map((r) => (r.id === selectedRect.id ? { ...r, isDragging: false } : r))
      )
    }

    setIsDrawing(false)
    setIsResizing(false)
    setResizeEdge(null)
    setPreviewRect(null)
  }

  const handleDeleteClick = (rectId: string) => {
    setBrukerEnheter(brukerEnheter.filter((rect) => rect.id !== rectId))
  }

  const onDragStart = (e: any) => {
    const id = e.target.attrs.id
    setBrukerEnheter(
      brukerEnheter.map((rect) => ({ ...rect, isDragging: rect.id === id }))
    )
  }

  const onDragMove = (e: any) => {
    const movingRect = e.target
    const snapped = snapRectToPosition(movingRect.position(), movingRect.width())
    movingRect.position({ x: snapped.x, y: snapped.y })
    setBrukerEnheter((prevRects) =>
      prevRects.map((r) =>
        r.id === movingRect.attrs.id
          ? { ...r, x: snapped.x, y: snapped.y, isDragging: true }
          : r
      )
    )
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
  }

  const handleRectDblclick = (e: KonvaEventObject<MouseEvent>, rect: Rectangle) => {
    updateSelectedRect(rect)
    setIsForbruksKonfigOpen(true)
  }

  const updateWattage = (wattage: number) => {
    if (!selectedRect) return
    updateSelectedRect({ ...selectedRect, wattage })
  }

  const updateSelectedRect = (updatedRect: Rectangle) => {
    setSelectedRect(updatedRect)
    setBrukerEnheter((prevRects) =>
      prevRects.map((rect) => (rect.id === updatedRect.id ? updatedRect : rect))
    )
  }

  return {
    brukerEnheter,
    isDrawing,
    isResizing,
    previewRect,
    selectedRect,
    isForbruksKonfigOpen,
    drawerOpen,
    newRect,
    stageRef,
    handleMouseDown,
    handleMouseMoveOnStage,
    handleMouseUpOnStage,
    handleRectMouseDown,
    onDragStart,
    onDragMove,
    onDragEnd,
    handleRectDblclick,
    handleDeleteClick,
    updateWattage,
    updateSelectedRect,
    setIsForbruksKonfigOpen,
    setDrawerOpen,
  }
}
