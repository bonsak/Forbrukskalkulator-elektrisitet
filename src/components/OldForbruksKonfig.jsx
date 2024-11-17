import PropTypes from 'prop-types'
import * as Dialog from '@radix-ui/react-dialog'
import * as Slider from '@radix-ui/react-slider'
import '../style/forbrukskonfig.css'
import { Cross2Icon } from '@radix-ui/react-icons'

const OldForbruksKonfig = ({ isOpen, setIsOpen, selectedRect }) => {
  return (
    <Dialog.Root
      open={isOpen}
      onOpenChange={setIsOpen}
    >
      <Dialog.Portal>
        <Dialog.Overlay className='DialogOverlay' />
        <Dialog.Content className='DialogContent'>
          <Dialog.Title className='DialogTitle'>Rediger forbruk</Dialog.Title>
          <Dialog.Description className='DialogDescription'>
            Gjør endringer her
          </Dialog.Description>
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
                aria-label='Volume'
              />
            </Slider.Root>
          </form>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}

OldForbruksKonfig.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  setIsOpen: PropTypes.func.isRequired,
  selectedRect: PropTypes.object,
}

export default OldForbruksKonfig
