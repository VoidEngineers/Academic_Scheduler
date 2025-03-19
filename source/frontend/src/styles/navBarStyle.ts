import styled from '@emotion/styled';
import {
  Box as ChakraBox,
  Flex as ChakraFlex,
  Text as ChakraText,
  IconButton as ChakraIconButton,
  Stack as ChakraStack
} from '@chakra-ui/react';

export const NavbarContainer = styled(ChakraBox)`
  width: 100%;
`;

export const NavbarFlex = styled(ChakraFlex)<{
  bgColor: string;
  textColor: string;
  borderColor: string;
}>`
  background: ${props => props.bgColor};
  color: ${props => props.textColor};
  min-height: 60px;
  padding: 0.5rem 1rem;
  border-bottom-width: 1px;
  border-style: solid;
  border-color: ${props => props.borderColor};
  align-items: center;
  position: sticky;
  top: 0;
  z-index: 100;
  box-shadow: var(--chakra-shadows-sm);
`;

export const MobileMenuFlex = styled(ChakraFlex)`
  flex: 1;
  margin-left: -0.5rem;
  @media (min-width: 48em) {
    display: none;
  }
`;

export const NavToggleButton = styled(ChakraIconButton)`
  variant: ghost;
`;

export const LogoContainer = styled(ChakraFlex)`
  flex: 1;
  justify-content: center;
  @media (min-width: 48em) {
    justify-content: flex-start;
  }
`;

export const LogoText = styled(ChakraText)<{ primaryColor: string }>`
  font-family: var(--chakra-fonts-heading);
  font-weight: bold;
  font-size: var(--chakra-fontSizes-xl);
  color: ${props => props.primaryColor};
  text-align: center;
  @media (min-width: 48em) {
    text-align: left;
  }
`;

export const DesktopNavContainer = styled(ChakraFlex)`
  display: none;
  margin-left: 2.5rem;
  @media (min-width: 48em) {
    display: flex;
  }
`;

export const RightSection = styled(ChakraStack)`
  flex: 1;
  justify-content: flex-end;
  direction: row;
  spacing: 6;
  align-items: center;
`;