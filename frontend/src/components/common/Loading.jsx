
import React from 'react';
import { Loader2 } from 'lucide-react';
import styled, { keyframes } from 'styled-components';

const LoadingContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
`;

/**
 * Loading Component
 * Shows a centered loading spinner
 */


// In-file styled-components
const spin = keyframes`
  100% { transform: rotate(360deg); }
`;
const Spinner = styled(Loader2)`
  color: #00796b;
  animation: ${spin} 1s linear infinite;
  display: block;
  margin: 0 auto;
`;
const LoadingText = styled.p`
  color: #666;
  font-weight: ${({ $bold }) => ($bold ? 500 : 400)};
  margin: 0;
`;
const Centered = styled.div`
  text-align: center;
`;
const FullScreenOverlay = styled(LoadingContainer)`
  position: fixed;
  inset: 0;
  background: rgba(255,255,255,0.9);
  z-index: 50;
`;

const Loading = ({ text = 'Loading...', fullScreen = false }) => {
  if (fullScreen) {
    return (
      <FullScreenOverlay>
        <Centered>
          <Spinner size={48} />
          <LoadingText $bold>{text}</LoadingText>
        </Centered>
      </FullScreenOverlay>
    );
  }
  return (
    <LoadingContainer style={{ padding: '48px 0' }}>
      <Centered>
        <Spinner size={40} />
        <LoadingText>{text}</LoadingText>
      </Centered>
    </LoadingContainer>
  );
};

export default Loading;