import React from 'react';
import {
  Collapse,
  useColorModeValue,
  useDisclosure
} from '@chakra-ui/react';
import {
  HamburgerIcon,
  CloseIcon
} from '@chakra-ui/icons';
import { Link as RouterLink } from 'react-router-dom';

// Import styled components
import {
  NavbarContainer,
  NavbarFlex,
  MobileMenuFlex,
  NavToggleButton,
  LogoContainer,
  LogoText,
  DesktopNavContainer,
  RightSection
} from '../../styles/navBarStyle';

// Import subcomponents
import DesktopNav from './deskopNav';
import MobileNav from './mobileNav';
import SearchBar from '../../components/serachBar/searchBar';
import UserMenu from './userMenu';

// Import types and data
import { NavbarProps } from './types';
import { NAV_ITEMS } from './navData';

const Navbar: React.FC<NavbarProps> = ({
  logo = "Academic Scheduler",
  navItems = NAV_ITEMS,
  isLoggedIn = false,
  userName = "User",
  userAvatar = "",
}) => {
  const { isOpen, onToggle } = useDisclosure();
  
  const bgColor = useColorModeValue('white', 'gray.800');
  const textColor = useColorModeValue('gray.600', 'white');
  const borderColor = useColorModeValue('gray.200', 'gray.700');
  const primaryColor = useColorModeValue('purple.600', 'purple.200');

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
            <DesktopNav navItems={navItems} />
          </DesktopNavContainer>
        </LogoContainer>

        <RightSection>
          <SearchBar />
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