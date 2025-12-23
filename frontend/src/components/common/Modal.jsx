
import { X } from 'lucide-react';
import React, { useEffect } from 'react';
import styled from "styled-components";

const ModalBackdrop = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(1, 20, 37, 0.6);
  backdrop-filter: blur(4px);
  z-index: 50;
`;

const ModalContainer = styled.div`
  background: rgba(255, 255, 255, 0.98);
  border-radius: 16px;
  box-shadow: 0 20px 60px rgba(1, 20, 37, 0.3);
  padding: 2rem;
  max-width: 600px;
  margin: 5vh auto;
  position: relative;
  z-index: 51;
  border: 2px solid rgba(92, 124, 137, 0.2);
`;
const Header = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1rem 0;
    border-bottom: 2px solid rgba(92, 124, 137, 0.2);
  `;
  const Title = styled.h2`
    font-size: 1.25rem;
    font-weight: bold;
    margin: 0;
    color: #242424;
  `;
  const CloseButton = styled.button`
    color: #5c7c89;
    background: rgba(92, 124, 137, 0.08);
    border: none;
    cursor: pointer;
    display: flex;
    align-items: center;
    padding: 0.5rem;
    border-radius: 8px;
    transition: all 0.2s ease;
    
    &:hover {
      background: rgba(92, 124, 137, 0.15);
      color: #1f4959;
    }
  `;
  const Content = styled.div`
    padding: 1rem 0;
  `;


/**
 * Reusable Modal Component
 * Full-featured modal with backdrop and animations
 */

const Modal = ({
  isOpen,
  onClose,
  title,
  children,
  showCloseButton = true,
}) => {
  // Handle escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;
  
  return (
    <>
      <ModalBackdrop onClick={onClose} />
      <ModalContainer onClick={e => e.stopPropagation()}>
        <Header>
          <Title>{title}</Title>
          {showCloseButton && (
            <CloseButton onClick={onClose} aria-label="Close modal">
              <X style={{ width: 24, height: 24 }} />
            </CloseButton>
          )}
        </Header>
        <Content>{children}</Content>
      </ModalContainer>
    </>
  );
};

export default Modal;