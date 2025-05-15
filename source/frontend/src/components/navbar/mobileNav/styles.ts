import styled from '@emotion/styled';
import { Box, Flex, Icon, Stack, Input } from '@chakra-ui/react';

// Main navigation container
export const MainNav = styled(Stack)<{ colorMode: string }>`
  padding: 1rem;
  display: flex;
  flex-direction: column;
  background-color: ${props => props.colorMode === 'light' ? 'white' : 'gray.800'};
  border-top: 1px solid;
  border-color: ${props => props.colorMode === 'light' ? 'gray.200' : 'gray.700'};
`;

// Navigation item wrapper
export const NavItemStack = styled(Stack)`
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
`;

// Navigation item flex container
export const NavItemFlex = styled(Flex)`
  align-items: center;
  justify-content: space-between;
  padding: 0.5rem 0;
  text-decoration: none;
  &:hover {
    text-decoration: none;
  }
`;

// Navigation item text
export const NavItemText = styled(Box)<{ colorMode: string }>`
  font-weight: 600;
  color: ${props => props.colorMode === 'light' ? 'gray.600' : 'gray.200'};
`;

// Dropdown icon
export const NavItemIcon = styled(Icon)<{ isOpen: boolean }>`
  transform: ${props => props.isOpen ? 'rotate(180deg)' : 'rotate(0)'};
  transition: transform 0.2s;
  margin-left: 1rem;
`;

// Children container
export const ChildrenStack = styled(Stack)<{ colorMode: string }>`
  align-items: flex-start;
  padding-left: 1rem;
  border-left: 1px solid;
  border-color: ${props => props.colorMode === 'light' ? 'gray.200' : 'gray.700'};
  margin-left: 1rem !important;
`;

// Search box container
export const SearchBox = styled(Box)`
  margin-top: 1rem;
`;

// Search input
export const SearchInput = styled(Input)<{ colorMode: string }>`
  background-color: ${props => props.colorMode === 'light' ? 'gray.100' : 'gray.700'};
  border: none;
  &::placeholder {
    color: ${props => props.colorMode === 'light' ? 'gray.500' : 'gray.400'};
  }
  &:focus {
    border-color: ${props => props.colorMode === 'light' ? 'purple.500' : 'purple.300'};
    box-shadow: 0 0 0 1px ${props => props.colorMode === 'light' ? 'purple.500' : 'purple.300'};
  }
`;