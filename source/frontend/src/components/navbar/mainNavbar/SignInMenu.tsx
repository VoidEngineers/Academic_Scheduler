import React from 'react';
import { Box, Button, Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { signInMenuButtonStyles, menuListStyles, menuItemStyles } from './styles';

const SignInMenu: React.FC = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const navigate = useNavigate();

  return (
    <Menu
      isOpen={isOpen}
      gutter={0}
      onOpen={() => setIsOpen(true)}
      onClose={() => setIsOpen(false)}
    >
      <MenuButton
        as={Button}
        {...signInMenuButtonStyles}
        onMouseEnter={() => setIsOpen(true)}
        onMouseLeave={() => setIsOpen(false)}
      >
        <Box>Sign in</Box>
      </MenuButton>
      <MenuList
        onMouseEnter={() => setIsOpen(true)}
        onMouseLeave={() => setIsOpen(false)}
        {...menuListStyles}
      >
        <MenuItem
          onClick={() => navigate('/student-login')}
          {...menuItemStyles}
        >
          Student
        </MenuItem>
        <MenuItem
          onClick={() => navigate('/Staff-login')}
          {...menuItemStyles}
        >
          Staff
        </MenuItem>
        <MenuItem
          onClick={() => navigate('/admin-login')}
          {...menuItemStyles}
        >
          Admin
        </MenuItem>
      </MenuList>
    </Menu>
  );
};

export default SignInMenu;