import React from 'react';
import {
  Link,
  Collapse,
  useDisclosure,
  useColorModeValue,
  InputGroup,
  InputLeftElement,
} from '@chakra-ui/react';
import { ChevronDownIcon, SearchIcon } from '@chakra-ui/icons';
import { Link as RouterLink } from 'react-router-dom';
import { NavItem } from './types';
import {
  NavItemStack,
  NavItemFlex,
  NavItemText,
  NavItemIcon,
  ChildrenStack,
  MainNav,
  SearchBox,
  SearchInput
} from '../../styles/mobileNavStyle';

const MobileNavItem: React.FC<NavItem> = ({ label, children, href }) => {
  const { isOpen, onToggle } = useDisclosure();
  const colorMode = useColorModeValue('light', 'dark');

  return (
    <NavItemStack onClick={children && onToggle}>
      <NavItemFlex
        as={RouterLink}
        to={href ?? '#'}>
        <NavItemText colorMode={colorMode}>
          {label}
        </NavItemText>
        {children && (
          <NavItemIcon
            as={ChevronDownIcon}
            isOpen={isOpen}
          />
        )}
      </NavItemFlex>

      <Collapse in={isOpen} animateOpacity style={{ marginTop: '0!important' }}>
        <ChildrenStack colorMode={colorMode}>
          {children &&
            children.map((child) => (
              <Link
                key={child.label}
                py={2}
                as={RouterLink}
                to={child.href || '#'}>
                {child.label}
              </Link>
            ))}
        </ChildrenStack>
      </Collapse>
    </NavItemStack>
  );
};

interface MobileNavProps {
  navItems: NavItem[];
}

const MobileNav: React.FC<MobileNavProps> = ({ navItems }) => {
  const colorMode = useColorModeValue('light', 'dark');

  return (
    <MainNav colorMode={colorMode}>
      {navItems.map((navItem) => (
        <MobileNavItem key={navItem.label} {...navItem} />
      ))}
      <SearchBox>
        <InputGroup>
          <InputLeftElement pointerEvents="none">
            <SearchIcon color="gray.400" />
          </InputLeftElement>
          <SearchInput 
            type="text" 
            placeholder="Search courses..." 
            colorMode={colorMode}
          />
        </InputGroup>
      </SearchBox>
    </MainNav>
  );
};

export default MobileNav;