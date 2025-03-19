import React from 'react';
import {
  Avatar,
  Menu,
  MenuItem,
  MenuDivider,
  useColorModeValue
} from '@chakra-ui/react';
import { BellIcon } from '@chakra-ui/icons';
import { Link as RouterLink } from 'react-router-dom';
import {
  NotificationButton,
  AvatarButton,
  StyledMenuList,
  SignInButton,
  SignUpButton
} from '../../styles/useMenuStyles';

interface UserMenuProps {
  isLoggedIn: boolean;
  userName: string;
  userAvatar: string;
  primaryColor?: string; // Make this optional
}

const UserMenu: React.FC<UserMenuProps> = ({
  isLoggedIn,
  userName,
  userAvatar,
}) => {
  // Get color from theme instead of prop
  const primaryColor = useColorModeValue('purple.600', 'purple.200');
  
  if (isLoggedIn) {
    return (
      <>
        <NotificationButton
          aria-label="Notifications"
          icon={<BellIcon />}
        />
        <Menu>
          <AvatarButton>
            <Avatar
              size={'sm'}
              name={userName}
              src={userAvatar}
            />
          </AvatarButton>
          <StyledMenuList>
            <MenuItem as={RouterLink} to="/profile">Profile</MenuItem>
            <MenuItem as={RouterLink} to="/settings">Settings</MenuItem>
            <MenuDivider />
            <MenuItem as={RouterLink} to="/logout">Sign Out</MenuItem>
          </StyledMenuList>
        </Menu>
      </>
    );
  }

  return (
    <>
      <SignInButton as={RouterLink} to="/login">
        Sign In
      </SignInButton>
      <SignUpButton 
        as={RouterLink} 
        to="/register"
        primaryColor={primaryColor}
      >
        Sign Up
      </SignUpButton>
    </>
  );
};

export default UserMenu;