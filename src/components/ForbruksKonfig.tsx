import * as Dialog from '@radix-ui/react-dialog'
import * as Slider from '@radix-ui/react-slider'
import '../style/forbrukskonfig.css'
import { Cross2Icon } from '@radix-ui/react-icons'
import { ForbruksKonfigProps } from '../types/types'
import useImage from 'use-image'
import styled from 'styled-components'
import { COLORS } from '../utils/constants'
import { useForbruksEnheter } from '../utils/Forbruksenheter'
import { useEffect, useState } from 'react'

const ForbruksKonfig = ({
  isOpen,
  setIsOpen,
  selectedRect,
  updateWattage,
}: ForbruksKonfigProps) => {
  const [sliderValue, setSliderValue] = useState(selectedRect?.wattage || 0)

  useEffect(() => {
    setSliderValue(selectedRect?.wattage || 0)
  }, [selectedRect?.wattage])

  const handleValueChange = (wattage: number[]) => {
    if (selectedRect) {
      setSliderValue(wattage[0])
      updateWattage(sliderValue)
    }
  }

  return (
    <Dialog.Root
      open={isOpen}
      onOpenChange={setIsOpen}
    >
      <Dialog.Portal>
        <Dialog.Overlay className='DialogOverlay' />
        <Dialog.Content className='DialogContent'>
          <Dialog.Title className='DialogTitle'>
            {selectedRect?.name}
          </Dialog.Title>
          <InnerWrapper>
            <img
              className='forbruksIkon'
              src='/icons/forbruk.png'
            />
            <Dialog.Description className='DialogDescription'>
              {/* {selectedRect?.description} */}
              <span>Strømforbruk: {sliderValue} Watt</span>

              {/* <span>Min: {selectedRect?.minWatt} Watt</span>
              <span>Max: {selectedRect?.maxWatt} Watt</span> */}
            </Dialog.Description>
          </InnerWrapper>
          <Dialog.Close asChild>
            <span
              className='IconButton'
              aria-label='Close'
            >
              <Cross2Icon />
            </span>
          </Dialog.Close>
          <form>
            <Slider.Root
              onValueChange={handleValueChange}
              className='SliderRoot'
              value={[sliderValue]}
              min={selectedRect?.minWatt || 0}
              max={selectedRect?.maxWatt || 0}
              step={1}
            >
              <StyledTrack className='SliderTrack flex flex-row'>
                <MinMax>{selectedRect?.minWatt}</MinMax>
                <Slider.Range className='SliderRange' />
                <MinMax>{selectedRect?.maxWatt}</MinMax>
              </StyledTrack>
              <Slider.Thumb
                className='SliderThumb'
                aria-label='Strømforbruk'
              />
            </Slider.Root>
          </form>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}

export default ForbruksKonfig

const InnerWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 10px;
  margin-bottom: 10px;
  margin-top: 10px;
`
const MinMax = styled.div`
  font-size: 12px;
  /* font-weight: bold; */
  color: ${COLORS.clr_darkmintgreen};
  margin-top: 22px;
`
const StyledTrack = styled(Slider.Track)`
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  align-items: center;
`
