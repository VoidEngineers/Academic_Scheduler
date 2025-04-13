import styled, { keyframes } from 'styled-components';

// Define the spin animation
const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

// Create the Spinner component
export const Spinner = styled.div`
  border: 4px solid rgba(0, 0, 0, 0.1);
  width: 36px;
  height: 36px;
  border-radius: 50%;
  border-left-color: #4FD1C5;
  animation: ${spin} 1s linear infinite;
  margin-bottom: 16px;
`;

// Loading container for centering the spinner
export const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 80vh;
  flex-direction: column;
`;

// Text that can be displayed below the spinner
export const LoadingText = styled.p`
  color: #4A5568;
  font-size: 16px;
  font-weight: 500;
`;