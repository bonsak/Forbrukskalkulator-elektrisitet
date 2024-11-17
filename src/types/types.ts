export interface Rectangle {
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

export interface ForbruksKonfigProps {
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
  selectedRect: Rectangle | null
}

export interface KonvaGridProps {
  setStroemForbruk: (data: StroemForbrukData) => void
}

export interface StroemForbrukData {
  id: string
  data: Array<{ x: number; y: number }>
}

export interface PreviewRectangle {
  x: number
  y: number
  width: number
  height: number
  fill: string
  stroke: string
  strokeWidth: number
  dash: number[]
}
