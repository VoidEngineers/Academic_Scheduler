import styled from "@emotion/styled";
import {
  Button,
  IconButton,
  MenuButton as ChakraMenuButton,
  MenuList as ChakraMenuList,
} from "@chakra-ui/react";

export const NotificationButton = styled(IconButton)<{ hoverBgColor: string }>`
  variant: ghost;
  font-size: lg;
  padding: 0.5rem;
  border-radius: 0.375rem;
  transition: all 0.2s ease-in-out;

  &:hover,
  &:focus {
    background-color: ${(props) => props.hoverBgColor};
  }
`;

export const AvatarButton = styled(ChakraMenuButton)<{ hoverBgColor: string }>`
  rounded: full;
  variant: link;
  cursor: pointer;
  min-width: 0;
  padding: 0.25rem;
  transition: all 0.2s ease-in-out;

  &:hover,
  &:focus {
    background-color: ${(props) => props.hoverBgColor};
  }
`;

export const StyledMenuList = styled(ChakraMenuList)<{ hoverBgColor: string }>`
  z-index: 2;
  border-radius: 0.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  padding: 0.5rem 0;
  background: white;
  color: black;

  .chakra-menu__menuitem {
    padding: 0.75rem 1.5rem;
    transition: all 0.2s ease-in-out;
    color: black;

    &:hover {
      background-color: ${(props) => props.hoverBgColor};
      color: white;
    }
  }
`;

export const SignInButton = styled(Button)<{ hoverBgColor: string }>`
  font-size: 0.875rem;
  font-weight: 500;
  variant: solid;
  padding: 0.5rem 1rem;
  border-radius: 0.375rem;
  transition: all 0.2s ease-in-out;
  background: white;
  color: black;

  &:hover,
  &:focus {
    background-color: ${(props) => props.hoverBgColor};
    color: white;
  }
`;

export const SignUpButton = styled(Button)<{
  primaryColor: string;
  hoverBgColor: string;
}>`
  display: none;
  @media (min-width: 48em) {
    display: inline-flex;
  }
  font-size: 0.875rem;
  font-weight: 600;
  color: black;
  background-color: white;
  padding: 0.5rem 1.25rem;
  border-radius: 0.375rem;
  transition: all 0.2s ease-in-out;

  &:hover,
  &:focus {
    background-color: ${(props) => props.hoverBgColor};
    color: white;
    transform: translateY(-1px);
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }
`;
