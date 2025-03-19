import styled from '@emotion/styled';
import { Box, Heading, Text, Button } from '@chakra-ui/react';

export const NotFoundContainer = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 70vh;
  padding: 2rem;
  text-align: center;
`;

export const ErrorCode = styled(Heading)`
  font-size: 8rem;
  font-weight: 700;
  line-height: 1;
  margin-bottom: 1rem;
  
  @media (max-width: 48em) {
    font-size: 6rem;
  }
`;

export const ErrorTitle = styled(Heading)`
  font-size: 2.5rem;
  margin-bottom: 1.5rem;
  
  @media (max-width: 48em) {
    font-size: 2rem;
  }
`;

export const ErrorMessage = styled(Text)`
  font-size: 1.25rem;
  max-width: 500px;
  margin: 0 auto 2.5rem;
  
  @media (max-width: 48em) {
    font-size: 1rem;
  }
`;

export const ButtonContainer = styled(Box)`
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  justify-content: center;
`;

export const HomeButton = styled(Button)`
  min-width: 150px;
`;

export const BackButton = styled(Button)`
  min-width: 150px;
`;

export const IllustrationContainer = styled(Box)`
  margin-bottom: 2.5rem;
  max-width: 100%;
  height: auto;
  
  svg {
    width: 100%;
    max-width: 300px;
    height: auto;
  }
`;