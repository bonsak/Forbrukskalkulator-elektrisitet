import styled from 'styled-components'
import { COLORS } from '../utils/constants'
import { useForbruksEnheter } from "../utils/Forbruksenheter"
import * as Dialog from '@radix-ui/react-dialog'
import { useState } from 'react'

const NyttForbruk = () => {
  const [valgtEnhet, setValgtEnhet] = useState(null)
  const enheter = useForbruksEnheter()
  console.log(enheter)

  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <LeggTilKnapp>Legg til nytt forbruk</LeggTilKnapp>
      </Dialog.Trigger>
      
      <Dialog.Portal>
        <DialogOverlay />
        <DialogContent>
          <DialogTitle>Velg forbruksenhet</DialogTitle>
          
          <EnhetsGrid>
            {enheter.map((enhet) => (
              <EnhetKort 
                key={enhet.id}
                onClick={() => setValgtEnhet(enhet)}
                $isSelected={valgtEnhet?.id === enhet.id}
              >
                <EnhetBilde src={enhet.image.src} alt={enhet.name} />
                <EnhetNavn>{enhet.name}</EnhetNavn>
              </EnhetKort>
            ))}
          </EnhetsGrid>

          <DialogFooter>
            <Dialog.Close asChild>
              <AvbrytKnapp>Avbryt</AvbrytKnapp>
            </Dialog.Close>
            <VelgKnapp 
              onClick={() => {
                // Håndter valgt enhet her
                console.log('Valgt enhet:', valgtEnhet)
              }}
              disabled={!valgtEnhet}
            >
              Velg forbruk
            </VelgKnapp>
          </DialogFooter>
        </DialogContent>
      </Dialog.Portal>
    </Dialog.Root>
  )
}

const LeggTilKnapp = styled.button`
  padding: 8px 16px;
  background: ${COLORS.primary};
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`

const DialogOverlay = styled(Dialog.Overlay)`
  background: rgba(0, 0, 0, 0.5);
  position: fixed;
  inset: 0;
`

const DialogContent = styled(Dialog.Content)`
  background: white;
  border-radius: 8px;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 24px;
  width: 90%;
  max-width: 800px;
  max-height: 85vh;
  overflow-y: auto;
`

const DialogTitle = styled(Dialog.Title)`
  font-size: 24px;
  margin-bottom: 24px;
`

const EnhetsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
  margin-bottom: 24px;

  @media (max-width: 768px) {
    grid-template-columns: repeat(3, 1fr);
  }
`

const EnhetKort = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 12px;
  border: 2px solid ${props => props.$isSelected ? COLORS.primary : '#ddd'};
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    border-color: ${COLORS.primary};
  }
`

const EnhetBilde = styled.img`
  width: 40px;
  height: auto;
  border-radius: 4px;
`

const EnhetNavn = styled.p`
  margin: 8px 0 0;
  text-align: center;
  font-size: 14px;
`

const DialogFooter = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 12px;
`

const BaseKnapp = styled.button`
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 500;
`

const AvbrytKnapp = styled(BaseKnapp)`
  background: transparent;
  border: 1px solid #ddd;
  
  &:hover {
    background: #f5f5f5;
  }
`

const VelgKnapp = styled(BaseKnapp)`
  background: ${COLORS.primary};
  color: white;
  border: none;

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  &:not(:disabled):hover {
    opacity: 0.9;
  }
`

export default NyttForbruk
