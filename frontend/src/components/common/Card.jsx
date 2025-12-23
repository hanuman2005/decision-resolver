import React from 'react';
import styled from "styled-components";

const StyledCard = styled.div`
  background: rgba(31, 73, 89, 0.4);
  backdrop-filter: blur(20px);
  border-radius: 16px;
  box-shadow: 0 8px 32px rgba(1, 20, 37, 0.3);
  padding: 1rem;
  margin: 1rem auto;
  transition: all 0.3s ease;
  border: 2px solid rgba(92, 124, 137, 0.5);
  width: 100%;
  max-width: 800px;
  box-sizing: border-box;
  
  @media (min-width: 640px) {
    padding: 1.5rem;
  }

  ${(props) => props.$hover ? `
    cursor: pointer;
    &:hover {
      background: rgba(31, 73, 89, 0.6);
      box-shadow: 0 12px 40px rgba(31, 73, 89, 0.4);
      transform: translateY(-6px);
      border-color: rgba(255, 255, 255, 0.3);
    }
  ` : ''}
`;

/**
 * Reusable Card Component
 * Container component with consistent styling
 */

const Card = ({ children, onClick, hover, as, ...props }) => {
  return (
    <StyledCard as={as} onClick={onClick} $hover={hover} {...props}>
      {children}
    </StyledCard>
  );
};

export default Card;