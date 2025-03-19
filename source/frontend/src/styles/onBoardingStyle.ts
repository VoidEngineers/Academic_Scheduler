import styled from '@emotion/styled';
import {
  Box,
  Container,
  Heading,
  Text,
  VStack,
  HStack,
  Button,
  Icon as ChakraIcon
} from '@chakra-ui/react';

export const OnboardingContainer = styled(Box)<{ bgColor: string }>`
  background-color: ${props => props.bgColor};
  padding-top: 3rem;
  padding-bottom: 3rem;
`;

export const ContentContainer = styled(Container)`
  max-width: container.lg;
`;

export const StepsContainer = styled(VStack)`
  spacing: 10;
  width: 100%;
`;

export const ContentBox = styled(Box)`
  width: 100%;
  padding-top: 2rem;
  padding-bottom: 2rem;
`;

export const NavigationContainer = styled(HStack)`
  width: 100%;
  justify-content: space-between;
  margin-top: 2rem;
`;

export const StepHeading = styled(Heading)`
  font-size: 1.875rem;
  margin-bottom: 1rem;
`;

export const StepDescription = styled(Text)`
  margin-bottom: 1.5rem;
`;

export const CardGrid = styled(Box)<{ columns: { base: number; md: number } }>`
  display: grid;
  grid-template-columns: repeat(${props => props.columns.base}, 1fr);
  gap: 2rem;
  width: 100%;
  
  @media (min-width: 48em) {
    grid-template-columns: repeat(${props => props.columns.md}, 1fr);
  }
`;

export const StepCard = styled(Box)<{ bgColor: string }>`
  padding: 1.5rem;
  border-radius: 0.375rem;
  background-color: ${props => props.bgColor};
  box-shadow: var(--chakra-shadows-md);
`;

export const CardContent = styled(VStack)`
  spacing: 1rem;
  align-items: flex-start;
`;

export const FeatureIcon = styled(ChakraIcon)<{ accentColor: string }>`
  font-size: 2rem;
  color: ${props => props.accentColor};
`;

export const CardHeading = styled(Heading)`
  font-size: 1.25rem;
  margin-top: 0.5rem;
`;

export const CardDescription = styled(Text)`
  font-size: 1rem;
`;

export const CompletionContainer = styled(VStack)`
  spacing: 1.5rem;
  align-items: center;
  text-align: center;
  padding: 2rem;
`;

export const CompletionIcon = styled(ChakraIcon)<{ accentColor: string }>`
  font-size: 4rem;
  color: ${props => props.accentColor};
  margin-bottom: 1rem;
`;

export const NextButton = styled(Button)`
  color: white;
  background-color: var(--chakra-colors-purple-500);
  &:hover {
    background-color: var(--chakra-colors-purple-600);
  }
`;

export const BackButton = styled(Button)`
  variant: outline;
`;