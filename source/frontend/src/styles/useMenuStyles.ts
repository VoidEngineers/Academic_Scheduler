import styled from '@emotion/styled';
import {
  Button,
  IconButton,
  MenuButton as ChakraMenuButton,
  MenuList as ChakraMenuList,
} from '@chakra-ui/react';

export const NotificationButton = styled(IconButton)`
  variant: ghost;
  font-size: lg;
`;

export const AvatarButton = styled(ChakraMenuButton)`
  rounded: full;
  variant: link;
  cursor: pointer;
  min-width: 0;
`;

export const StyledMenuList = styled(ChakraMenuList)`
  z-index: 2;
`;

export const SignInButton = styled(Button)`
  font-size: 0.875rem;
  font-weight: 400;
  variant: link;
`;

export const SignUpButton = styled(Button)<{ primaryColor: string }>`
  display: none;
  @media (min-width: 48em) {
    display: inline-flex;
  }
  font-size: 0.875rem;
  font-weight: 600;
  color: white;
  background-color: ${props => props.primaryColor};
  &:hover {
    background-color: var(--chakra-colors-purple-500);
  }
`;