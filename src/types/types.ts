export interface Rectangle {
  x: number
  y: number
  width: number
  height: number
  stroke: string
  strokeWidth: number
  strokeScaleEnabled: boolean
  fill: string
  // onDragStart: (e: any) => void
  // onDragMove: (e: any) => void
  // onDragEnd: (e: any) => void
  // onDblclick: (e: any) => void
  id: string
  draggable: boolean
  isDragging: boolean
  wattage: number
  minWatt: number
  maxWatt: number
  name: string
  description: string
  image: HTMLImageElement | undefined
}

export interface ForbruksKonfigProps {
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
  selectedRect: Rectangle | null
  setSelectedRect: (selectedRect: Rectangle) => void
  updateWattage: (wattage: number) => void
  drawerOpen: boolean
  setDrawerOpen: (open: boolean) => void
  newRect?: Rectangle | null
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

export interface ForbruksEnhet {
  id: string
  image: HTMLImageElement | undefined
  name: string
  description: string
  wattage: number
  minWatt: number
  maxWatt: number
}
