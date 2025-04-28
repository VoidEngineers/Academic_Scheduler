import React from "react";
import {
  Avatar,
  Menu,
  MenuItem,
  MenuDivider,
  useColorModeValue,
} from "@chakra-ui/react";
import { BellIcon } from "@chakra-ui/icons";
import { Link as RouterLink } from "react-router-dom";
import {
  NotificationButton,
  AvatarButton,
  StyledMenuList,
  SignUpButton,
} from "../../styles/useMenuStyles";

interface UserMenuProps {
  isLoggedIn: boolean;
  userName: string;
  userAvatar: string;
  primaryColor?: string;
  hoverBgColor?: string;
}

const UserMenu: React.FC<UserMenuProps> = ({
  isLoggedIn,
  userName,
  userAvatar,
  primaryColor,
  hoverBgColor,
}) => {
  // Get color from theme if not provided
  const defaultPrimaryColor = useColorModeValue("blue.600", "blue.200");
  const defaultHoverBgColor = useColorModeValue("gray.50", "gray.700");

  const finalPrimaryColor = primaryColor || defaultPrimaryColor;
  const finalHoverBgColor = hoverBgColor || defaultHoverBgColor;

  if (isLoggedIn) {
    return (
      <>
        <NotificationButton
          aria-label='Notifications'
          icon={<BellIcon />}
          hoverBgColor={finalHoverBgColor}
        />
        <Menu>
          <AvatarButton hoverBgColor={finalHoverBgColor}>
            <Avatar size={"sm"} name={userName} src={userAvatar} />
          </AvatarButton>
          <StyledMenuList hoverBgColor={finalHoverBgColor}>
            <MenuItem as={RouterLink} to='/profile'>
              Profile
            </MenuItem>
            <MenuItem as={RouterLink} to='/settings'>
              Settings
            </MenuItem>
            <MenuDivider />
            <MenuItem as={RouterLink} to='/logout'>
              Sign Out
            </MenuItem>
          </StyledMenuList>
        </Menu>
      </>
    );
  }

  return (
    <>
      {/* <SignInButton
        as={RouterLink}
        to='/login'
        hoverBgColor={finalHoverBgColor}
      >
        Sign In
      </SignInButton> */}
      <SignUpButton
        as={RouterLink}
        to='/register'
        primaryColor={finalPrimaryColor}
        hoverBgColor={finalHoverBgColor}
      >
        Sign Up
      </SignUpButton>
    </>
  );
};

export default UserMenu;
