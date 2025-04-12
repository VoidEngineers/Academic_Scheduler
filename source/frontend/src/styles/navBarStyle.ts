import styled from "@emotion/styled";
import { Box, Flex, Text, IconButton, Stack } from "@chakra-ui/react";

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
  background: ${(props) => props.bgColor};
  color: ${(props) => props.textColor};
  min-height: 64px;
  padding: 0.5rem 1.5rem;
  border-bottom-width: 1px;
  border-style: solid;
  border-color: ${(props) => props.borderColor};
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  position: sticky;
  top: 0;
  z-index: 100;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: all 0.2s ease-in-out;

  &:hover {
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.15);
  }
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
  padding: 0.5rem;
  color: inherit;
  border-radius: 0.375rem;
  transition: all 0.2s ease-in-out;

  &:hover,
  &:focus {
    background: rgba(255, 255, 255, 0.1);
  }
`;

export const LogoContainer = styled(Flex)`
  flex: 1;
  justify-content: center;
  align-items: center;
  gap: 2rem;

  @media (min-width: 48em) {
    justify-content: flex-start;
  }
`;

export const LogoText = styled(Text)<{ primaryColor: string }>`
  font-family: var(--chakra-fonts-heading);
  font-weight: 700;
  font-size: var(--chakra-fontSizes-xl);
  color: ${(props) => props.primaryColor};
  text-decoration: none;
  letter-spacing: -0.025em;
  transition: all 0.2s ease-in-out;

  &:hover,
  &:focus {
    text-decoration: none;
    color: ${(props) => props.primaryColor};
    opacity: 0.9;
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
  gap: 0.5rem;

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

export const SearchButton = styled(IconButton)`
  background: transparent;
  border: none;
  padding: 0.5rem;
  color: inherit;
  border-radius: 0.375rem;
  transition: all 0.2s ease-in-out;

  &:hover,
  &:focus {
    background: rgba(255, 255, 255, 0.1);
  }
`;

export const NotificationButton = styled(IconButton)`
  background: transparent;
  border: none;
  padding: 0.5rem;
  color: inherit;
  border-radius: 0.375rem;
  transition: all 0.2s ease-in-out;

  &:hover,
  &:focus {
    background: rgba(255, 255, 255, 0.1);
  }
`;

export const NavItemsContainer = styled(Stack)`
  flex-direction: row;
  align-items: center;
  gap: 1rem;

  @media (min-width: 48em) {
    gap: 1.5rem;
  }

  @media (max-width: 48em) {
    flex-direction: column;
    align-items: stretch;
    width: 100%;
    gap: 0.5rem;
  }
`;

export const NavLinkContainer = styled(Box)`
  position: relative;
  padding: 0.5rem 1rem;
  cursor: pointer;
  border-radius: 0.375rem;
  transition: all 0.2s ease-in-out;

  &:hover {
    text-decoration: none;
    background-color: rgba(255, 255, 255, 0.1);
  }

  @media (max-width: 48em) {
    padding: 0.75rem 1rem;
    border-radius: 0;
    &:hover {
      background-color: rgba(255, 255, 255, 0.15);
    }
  }
`;

export const NavLinkText = styled(Text)<{ primaryColor: string }>`
  font-weight: 500;
  font-size: 0.95rem;
  transition: all 0.2s ease-in-out;

  &:hover {
    color: ${(props) => props.primaryColor};
    opacity: 0.9;
  }
`;

export const DropdownContainer = styled(Box)`
  position: absolute;
  top: 100%;
  left: 0;
  min-width: 220px;
  z-index: 10;
  margin-top: 0.5rem;
  background-color: #533a7b;

  @media (max-width: 48em) {
    position: relative;
    margin-top: 0;
  }
`;

export const DropdownContent = styled(Stack)<{
  bgColor: string;
  borderColor: string;
}>`
  background: #533a7b;
  border-radius: 0.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  padding: 0.5rem 0;
  border: 1px solid ${(props) => props.borderColor};
  color: white;

  @media (max-width: 48em) {
    box-shadow: none;
    border: none;
    border-left: 1px solid ${(props) => props.borderColor};
    border-radius: 0;
    background: #533a7b;
    margin-left: 1rem;
  }
`;

export const DropdownLink = styled(Box)<{ bgHoverColor: string }>`
  padding: 0.75rem 1.5rem;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  color: black;

  &:hover {
    background-color: ${(props) => props.bgHoverColor};
    color: black;
  }

  @media (max-width: 48em) {
    padding: 0.75rem 1rem;
  }
`;
