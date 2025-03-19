import { ReactNode } from 'react';

export interface NavItem {
  label: string;
  subLabel?: string;
  children?: Array<NavItem>;
  href?: string;
}

export interface NavbarProps {
  logo?: ReactNode;
  navItems?: Array<NavItem>;
  isLoggedIn?: boolean;
  userName?: string;
  userAvatar?: string;
}