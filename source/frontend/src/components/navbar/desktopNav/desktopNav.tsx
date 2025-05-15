import React from 'react';
import { NavItem } from '../types';
import { NavItemsContainer } from './styles';
import DesktopNavItem from './DeskopNavItem';

interface DesktopNavProps {
  navItems: NavItem[];
}

const DesktopNav: React.FC<DesktopNavProps> = ({ navItems }) => {
  return (
    <NavItemsContainer>
      {navItems.map((navItem) => (
        <DesktopNavItem key={navItem.label} navItem={navItem} />
      ))}
    </NavItemsContainer>
  );
};

export default DesktopNav;