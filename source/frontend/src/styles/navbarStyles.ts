import styled from 'styled-components';
import { Box, Link, Flex, HStack } from '@chakra-ui/react';

export const NavContainer = styled(Box)`
  position: sticky;
  top: 0;
  z-index: 10;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  border-bottom: 1px solid;
`;

export const NavFlex = styled(Flex)`
  display: flex;
  justify-content: center;
  padding-top: 0.75rem;
  padding-bottom: 0.75rem;
  as: nav;
`;

export const NavLinkContainer = styled(HStack)`
  align-items: center;
  spacing: 8px;
`;

export const NavLink = styled(Link)`
  padding: 0.5rem 1rem;
  font-weight: 500;
  transition: all 0.2s;
  border-bottom: 2px solid transparent;
  
  &:hover {
    text-decoration: none;
    border-bottom: 2px solid #0056b3;
  }
  
  &.active {
    border-bottom: 2px solid #0056b3;
    font-weight: 600;
  }
`;