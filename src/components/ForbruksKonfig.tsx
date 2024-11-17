import * as Dialog from '@radix-ui/react-dialog'
import * as Slider from '@radix-ui/react-slider'
import '../style/forbrukskonfig.css'
import { Cross2Icon } from '@radix-ui/react-icons'
import { ForbruksKonfigProps } from '../types/types'
import useImage from 'use-image'

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
        <Dialog.Content className='DialogContent'>
          {/* <Dialog.Title className='DialogTitle'>Rediger forbruk</Dialog.Title> */}
          {/* <Dialog.Description className='DialogDescription'>
            Strømforbruk: {currentKwt} kWt
          </Dialog.Description> */}
          <img
            className='forbruksIkon'
            src='/icons/forbruk.png'
          />
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
              defaultValue={[currentKwt]}
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
