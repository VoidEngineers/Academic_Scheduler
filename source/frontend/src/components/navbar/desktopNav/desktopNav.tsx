import React from 'react';
import { NavItem } from '../mainNavbar/types';
import DesktopNavItem from './DeskopNavItem';
import { NavItemsContainer } from './styles';

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