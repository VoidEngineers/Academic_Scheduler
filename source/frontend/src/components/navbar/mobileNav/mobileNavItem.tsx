import { ChevronDownIcon } from '@chakra-ui/icons';
import { Collapse, Link, useColorModeValue, useDisclosure } from '@chakra-ui/react';
import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { NavItem } from '../mainNavbar/types';
import {
  ChildrenStack,
  NavItemFlex,
  NavItemIcon,
  NavItemStack,
  NavItemText
} from './styles';

interface MobileNavItemProps {
  navItem: NavItem;
}

const MobileNavItem: React.FC<MobileNavItemProps> = ({ navItem }) => {
  const { label, children, href } = navItem;
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

export default MobileNavItem;