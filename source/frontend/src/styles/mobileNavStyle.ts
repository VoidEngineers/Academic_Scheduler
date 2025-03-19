import styled from '@emotion/styled';
import {
  Stack,
  Flex,
  Text,
  Icon,
  Box,
  Input
} from '@chakra-ui/react';

export const NavItemStack = styled(Stack)`
  spacing: 4;
`;

export const NavItemFlex = styled(Flex)`
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
  justify-content: space-between;
  align-items: center;
  &:hover {
    text-decoration: none;
  }
`;

export const NavItemText = styled(Text)<{ colorMode: string }>`
  font-weight: 600;
  color: ${props => props.colorMode === 'light' ? 'var(--chakra-colors-gray-600)' : 'var(--chakra-colors-gray-200)'};
`;

export const NavItemIcon = styled(Icon)<{ isOpen: boolean }>`
  transition: all 0.25s ease-in-out;
  transform: ${props => props.isOpen ? 'rotate(180deg)' : ''};
  width: 1.5rem;
  height: 1.5rem;
`;

export const ChildrenStack = styled(Stack)<{ colorMode: string }>`
  margin-top: 0.5rem;
  padding-left: 1rem;
  border-left-width: 1px;
  border-style: solid;
  border-color: ${props => props.colorMode === 'light' ? 'var(--chakra-colors-gray-200)' : 'var(--chakra-colors-gray-700)'};
  align-items: flex-start;
`;

export const MainNav = styled(Stack)<{ colorMode: string }>`
  background: ${props => props.colorMode === 'light' ? 'white' : 'var(--chakra-colors-gray-800)'};
  padding: 1rem;
  @media (min-width: 48em) {
    display: none;
  }
`;

export const SearchBox = styled(Box)`
  padding-top: 1rem;
`;

export const SearchInput = styled(Input)<{ colorMode: string }>`
  border-radius: full;
  background: ${props => props.colorMode === 'light' ? 'var(--chakra-colors-gray-50)' : 'var(--chakra-colors-gray-700)'};
`;