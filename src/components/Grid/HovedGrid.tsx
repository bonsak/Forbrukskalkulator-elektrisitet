import { Stage, Layer, Rect, Line, Group, Text, Image } from 'react-konva'
import styled from 'styled-components'
import { COLORS } from '@utils/constants'
import ForbruksKonfig from '@components/Dialoger/ForbruksRedigering'
import { KonvaEventObject } from 'konva/lib/Node'
import { useGridInteraction } from '@/hooks/useGridInteraction'
import {
  STAGE_WIDTH,
  STAGE_HEIGHT,
  GRID_COLUMNS,
  COLUMN_WIDTH,
  ROW_HEIGHT,
  ROWS,
} from '@/utils/gridEngine'

const HovedGrid = () => {
  const {
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
  } = useGridInteraction()

  return (
    <Wrapper>
      <Stage
        ref={stageRef}
        width={STAGE_WIDTH}
        height={STAGE_HEIGHT}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMoveOnStage}
        onMouseUp={handleMouseUpOnStage}
      >
        <Layer>
          {Array.from({ length: GRID_COLUMNS + 1 }).map((_, i) => (
            <Line
              key={`v${i}`}
              points={[i * COLUMN_WIDTH, 0, i * COLUMN_WIDTH, STAGE_HEIGHT]}
              stroke="#ddd"
              strokeWidth={0.5}
            />
          ))}
          {Array.from({ length: ROWS + 1 }).map((_, i) => (
            <Line
              key={`h${i}`}
              points={[0, i * ROW_HEIGHT, STAGE_WIDTH, i * ROW_HEIGHT]}
              stroke="#ddd"
              strokeWidth={0.5}
            />
          ))}

          {brukerEnheter.map((rect) => (
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
                <Text text="×" fill="#007B50" fontSize={14} x={3} y={-1} />
                <Image
                  image={rect.image}
                  x={-(rect.width / 2)}
                  y={-5}
                  listening={false}
                />
              </Group>
            </Group>
          ))}

          {(isResizing || isDrawing || previewRect) && (
            <Rect {...previewRect} cornerRadius={8} />
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
`

export default HovedGrid
