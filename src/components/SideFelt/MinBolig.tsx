import * as Form from '@radix-ui/react-form'
import * as Select from '@radix-ui/react-select'
import styled from 'styled-components'
import { COLORS } from '@utils/constants'
import { useDagensPriserStore } from '@stores/dagensPriserStore'
import { ChevronDownIcon } from '@radix-ui/react-icons'
import { useEffect } from 'react'
import { useMittHusStore } from '@stores/mittHusStore'
import { useStroemForbrukStore } from '@stores/stroemForbrukStore'
import { STROMSONER } from '../../types/types'

const MinBolig = () => {
  const { mittHus, setMittHus } = useMittHusStore()
  const { totaltForbruk } = useStroemForbrukStore()

  const { aktivSone, setAktivSone, priser, hentPriser, } = useDagensPriserStore()

  useEffect(() => {
    const oppdaterPriser = async () => {
      await hentPriser(aktivSone)
      // console.log('Priser oppdatert for sone:', aktivSone)
    }
    setMittHus({...mittHus, sone: aktivSone})
    oppdaterPriser()
  }, [aktivSone, hentPriser])

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)

    const oppdatertHus: MittHus = {
      navn: formData.get('navn') as string,
      antallRom: Number(formData.get('antallRom')),
      antallVoksne: Number(formData.get('antallVoksne')),
      antallBarn: Number(formData.get('antallBarn')),
      antallKvadrat: Number(formData.get('antallKvadrat')),
      antallVarmtvannstanker: Number(formData.get('antallVarmtvannstanker')),
      effektVarmtvannstanker: Number(formData.get('effektVarmtvannstanker')),
      effektElbillader: Number(formData.get('effektElbillader')),
      sone: formData.get('sone') as typeof STROMSONER[number]['token']
    }

    setMittHus(oppdatertHus)
  }
  

  return (
    <StyledForm onSubmit={handleSubmit}>
      <Select.Root value={aktivSone} onValueChange={setAktivSone}>
        <StyledSelectTrigger>
          <Select.Value placeholder="Velg strømsone" />
          <Select.Icon>
            <ChevronDownIcon />
          </Select.Icon>
        </StyledSelectTrigger>
        
        <Select.Portal>
          <StyledSelectContent>
            <StyledSelectViewport>
              {STROMSONER.map((sone) => (
                <StyledSelectItem key={sone.token} value={sone.token}>
                  <Select.ItemText>{sone.navn}</Select.ItemText>
                </StyledSelectItem>
              ))}
            </StyledSelectViewport>
          </StyledSelectContent>
        </Select.Portal>
      </Select.Root>
      <StyledField name='navn'>
        <StyledLabel>Navn</StyledLabel>
        <StyledInput
          type='text'
          defaultValue={mittHus.navn}
          required
        />
      </StyledField>
      <StyledField name='antallRom'>
        <StyledLabel>Rom</StyledLabel>
        <StyledInput
          type='number'
          defaultValue={mittHus.antallRom}
          required
          min='1'
        />
      </StyledField>
      <StyledField name='antallVoksne'>
        <StyledLabel>Voksne</StyledLabel>
        <StyledInput
          type='number'
          defaultValue={mittHus.antallVoksne}
          required
          min='0'
        />
      </StyledField>
      <StyledField name='antallBarn'>
        <StyledLabel>Barn</StyledLabel>
        <StyledInput
          type='number'
          defaultValue={mittHus.antallBarn}
          required
          min='0'
        />
      </StyledField>
      <StyledField name='antallKvadrat'>
        <StyledLabel>Størrelse (m²)</StyledLabel>
        <StyledInput
          type='number'
          defaultValue={mittHus.antallKvadrat}
          required
          min='1'
        />
      </StyledField>
      <StyledField name='antallVarmtvannstanker'>
        <StyledLabel>Beredere</StyledLabel>
        <StyledInput
          type='number'
          defaultValue={mittHus.antallVarmtvannstanker}
          required
          min='0'
        />
      </StyledField>
      <StyledField name='effektElbillader'>
        <StyledLabel>Billader (kW)</StyledLabel>
        <StyledInput
          type='number'
          defaultValue={mittHus.effektElbillader}
          required
          step='0.1'
          min='0'
        />
      </StyledField>
      <StyledButton type='submit'>Oppdater boliginfo</StyledButton>
    </StyledForm>
  )
}

export default MinBolig

const StyledSelectTrigger = styled(Select.Trigger)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.5rem 1rem;
  background: white;
  border: 1px solid ${COLORS.clr_mintgreen};
  border-radius: 4px;
  font-size: 0.9rem;
  color: ${COLORS.clr_darkmintgreen};
  
  &:hover {
    background: ${COLORS.clr_mintlight};
  }
`

const StyledSelectContent = styled(Select.Content)`
  background: white;
  border-radius: 4px;
  border: 1px solid ${COLORS.clr_mintgreen};
  overflow: hidden;
`

const StyledSelectViewport = styled(Select.Viewport)`
  padding: 0.5rem;
`

const StyledSelectItem = styled(Select.Item)`
  font-size: 0.9rem;
  padding: 0.5rem;
  cursor: pointer;
  outline: none;
  
  &:hover {
    background: ${COLORS.clr_mintlight};
  }
  
  &[data-highlighted] {
    background: ${COLORS.clr_mintlight};
  }
`

const StyledForm = styled(Form.Root)`
  grid-area: minbolig;
  display: flex;
  flex-direction: column;
  padding: 2rem;
  gap: 0.5rem;
  background-color: ${COLORS.clr_mintlight};
  border-radius: 40px 0 40px 40px;
  height: 360px;
  width: 400px;
`

const StyledField = styled(Form.Field)`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  gap: 1.5rem;
  /* margin-bottom: 1rem; */
`

const StyledLabel = styled(Form.Label)`
  /* display: block; */
  /* width: 150px; */
  font-size: 0.9rem;
  font-weight: 500;
  color: ${COLORS.clr_darkmintgreen};
  /* margin-bottom: 0.5rem; */
`

const StyledInput = styled(Form.Control)`
  max-width: 150px;
  text-align: right;
  padding: 0.1rem;
  background-color: transparent;
  border: 1px solid ${COLORS.clr_mintgreen};
  border-radius: 4px;
  &:focus {
    outline: 2px solid ${COLORS.clr_mintgreen};
  }
`

const StyledButton = styled.button`
  background: ${COLORS.clr_mintgreen};
  color: white;
  border: none;
  padding: 0.4rem 1rem;
  border-radius: 100px;
  cursor: pointer;
  margin-top: 0.5rem;

  &:hover {
    background: ${COLORS.clr_darkmintgreen};
    opacity: 0.5;
  }
`

interface MittHus {
  navn: string
  antallRom: number
  antallVoksne: number
  antallBarn: number
  antallKvadrat: number
  antallVarmtvannstanker: number
  effektVarmtvannstanker: number
  effektElbillader: number
  sone: "NO1" | "NO2" | "NO3" | "NO4" | "NO5"
}
