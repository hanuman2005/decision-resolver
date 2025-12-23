
import React from 'react';
import styled from 'styled-components';

const InputContainer = styled.div`
  width: 100%;
  box-sizing: border-box;
`;

const StyledInput = styled.input`
  padding: 0.75rem 1rem 0.75rem 45px;
  border-radius: 8px;
  border: 2px solid rgba(92, 124, 137, 0.5);
  font-size: 1rem;
  width: 100%;
  box-sizing: border-box;
  background: rgba(31, 73, 89, 0.3);
  color: #ffffff;
  transition: all 0.2s ease;
  line-height: 1.5;
  display: flex;
  align-items: center;
  ${(props) => props.$nomargin ? 'margin-bottom: 0;' : 'margin-bottom: 0.75rem;'}
  
  &:focus {
    outline: none;
    border-color: #5c7c89;
    box-shadow: 0 0 0 3px rgba(31, 73, 89, 0.2);
    background: rgba(31, 73, 89, 0.5);
  }
  
  &::placeholder {
    color: rgba(176, 212, 221, 0.7);
  }
`;

/**
 * Reusable Input Component
 * Supports labels, errors, and different input types
 */



const Label = styled.label`
  display: block;
  font-size: 0.95rem;
  font-weight: 500;
  margin-bottom: 4px;
  color: #ffffff;
`;
const Required = styled.span`
  color: #e53935;
  margin-left: 2px;
`;
const InputWrapper = styled.div`
  position: relative;
`;
const IconWrapper = styled.span`
  position: absolute;
  left: 12px;
  top: 50%;
  transform: translateY(-50%);
  pointer-events: none;
  display: flex;
  align-items: center;
  justify-content: center;
  svg {
    height: 20px;
    width: 20px;
    color: #5c7c89;
    stroke-width: 2;
    flex-shrink: 0;
  }
`;
const ErrorText = styled.p`
  margin-top: 4px;
  font-size: 0.9rem;
  color: #ff6b7a;
`;

const Input = ({
  label,
  error,
  type = 'text',
  placeholder,
  value,
  onChange,
  onBlur,
  name,
  id,
  required = false,
  disabled = false,
  Icon,
  $nomargin = false,
  ...props
}) => {
  const inputId = id || name;

  return (
    <InputContainer>
      {/* Label */}
      {label && (
        <Label htmlFor={inputId}>
          {label}
          {required && <Required>*</Required>}
        </Label>
      )}

      {/* Input container */}
      <InputWrapper>
        {Icon && (
          <IconWrapper>
            <Icon />
          </IconWrapper>
        )}
        <StyledInput
          type={type}
          id={inputId}
          name={name}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          placeholder={placeholder}
          disabled={disabled}
          required={required}
          $hasicon={Icon ? 1 : undefined}
          $nomargin={$nomargin}
        />
      </InputWrapper>

      {/* Error message */}
      {error && <ErrorText>{error}</ErrorText>}
    </InputContainer>
  );
};

export default Input;