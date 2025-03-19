import styled from '@emotion/styled';
import {
  Box,
  Flex,
  Text,
  IconButton,
  Stack
} from '@chakra-ui/react';

export const NavbarContainer = styled(Box)`
  width: 100%;
  position: relative;
  z-index: 10;
`;

export const NavbarFlex = styled(Flex)<{
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
  justify-content: space-between;
  flex-wrap: wrap;
  position: sticky;
  top: 0;
  z-index: 100;
  box-shadow: rgba(0, 0, 0, 0.05) 0px 1px 2px 0px;
  transition: all 0.3s ease;
`;

export const MobileMenuFlex = styled(Flex)`
  display: flex;
  align-items: center;
  
  @media (min-width: 48em) {
    display: none;
  }
`;

export const NavToggleButton = styled(IconButton)`
  background: transparent;
  border: none;
  padding: 0;
  color: inherit;
  
  &:hover, &:focus {
    background: rgba(0, 0, 0, 0.05);
  }
`;

export const LogoContainer = styled(Flex)`
  flex: 1;
  justify-content: center;
  align-items: center;
  
  @media (min-width: 48em) {
    justify-content: flex-start;
  }
`;

export const LogoText = styled(Text)<{ primaryColor: string }>`
  font-family: var(--chakra-fonts-heading);
  font-weight: bold;
  font-size: var(--chakra-fontSizes-xl);
  color: ${props => props.primaryColor};
  text-decoration: none;
  
  &:hover, &:focus {
    text-decoration: none;
  }
`;

export const DesktopNavContainer = styled(Flex)`
  display: none;
  margin-left: 2rem;
  align-items: center;
  
  @media (min-width: 48em) {
    display: flex;
  }
`;

export const RightSection = styled(Stack)`
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
  spacing: 6;
  
  @media (max-width: 48em) {
    width: 100%;
    margin-top: 1rem;
    justify-content: center;
  }
  
  @media (min-width: 48em) {
    width: auto;
    margin-top: 0;
  }
`;

export const NavItemsContainer = styled(Stack)`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  
  @media (min-width: 48em) {
    spacing: 4;
  }
  
  @media (max-width: 48em) {
    flex-direction: column;
    align-items: stretch;
    width: 100%;
    spacing: 2;
  }
`;

export const NavLinkContainer = styled(Box)`
  position: relative;
  padding: 0.5rem 1rem;
  cursor: pointer;
  
  &:hover {
    text-decoration: none;
    background-color: rgba(0, 0, 0, 0.04);
    border-radius: 0.375rem;
  }
  
  @media (max-width: 48em) {
    padding: 1rem;
    border-radius: 0;
    &:hover {
      background-color: rgba(0, 0, 0, 0.08);
    }
  }
`;

export const NavLinkText = styled(Text)<{ primaryColor: string }>`
  font-weight: 500;
  transition: color 0.3s ease;
  
  &:hover {
    color: ${props => props.primaryColor};
  }
`;

export const DropdownContainer = styled(Box)`
  position: absolute;
  top: 100%;
  left: 0;
  min-width: 200px;
  z-index: 10;
  
  @media (max-width: 48em) {
    position: relative;
    margin-top: 0.5rem;
  }
`;

export const DropdownContent = styled(Stack)<{ bgColor: string; borderColor: string }>`
  background: ${props => props.bgColor};
  border-radius: 0.375rem;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
  padding: 0.5rem 0;
  border: 1px solid ${props => props.borderColor};
  
  @media (max-width: 48em) {
    box-shadow: none;
    border: none;
    border-left: 1px solid ${props => props.borderColor};
    border-radius: 0;
    background: transparent;
    margin-left: 1rem;
  }
`;

export const DropdownLink = styled(Box)<{ bgHoverColor: string }>`
  padding: 0.5rem 1.5rem;
  cursor: pointer;
  
  &:hover {
    background-color: ${props => props.bgHoverColor};
  }
  
  @media (max-width: 48em) {
    padding: 0.75rem 1rem;
  }
`;