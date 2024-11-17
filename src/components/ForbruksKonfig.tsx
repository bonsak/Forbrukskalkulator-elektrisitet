import * as Dialog from '@radix-ui/react-dialog'
import * as Slider from '@radix-ui/react-slider'
import '../style/forbrukskonfig.css'
import { Cross2Icon } from '@radix-ui/react-icons'
import { ForbruksKonfigProps } from '../types/types'
import useImage from 'use-image'
import styled from 'styled-components'

const ForbruksKonfig = ({
  isOpen,
  setIsOpen,
  selectedRect,
}: ForbruksKonfigProps) => {
  const currentKwt = selectedRect?.kwt || 0
  const [forbruk] = useImage('/icons/forbruk.png')
  console.log('forbruk', forbruk)

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
          <Dialog.Title className='DialogTitle'>Navn på forbruk</Dialog.Title>
          <InnerWrapper>
          <img
            className='forbruksIkon'
            src='/icons/forbruk.png'
          />
            <Dialog.Description className='DialogDescription'>
              Beskrivelse av forbruket som er valgt
              Strømforbruk: {currentKwt} kWt
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
