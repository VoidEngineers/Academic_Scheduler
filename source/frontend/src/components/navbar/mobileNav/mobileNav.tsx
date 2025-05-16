import React from 'react';
import { InputGroup, InputLeftElement, useColorModeValue } from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';
import { MainNav, SearchBox, SearchInput } from './styles';
import MobileNavItem from './mobileNavItem'
import type { MobileNavProps } from './types';

const MobileNav: React.FC<MobileNavProps> = ({ navItems }) => {
  const colorMode = useColorModeValue('light', 'dark');

  return (
    <MainNav colorMode={colorMode}>
      {navItems.map((navItem) => (
        <MobileNavItem key={navItem.label} navItem={navItem} />
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