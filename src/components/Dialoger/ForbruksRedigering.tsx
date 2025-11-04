import * as Dialog from '@radix-ui/react-dialog'
import * as Slider from '@radix-ui/react-slider'
import { Pencil1Icon } from '@radix-ui/react-icons'
import { Cross2Icon } from '@radix-ui/react-icons'
import { ForbruksEnhet, Rectangle } from '@/types/types'
// import useImage from 'use-image'
import styled from 'styled-components'
import { COLORS } from '@utils/constants'
import { useForbruksEnheter } from '@/utils/Forbruksenheter'
import { useEffect, useState } from 'react'

interface ForbruksKonfigProps {
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
  selectedRect: Rectangle | null
  setSelectedRect: (selectedRect: Rectangle) => void
  updateWattage: (wattage: number) => void
  drawerOpen: boolean
  setDrawerOpen: (open: boolean) => void
  newRect?: Rectangle | null
}

const ForbruksRedigering = ({
  isOpen,
  setIsOpen,
  selectedRect,
  setSelectedRect,
  updateWattage,
  drawerOpen,
  setDrawerOpen,
  newRect,
}: ForbruksKonfigProps) => {
  const [sliderValue, setSliderValue] = useState(selectedRect?.wattage || 0)
  const alleEnheter = useForbruksEnheter()

  useEffect(() => {
    if (!selectedRect && newRect && typeof setSelectedRect === 'function') {
      setSelectedRect(newRect)
    }
  }, [newRect, selectedRect, setSelectedRect])

  useEffect(() => {
    setSliderValue(selectedRect?.wattage || 0)
  }, [selectedRect])

  const handleValueChange = (wattage: number[]) => {
    if (selectedRect) {
      const newWattage = wattage[0]
      setSliderValue(newWattage)
      updateWattage(newWattage)
    }
  }
  const handleDrawerClick = () => {
    setDrawerOpen(!drawerOpen)
  }
  const handleEnhetClick = (enhet: ForbruksEnhet) => {
    if (selectedRect) {
      const oppdatertRect = {
        ...selectedRect,
        name: enhet.name,
        image: enhet.image,
        wattage: enhet.wattage,
        minWatt: enhet.minWatt,
        maxWatt: enhet.maxWatt,
      }

      setSelectedRect(oppdatertRect)

      setSliderValue(enhet.wattage)
    }
  }

  return (
    <Dialog.Root
      open={isOpen}
      onOpenChange={setIsOpen}
    >
      <Dialog.Portal>
        <DialogOverlay />
        <Content>
          <div className='konfig'>
            <DialogTitle className='DialogTitle'>
              {selectedRect?.name}
            </DialogTitle>
            <InnerWrapper>
              <ForbruksIkon
                className='forbruksIkon'
                src={selectedRect?.image?.src}
                $selected={false}
              />
              <Dialog.Description className='DialogDescription'>
                {/* {selectedRect?.description} */}
                <span>Strømforbruk: {sliderValue} Watt</span>

                {/* <span>Min: {selectedRect?.minWatt} Watt</span>
                <span>Max: {selectedRect?.maxWatt} Watt</span> */}
              </Dialog.Description>
            </InnerWrapper>
            <DialogClose asChild>
              <span
                className='IconButton'
                aria-label='Close'
              >
                <Cross2Icon />
              </span>
            </DialogClose>
            <form>
              <SliderRoot
                // onValueChange={handleValueChange}
                onValueChange={(values) => handleValueChange(values)}
                // className='SliderRoot'
                value={[sliderValue]}
                min={selectedRect?.minWatt}
                max={selectedRect?.maxWatt}
                step={1}
              >
                <StyledTrack>
                  <MinMax>{selectedRect?.minWatt}</MinMax>
                  <SliderRange />
                  <MinMax>{selectedRect?.maxWatt}</MinMax>
                </StyledTrack>
                <SliderThumb
                  className='SliderThumb'
                  aria-label='Strømforbruk'
                />
              </SliderRoot>
            </form>
          </div>
          <EditButtonWrapper>
            <Pencil1Icon
              width={20}
              height={20}
              onClick={handleDrawerClick}
            />
          </EditButtonWrapper>

          <Drawer $drawerOpen={drawerOpen}>
            {/* <div 
              className='drawer-content'
            > */}
            {alleEnheter.map((enhet) => (
              <ForbruksIkon
                key={enhet.id}
                src={enhet.image?.src}
                onClick={() => handleEnhetClick(enhet)}
                $selected={selectedRect?.name === enhet.name}
              />
            ))}
            {/* </div> */}
          </Drawer>
        </Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}

export default ForbruksRedigering

const DialogOverlay = styled(Dialog.Overlay)`
  position: fixed;
  inset: 0;
  animation: overlayShow 150ms cubic-bezier(0.16, 1, 0.3, 1);
`
const DialogTitle = styled(Dialog.Title)`
  margin-top: 20px;
  font-size: 20px;
  font-weight: bold;
`
const Content = styled(Dialog.Content)`
  background-color: #fcd395;
  border-radius: 6px;
  box-shadow: hsl(206 22% 7% / 35%) 0px 10px 38px -10px,
    hsl(206 22% 7% / 20%) 0px 10px 20px -15px;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 80vw;
  max-width: 350px;
  max-height: 85vh;
  padding: 25px;
  animation: contentShow 150ms cubic-bezier(0.16, 1, 0.3, 1);
`
const DialogClose = styled(Dialog.Close)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-family: inherit;
  border-radius: 100%;
  height: 25px;
  width: 25px;
  color: var(--violet-11);
  position: absolute;
  top: 20px;
  right: 20px;
`
const Drawer = styled.div<{ $drawerOpen: boolean }>`
  /* position: absolute; */
  /* width: 100%; */
  margin-top: 20px;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 3px;
  /* justify-content: space-between; */
  grid-template-columns: repeat(6, 1fr);
  height: ${(props) => (props.$drawerOpen ? '150px' : '0px')};
  /* top: 150px; */
  overflow: hidden;
  background-color: 'lightgray';
`
const ForbruksIkon = styled.img<{ $selected: boolean }>`
  border: ${(props) =>
    props.$selected ? `2px solid ${COLORS.clr_green_400}` : 'none'};
  border-radius: 8px;
  width: 40px;
  height: 40px;
`
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
  background-color: #097b4f;
  position: relative;
  flex-grow: 1;
  border-radius: 9999px;
  height: 3px;
`
const SliderRoot = styled(Slider.Root)`
  position: relative;
  display: flex;
  align-items: center;
  user-select: none;
  touch-action: none;
  /* width: 200px; */
  height: 20px;
`
const SliderRange = styled(Slider.Range)`
  position: absolute;
  background-color: #097b4f;
  border-radius: 9999px;
  height: 100%;
`
const SliderThumb = styled(Slider.Thumb)`
  display: block;
  width: 10px;
  height: 14px;
  background-color: #097b4f;
  outline: none;
  /* box-shadow: 0 2px 10px var(--black-a7); */
  /* border-radius: 10px; */
`
const EditButtonWrapper = styled.div`
  /* display: flex; */
  cursor: pointer;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 20px;
  left: 20px;
`
