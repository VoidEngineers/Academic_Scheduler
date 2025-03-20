import styled from '@emotion/styled';
import { Box, Flex, HStack, Link } from '@chakra-ui/react';

export const MainContainer = styled(Box)`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

export const ContentWrapper = styled(Box)`
  flex: 1;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 1.5rem 1rem;
`;

export const FooterContainer = styled(Box)<{ bgColor: string; borderColor: string }>`
  padding: 2rem 1rem;
  background-color: ${props => props.bgColor};
  border-top-width: 1px;
  border-style: solid;
  border-color: ${props => props.borderColor};
`;

export const FooterContent = styled(Flex)`
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  flex-direction: column;
  align-items: center;
  
  @media (min-width: 48em) {
    flex-direction: row;
    justify-content: space-between;
  }
`;

export const FooterText = styled(Box)<{ textColor: string }>`
  color: ${props => props.textColor};
  text-align: center;
  font-size: 0.875rem;
  margin-bottom: 1rem;
  
  @media (min-width: 48em) {
    margin-bottom: 0;
  }
`;

export const FooterLinks = styled(Flex)`
  gap: 1.5rem;
`;

export const FooterLink = styled(Box)<{ primaryColor: string }>`
  color: ${props => props.primaryColor};
  font-size: 0.875rem;
  cursor: pointer;
  
  &:hover {
    text-decoration: underline;
  }
`;

export const SocialIconsContainer = styled(HStack)`
  spacing: 4;
`;

export const SocialIcon = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  width: 36px;
  height: 36px;
  transition: all 0.2s;
  
  &:hover {
    transform: translateY(-2px);
    opacity: 0.8;
  }
`;