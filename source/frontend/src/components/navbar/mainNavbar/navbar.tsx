import React from 'react';
import { CloseIcon, HamburgerIcon } from '@chakra-ui/icons';
import { Collapse, useDisclosure } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';

// Import styled components and hooks
import {
  NavbarContainer,
  NavbarFlex,
  MobileMenuFlex,
  NavToggleButton,
  LogoContainer,
  LogoText,
  DesktopNavContainer,
  RightSection,
  useNavbarColors
} from './styles';

// Import subcomponents
import SearchBar from '../../serachBar/searchBar';
import DesktopNav from '../desktopNav/DeskopNavItem';
import MobileNav from './mobileNav/mobileNav';
import UserMenu from './userMenu';
import SignInMenu from './SignInMenu';

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
  const { bgColor, textColor, borderColor, primaryColor } = useNavbarColors();

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