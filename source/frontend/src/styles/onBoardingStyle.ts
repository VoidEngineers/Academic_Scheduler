import styled from '@emotion/styled';
import {
  Box,
  Container,
  Heading,
  Text,
  VStack,
  HStack,
  Button,
  Icon as ChakraIcon,
  BoxProps,
  ContainerProps,
  HeadingProps,
  TextProps,
  ButtonProps
} from '@chakra-ui/react';

// Interface for consistent styling
interface ThemeProps {
  bgColor?: string;
  accentColor?: string;
  textColor?: string;
}

// Full-height container for the onboarding experience
export const OnboardingContainer = styled(Box)<BoxProps & ThemeProps>`
  background-color: ${props => props.bgColor};
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem 1rem;
`;

// Container for the content
export const ContentContainer = styled(Container)<ContainerProps>`
  max-width: 1200px;
  width: 100%;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  border-radius: 1rem;
  overflow: hidden;
  background-color: white;
`;

// Container for steps
export const StepsContainer = styled(VStack)`
  width: 100%;
  padding: 2.5rem;
  
  @media (max-width: 48em) {
    padding: 1.5rem;
  }
`;

// Box for content
export const ContentBox = styled(Box)`
  width: 100%;
  padding: 2.5rem 0;
  min-height: 400px;
`;

// Navigation container
export const NavigationContainer = styled(HStack)`
  width: 100%;
  justify-content: space-between;
  margin-top: 3rem;
  padding-top: 1.5rem;
  border-top: 1px solid var(--chakra-colors-gray-100);
`;

// Step heading
export const StepHeading = styled(Heading)<HeadingProps & ThemeProps>`
  font-size: 2.25rem;
  font-weight: 700;
  margin-bottom: 1rem;
  color: ${props => props.textColor || 'var(--chakra-colors-gray-800)'};
  
  @media (max-width: 48em) {
    font-size: 1.75rem;
  }
`;

// Step description
export const StepDescription = styled(Text)<TextProps & ThemeProps>`
  font-size: 1.125rem;
  margin-bottom: 2rem;
  max-width: 36rem;
  color: ${props => props.textColor || 'var(--chakra-colors-gray-600)'};
  line-height: 1.6;
  
  @media (max-width: 48em) {
    font-size: 1rem;
  }
`;

// Card grid
export const CardGrid = styled(Box)<{ columns: { base: number; md: number } }>`
  display: grid;
  grid-template-columns: repeat(${props => props.columns.base}, 1fr);
  gap: 1.5rem;
  width: 100%;
  
  @media (min-width: 48em) {
    grid-template-columns: repeat(${props => props.columns.md}, 1fr);
    gap: 2rem;
  }
`;

// Step card
export const StepCard = styled(Box)<BoxProps & ThemeProps>`
  padding: 2rem;
  border-radius: 0.75rem;
  background-color: ${props => props.bgColor || 'white'};
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  cursor: pointer;
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.08);
  }
`;

// Card content
export const CardContent = styled(VStack)`
  align-items: flex-start;
  gap: 1rem;
`;

// Feature icon
export const FeatureIcon = styled(ChakraIcon)<{ accentColor: string }>`
  font-size: 2.5rem;
  color: ${props => props.accentColor};
  background-color: ${props => `${props.accentColor}10`};
  padding: 0.75rem;
  border-radius: 0.5rem;
`;

// Card heading
export const CardHeading = styled(Heading)<HeadingProps & ThemeProps>`
  font-size: 1.25rem;
  font-weight: 600;
  margin-top: 0.5rem;
  color: ${props => props.textColor || 'var(--chakra-colors-gray-800)'};
`;

// Card description
export const CardDescription = styled(Text)<TextProps & ThemeProps>`
  font-size: 0.95rem;
  color: ${props => props.textColor || 'var(--chakra-colors-gray-600)'};
  line-height: 1.5;
`;

// Completion container
export const CompletionContainer = styled(VStack)`
  align-items: center;
  text-align: center;
  padding: 3rem 2rem;
  gap: 1.5rem;
  max-width: 30rem;
  margin: 0 auto;
`;

// Completion icon
export const CompletionIcon = styled(ChakraIcon)<{ accentColor: string }>`
  font-size: 4.5rem;
  color: ${props => props.accentColor};
  background-color: ${props => `${props.accentColor}15`};
  padding: 1rem;
  border-radius: 50%;
  margin-bottom: 1rem;
`;

// Next button
export const NextButton = styled(Button)<ButtonProps & ThemeProps>`
  color: white;
  background-color: ${props => props.accentColor || 'var(--chakra-colors-purple-500)'};
  font-weight: 600;
  padding-left: 2rem;
  padding-right: 2rem;
  height: 48px;
  border-radius: 24px;
  box-shadow: 0 4px 10px ${props => props.accentColor ? `${props.accentColor}40` : 'rgba(128, 90, 213, 0.25)'};
  
  &:hover {
    background-color: ${props => props.accentColor ? `${props.accentColor}90` : 'var(--chakra-colors-purple-600)'};
    transform: translateY(-2px);
    box-shadow: 0 6px 12px ${props => props.accentColor ? `${props.accentColor}50` : 'rgba(128, 90, 213, 0.35)'};
  }
  
  &:active {
    transform: translateY(0);
    box-shadow: 0 2px 6px ${props => props.accentColor ? `${props.accentColor}40` : 'rgba(128, 90, 213, 0.25)'};
  }
`;

// Back button
export const BackButton = styled(Button)<ButtonProps & ThemeProps>`
  color: ${props => props.textColor || 'var(--chakra-colors-gray-600)'};
  background: transparent;
  border: 1px solid ${props => props.textColor || 'var(--chakra-colors-gray-200)'};
  font-weight: 600;
  padding-left: 2rem;
  padding-right: 2rem;
  height: 48px;
  border-radius: 24px;
  
  &:hover:not(:disabled) {
    background-color: ${props => props.textColor ? `${props.textColor}05` : 'var(--chakra-colors-gray-50)'};
  }
  
  &:disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }
`;

// Progress section
export const ProgressSection = styled(Box)`
  width: 100%;
  margin-bottom: 2.5rem;
`;

// Step content container
export const StepContentContainer = styled(Box)`
  animation: fadeIn 0.5s ease-in-out;
  
  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;