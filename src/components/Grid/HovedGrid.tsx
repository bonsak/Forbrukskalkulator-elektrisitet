import styled from 'styled-components'
import { COLORS } from '@utils/constants'
import ForbruksKonfig from '@components/Dialoger/ForbruksRedigering'
import { useGridInteraction } from '@/hooks/useGridInteraction'
import GridCanvas from './GridCanvas'

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
      <GridCanvas
        stageRef={stageRef}
        brukerEnheter={brukerEnheter}
        isDrawing={isDrawing}
        isResizing={isResizing}
        previewRect={previewRect}
        handleMouseDown={handleMouseDown}
        handleMouseMoveOnStage={handleMouseMoveOnStage}
        handleMouseUpOnStage={handleMouseUpOnStage}
        handleRectMouseDown={handleRectMouseDown}
        onDragStart={onDragStart}
        onDragMove={onDragMove}
        onDragEnd={onDragEnd}
        handleRectDblclick={handleRectDblclick}
        handleDeleteClick={handleDeleteClick}
      />
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
