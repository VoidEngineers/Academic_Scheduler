import styled from '@emotion/styled';
import { 
  Box, 
  Container, 
  Heading, 
  Flex, 
  Text, 
  Divider,
  SimpleGrid
} from '@chakra-ui/react';
import { theme } from '@chakra-ui/react';

export const DashboardContainer = styled(Container)`
  padding-top: 1.25rem;
  padding-bottom: 1.25rem;
  max-width: container.xl;
`;

export const DashboardHeading = styled(Heading)`
  margin-bottom: 1.5rem;
`;

export const WidgetGrid = styled(SimpleGrid)`
  margin-bottom: 1.5rem;
  grid-template-columns: 1fr;
  
  @media (min-width: ${theme.breakpoints.md}) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  gap: 1.5rem;
`;

export const SectionContainer = styled(Box)`
  margin-bottom: 1.5rem;
`;

export const SectionDivider = styled(Flex)`
  align-items: center;
  margin-bottom: 1rem;
`;

export const DividerLine = styled(Divider)`
  flex: 1;
`;

export const SectionTitle = styled(Text)`
  padding-left: 0.75rem;
  padding-right: 0.75rem;
  font-weight: 500;
  color: gray.500;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  font-size: 0.875rem;
`;

export const AnalyticsContainer = styled(Box)`
  margin-top: 2rem;
  padding: 1.25rem;
  background-color: white;
  border-radius: 0.375rem;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
  border-top: 4px solid;
  border-color: purple.500;
`;

export const AnalyticsHeading = styled(Heading)`
  margin-bottom: 1rem;
  font-size: 1.5rem;
`;