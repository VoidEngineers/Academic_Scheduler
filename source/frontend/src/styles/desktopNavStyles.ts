import styled from '@emotion/styled';
import { Box, Stack, Link, Text, Flex, PopoverContent } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';

export const NavItemBox = styled(Box)`
  position: relative;
`;

export const NavItemLink = styled(Link)`
  padding: 0.5rem;
  font-size: 0.875rem;
  font-weight: 500;
  transition: color 0.2s;
  text-decoration: none;
  
  &:hover {
    text-decoration: none;
  }
`;

export const SubNavPopover = styled(PopoverContent)`
  border: 0;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
  padding: 1rem;
  border-radius: 0.75rem;
  min-width: 18rem;
`;

export const SubNavStack = styled(Stack)`
  direction: row;
  align-items: center;
`;

export const SubNavLink = styled(RouterLink)`
  display: block;
  padding: 0.5rem;
  border-radius: 0.375rem;
  transition: background-color 0.2s;
  
  &:hover {
    text-decoration: none;
  }
`;

export const SubNavContent = styled(Box)`
  /* Styles for the content part of the sub nav */
`;

export const SubNavLabel = styled(Text)`
  transition: all 0.3s ease;
  font-weight: 500;
  
  ${SubNavLink}:hover & {
    color: var(--chakra-colors-purple-400);
  }
`;

export const SubNavDescription = styled(Text)`
  font-size: 0.875rem;
`;

export const SubNavIconContainer = styled(Flex)`
  transition: all 0.3s ease;
  transform: translateX(-10px);
  opacity: 0;
  justify-content: flex-end;
  align-items: center;
  flex: 1;
  
  ${SubNavLink}:hover & {
    opacity: 1;
    transform: translateX(0);
  }
`;

export const NavItemsContainer = styled(Stack)`
  direction: row;
  spacing: 4;
`;