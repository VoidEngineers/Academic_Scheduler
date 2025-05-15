import { ReactNode } from 'react';

export type NavItem = {
  label: string;
  subLabel?: string;
  children?: Array<NavItem>;
  href?: string;
}

export type NavbarProps = {
  logo?: ReactNode;
  navItems?: Array<NavItem>;
  isLoggedIn?: boolean;
  userName?: string;
  userAvatar?: string;
}