import styled from '@emotion/styled';
import { Box, Flex, IconButton, Text } from '@chakra-ui/react';

// Navbar container
export const NavbarContainer = styled(Box)`
  width: 100%;
  position: sticky;
  top: 0;
  z-index: 1000;
`;

// Main navbar flex container
export const NavbarFlex = styled(Flex)<{
  bgColor: string;
  textColor: string;
  borderColor: string;
}>`
  width: 100%;
  background-color: ${props => props.bgColor};
  color: ${props => props.textColor};
  border-bottom: 1px solid ${props => props.borderColor};
  height: 60px;
  align-items: center;
  justify-content: space-between;
  padding: 0 1rem;
`;

// Left section for mobile menu
export const MobileMenuFlex = styled(Flex)`
  display: flex;
  @media screen and (min-width: 769px) {
    display: none;
  }
`;

// Mobile menu toggle button
export const NavToggleButton = styled(IconButton)`
  color: white;
  _hover: {
    background: 'transparent',
  }
`;

// Logo container
export const LogoContainer = styled(Flex)`
  flex: 1;
  align-items: center;
  justify-content: flex-start;
`;

// Logo text
export const LogoText = styled(Text)<{ primaryColor: string }>`
  font-weight: bold;
  font-size: 1.5rem;
  white-space: nowrap;
  margin-right: 2rem;
  color: white;
  text-decoration: none;
  
  &:hover {
    text-decoration: none;
    color: ${props => props.primaryColor};
  }
`;

// Desktop navigation container
export const DesktopNavContainer = styled(Flex)`
  display: none;
  @media screen and (min-width: 769px) {
    display: flex;
  }
`;

// Right section of navbar
export const RightSection = styled(Flex)`
  align-items: center;
  justify-content: flex-end;
  gap: 1rem;
`;

// Theme colors hook for navbar
export const useNavbarColors = () => {
  return {
    bgColor: useColorModeValue('purple.500', 'gray'),
    textColor: useColorModeValue('gray.800', 'white'),
    borderColor: useColorModeValue('gray.200', 'gray.700'),
    primaryColor: useColorModeValue('purple.600', 'purple.200'),
  };
};

// Styles for sign-in menu button
export const signInMenuButtonStyles = {
  colorScheme: "purple",
  variant: "solid",
  size: "md",
  width: "100px",
  height: "40px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  fontWeight: "normal",
  _hover: { bg: 'purple.600' },
};

// Styles for menu list
export const menuListStyles = {
  bg: "white",
  borderRadius: "lg",
  border: "1px solid",
  borderColor: "gray.100",
  boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
  p: 0,
  mt: 1,
  minW: "140px",
  overflow: "hidden",
};

// Styles for menu items
export const menuItemStyles = {
  _hover: { bg: 'gray.50' },
  py: 3,
  px: 4,
};

function useColorModeValue(_arg0: string, _arg1: string) {
    throw new Error('Function not implemented.');
}
