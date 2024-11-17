import React from 'react';
import styled from 'styled-components';

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const DialogContainer = styled.div`
  position: absolute;
  top: ${props => props.$innerHeight / 2 - 200}px;
  left: ${props => props.$innerWidth / 2 - 160}px;
  background-color: white;
  padding: 16px;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  width: 320px;
`;

const IconGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 4px;
`;

const IconCell = styled.div`
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #e2e2e2;
  border-radius: 4px;
  
  &:hover {
    background-color: #f5f5f5;
  }
`;

const ButtonContainer = styled.div`
  margin-top: 16px;
  display: flex;
  justify-content: flex-end;
  gap: 8px;
`;

const Button = styled.button`
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
`;

const CancelButton = styled(Button)`
  border: 1px solid #e2e2e2;
  background: white;
  
  &:hover {
    background-color: #f5f5f5;
  }
`;

const OkButton = styled(Button)`
  background: #3b82f6;
  color: white;
  border: none;
  
  &:hover {
    background: #2563eb;
  }
`;

const Dialog = ({ showDialog, innerWidth, innerHeight, onClose, onOk }) => {
  const icons = Array(20).fill('🔹');
  
  if (!showDialog) return null;

  return (
    <Overlay>
      <DialogContainer $innerWidth={innerWidth} $innerHeight={innerHeight}>
        <IconGrid>
          {icons.map((icon, i) => (
            <IconCell key={i}>{icon}</IconCell>
          ))}
        </IconGrid>
        <ButtonContainer>
          <CancelButton onClick={onClose}>Cancel</CancelButton>
          <OkButton onClick={onOk}>OK</OkButton>
        </ButtonContainer>
      </DialogContainer>
    </Overlay>
  );
};

export default Dialog;