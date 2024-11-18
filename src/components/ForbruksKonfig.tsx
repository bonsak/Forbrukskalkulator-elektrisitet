import * as Dialog from '@radix-ui/react-dialog'
import * as Slider from '@radix-ui/react-slider'
import '../style/forbrukskonfig.css'
import { Cross2Icon } from '@radix-ui/react-icons'
import { ForbruksKonfigProps } from '../types/types'
import useImage from 'use-image'
import styled from 'styled-components'
import { useForbruksEnheter } from "../utils/Forbruksenheter"


const ForbruksKonfig = ({
  isOpen,
  setIsOpen,
  selectedRect,
}: ForbruksKonfigProps) => {
  // console.log('FBKonfig',selectedRect)
  if (!selectedRect) return null

  // const currentId = selectedRect?.attrs.id
  // const currentName = selectedRect?.attrs.name
  // const currentDescription = selectedRect?.attrs.description
  // const currentWattage = selectedRect?.attrs.wattage
  // const currentMinWatt = selectedRect?.attrs.minWatt
  // const currentMaxWatt = selectedRect?.attrs.maxWatt

  // const FORBRUKSENHETER = useForbruksEnheter()
  // console.log(selectedRect.attrs.id)

  return (
    
    <Dialog.Root
      open={isOpen}
      onOpenChange={setIsOpen}
    >
      <Dialog.Portal>
        <Dialog.Overlay className='DialogOverlay' />
        <Dialog.Content 
        className='DialogContent'
        >
          <Dialog.Title className='DialogTitle'>Navn</Dialog.Title>
          <InnerWrapper>
          <img
            className='forbruksIkon'
            src='/icons/forbruk.png'
          />
            <Dialog.Description className='DialogDescription'>
              Beskrivelse av forbruket som er valgt
              <span>Strømforbruk: Watt</span>
              <span>Min: Watt</span>
              <span>Max: Watt</span>
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
              className='SliderRoot'
              defaultValue={[50]}
              max={100}
              step={1}
            >
              <Slider.Track className='SliderTrack'>
                <Slider.Range className='SliderRange' />
              </Slider.Track>
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
