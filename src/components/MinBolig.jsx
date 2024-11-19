import styled from 'styled-components'
import { COLORS } from '../utils/constants'
import { useState } from 'react'
import { Formik, Form, Field } from 'formik'

const MinBolig = ({ mittHus, setMittHus }) => {
  return (
    <MinBoligWrapper>
      <Formik
        initialValues={mittHus}
        onSubmit={(values) => {
          setMittHus(values)
          console.log(values)
        }}
      >
        <StyledForm>
          <FormGruppe>
            <Label>Navn:</Label>
            <StyledField
              name='navn'
              type='text'
            />
          </FormGruppe>

          <FormGruppe>
            <Label>Rom:</Label>
            <StyledField
              name='antallRom'
              type='number'
            />
          </FormGruppe>

          <FormGruppe>
            <Label>Voksne:</Label>
            <StyledField
              name='antallVoksne'
              type='number'
            />
          </FormGruppe>

          <FormGruppe>
            <Label>Barn</Label>
            <StyledField
              name='antallBarn'
              type='number'
            />
          </FormGruppe>

          <FormGruppe>
            <Label>m2</Label>
            <StyledField
              name='antallKvadrat'
              type='number'
            />
          </FormGruppe>

          <FormGruppe>
            <Label>Beredere</Label>
            <StyledField
              name='antallVarmtvannstanker'
              type='number'
            />
          </FormGruppe>

          {/* <FormGruppe>
            <Label>Effekt Beredere (kW)</Label>
            <StyledField
              name='effektVarmtvannstanker'
              type='number'
              step='0.1'
            />
          </FormGruppe>

          <FormGruppe>
            <Label>Effekt elbillader (kW)</Label>
            <StyledField
              name='effektElbillader'
              type='number'
              step='0.1'
            />
          </FormGruppe> */}

          <LagreKnapp type='submit'>Lagre</LagreKnapp>
        </StyledForm>
      </Formik>
    </MinBoligWrapper>
  )
}

const StyledForm = styled(Form)`
  display: flex;
  flex-direction: column;
  /* justify-content: space-between; */
  /* grid-template-columns: 1fr 1fr; */
  /* flex-direction: column; */
  /* align-items: center; */
  /* justify-content: baseline; */
  gap: 0.5rem;
  padding: 2rem;
`

const FormGruppe = styled.div`
  /* margin-bottom: 0.5rem; */
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  gap: 1.5rem;
`

const Label = styled.label`
  font-size: 0.9rem;
  color: ${COLORS.clr_darkgreen};
`

const StyledField = styled(Field)`
  text-align: right;
  padding: 0.1rem;
  border: 1px solid ${COLORS.clr_mintgreen};
  border-radius: 4px;
  &:focus {
    outline: 2px solid ${COLORS.clr_mintgreen};
  }
`

const LagreKnapp = styled.button`
  background: ${COLORS.clr_mintgreen};
  color: white;
  border: none;
  padding: 0.8rem;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 1rem;

  &:hover {
    background: ${COLORS.clr_darkmintgreen};
    opacity: 0.5;
  }
`
//   return <MinBoligWrapper>MinBolig</MinBoligWrapper>
// }

const MinBoligWrapper = styled.div`
  grid-area: minbolig;
  background-color: ${COLORS.clr_mintlight};
  border-radius: 40px 0 40px 40px;
  height: 360px;
  width: 400px;
`

export default MinBolig
