import {
  CloseIcon,
  HamburgerIcon,
} from '@chakra-ui/icons';
import {
  Box,
  Button,
  Collapse,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  useColorModeValue,
  useDisclosure
} from '@chakra-ui/react';
import React from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';



// Import styled components
import {
  DesktopNavContainer,
  LogoContainer,
  LogoText,
  MobileMenuFlex,
  NavbarContainer,
  NavbarFlex,
  NavToggleButton,
  RightSection
} from '../../styles/navBarStyle';

// Import subcomponents
import SearchBar from '../../components/serachBar/searchBar';
import DesktopNav from './desktopNav/DeskopNavItem';
import MobileNav from './mobileNav/mobileNav';
import UserMenu from './userMenu';

// Import types and data
import { NAV_ITEMS } from './navData';
import { NavbarProps } from './types';

const Navbar: React.FC<NavbarProps> = ({
  logo = "Academic Scheduler",
  navItems = NAV_ITEMS,
  isLoggedIn = false,
  userName = "User",
  userAvatar = "",
}) => {
  const { isOpen, onToggle } = useDisclosure();
  const navigate = useNavigate();

  const bgColor = useColorModeValue('purple.500', 'gray');
  const textColor = useColorModeValue('gray.800', 'white');
  const borderColor = useColorModeValue('gray.200', 'gray.700');
  const primaryColor = useColorModeValue('purple.600', 'purple.200');

  const SignInMenu = () => {
    const [isOpen, setIsOpen] = React.useState(false);

    return (
      <Menu
        isOpen={isOpen}
        gutter={0}
        onOpen={() => setIsOpen(true)}
        onClose={() => setIsOpen(false)}
      >
        <MenuButton
          as={Button}
          colorScheme="purple"
          variant="solid"
          size="md"
          width="100px"
          height="40px"
          display="flex"
          justifyContent="center"
          alignItems="center"
          onMouseEnter={() => setIsOpen(true)}
          onMouseLeave={() => setIsOpen(false)}
          _hover={{ bg: 'purple.600' }}
          fontWeight="normal"
        >
          <Box>Sign in</Box>
        </MenuButton>
        <MenuList
          onMouseEnter={() => setIsOpen(true)}
          onMouseLeave={() => setIsOpen(false)}
          bg="white"
          borderRadius="lg"
          border="1px solid"
          borderColor="gray.100"
          boxShadow="0 2px 8px rgba(0, 0, 0, 0.1)"
          p={0}
          mt={1}
          minW="140px"
          overflow="hidden"
        >
          <MenuItem
            onClick={() => navigate('/student-login')}
            _hover={{ bg: 'gray.50' }}
            py={3}
            px={4}
          >
            Student
          </MenuItem>
          <MenuItem
            onClick={() => navigate('/Staff-login')}
            _hover={{ bg: 'gray.50' }}
            py={3}
            px={4}
          >
            Staff
          </MenuItem>
          <MenuItem
            onClick={() => navigate('/admin-login')}
            _hover={{ bg: 'gray.50' }}
            py={3}
            px={4}
          >
            Admin
          </MenuItem>
        </MenuList>
      </Menu>
    );
  };

  return (
    <NavbarContainer>
      <NavbarFlex
        bgColor={bgColor}
        textColor={textColor}
        borderColor={borderColor}>
        <MobileMenuFlex>
          <NavToggleButton
            onClick={onToggle}
            icon={
              isOpen ? <CloseIcon w={3} h={3} /> : <HamburgerIcon w={5} h={5} />
            }
            variant={'ghost'}
            aria-label={'Toggle Navigation'}
          />
        </MobileMenuFlex>
        <LogoContainer>
          <LogoText
            as={RouterLink}
            to="/"
            primaryColor={primaryColor}>
            {logo}
          </LogoText>

          <DesktopNavContainer>
            <DesktopNav navItem={{ label: "Menu", children: navItems }} />
          </DesktopNavContainer>
        </LogoContainer>

        <RightSection>
          <SearchBar />
          {!isLoggedIn && <SignInMenu />}
          <UserMenu
            isLoggedIn={isLoggedIn}
            userName={userName}
            userAvatar={userAvatar}
            primaryColor={primaryColor}
          />
        </RightSection>
      </NavbarFlex>

      <Collapse in={isOpen} animateOpacity>
        <MobileNav navItems={navItems} />
      </Collapse>
    </NavbarContainer>
  );
};

export default Navbar;