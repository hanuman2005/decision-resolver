
import React from 'react';
import { Loader2 } from 'lucide-react';
import styled from "styled-components";

const LoaderIcon = styled(Loader2)`
  width: 16px;
  height: 16px;
  margin-right: 8px;
  animation: spin 1s linear infinite;
  @keyframes spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
`;

const StyledButton = styled.button`
  padding: ${(props) => {
    if (props.$variant === 'small') return '0.35rem 0.85rem';
    if (props.$size === 'lg') return '0.75rem 1.75rem';
    return '0.5rem 1.5rem';
  }};
  border-radius: ${(props) => props.$radius || "8px"};
  font-size: ${(props) => {
    if (props.$variant === 'small') return '0.85rem';
    if (props.$size === 'lg') return '1.1rem';
    return '1rem';
  }};
  font-weight: 600;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease;
  display: ${(props) => props.$fullWidth ? 'flex' : 'inline-flex'};
  align-items: center;
  gap: 0.5rem;
  text-decoration: none;
  width: ${(props) => props.$fullWidth ? '100%' : 'auto'};
  justify-content: center;

  svg {
    stroke-width: 2.5;
  }

  ${(props) => {
    if (props.$variant === 'outline') {
      return `
        background: rgba(92, 124, 137, 0.15);
        color: ${props.$teal ? '#5c7c89' : '#ffffff'};
        border: 2px solid #5c7c89;
        font-weight: 700;
        transition: all 0.3s ease;
        
        &:hover {
          background: rgba(92, 124, 137, 0.4);
          color: ${props.$teal ? '#ffffff' : '#ffffff'};
          box-shadow: 0 4px 12px rgba(92, 124, 137, 0.4);
          border-color: #ffffff;
        }
        &:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }
      `;
    }
    
    return `
      background: linear-gradient(135deg, rgba(31, 73, 89, 0.5) 0%, rgba(92, 124, 137, 0.5) 100%);
      color: #ffffff;
      box-shadow: 0 4px 15px rgba(31, 73, 89, 0.3);
      border: 2px solid rgba(92, 124, 137, 0.6);
      backdrop-filter: blur(10px);
      font-weight: 700;
      transition: all 0.3s ease;
      
      &:hover {
        background: linear-gradient(135deg, #1f4959 0%, #5c7c89 100%);
        box-shadow: 0 8px 25px rgba(31, 73, 89, 0.5);
        border-color: rgba(92, 124, 137, 0.8);
        transform: translateY(-2px);
      }
      
      &:active {
        transform: scale(0.98);
      }
      
      &:disabled {
        background: rgba(92, 124, 137, 0.2);
        cursor: not-allowed;
        box-shadow: none;
        border-color: rgba(92, 124, 137, 0.2);
      }
    `;
  }}
`;

/**
 * Reusable Button Component
 * Supports different variants, sizes, and loading states
 */

const Button = ({
  children,
  loading = false,
  disabled = false,
  type = 'button',
  onClick,
  fullWidth = false,
  variant,
  size,
  ...props
}) => {
  return (
    <StyledButton
      type={type}
      disabled={disabled || loading}
      onClick={onClick}
      $fullWidth={fullWidth}
      $variant={variant}
      $size={size}
      {...props}
    >
      {loading && <LoaderIcon />}
      {children}
    </StyledButton>
  );
};

export default Button;