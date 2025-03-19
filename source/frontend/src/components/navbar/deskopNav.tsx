import React from 'react';
import {
  Icon,
  Popover,
  PopoverTrigger,
  Stack,
  useColorModeValue
} from '@chakra-ui/react';
import { ChevronRightIcon } from '@chakra-ui/icons';
import { Link as RouterLink } from 'react-router-dom';
import { NavItem } from './types';

// Import styled components
import {
  NavItemBox,
  NavItemLink,
  SubNavPopover,
  SubNavStack,
  SubNavLink,
  SubNavContent,
  SubNavLabel,
  SubNavDescription,
  SubNavIconContainer,
  NavItemsContainer
} from '../../styles/desktopNavStyles';

interface DesktopNavProps {
  navItems: NavItem[];
}

const DesktopSubNav = ({ label, href, subLabel }: NavItem) => {
  
  return (
    <SubNavLink to={href || '#'}>
      <SubNavStack>
        <SubNavContent>
          <SubNavLabel>
            {label}
          </SubNavLabel>
          <SubNavDescription>{subLabel}</SubNavDescription>
        </SubNavContent>
        <SubNavIconContainer>
          <Icon color={'purple.400'} w={5} h={5} as={ChevronRightIcon} />
        </SubNavIconContainer>
      </SubNavStack>
    </SubNavLink>
  );
};

const DesktopNav: React.FC<DesktopNavProps> = ({ navItems }) => {
  const linkColor = useColorModeValue('gray.600', 'gray.200');
  const linkHoverColor = useColorModeValue('gray.800', 'white');
  const popoverContentBgColor = useColorModeValue('white', 'gray.800');

  return (
    <NavItemsContainer>
      {navItems.map((navItem) => (
        <NavItemBox key={navItem.label}>
          <Popover trigger={'hover'} placement={'bottom-start'}>
            <PopoverTrigger>
              <NavItemLink
                href={navItem.href ?? '#'}
                color={linkColor}
                _hover={{
                  color: linkHoverColor,
                }}
                as={navItem.href ? RouterLink : undefined}
                to={navItem.href || undefined}>
                {navItem.label}
              </NavItemLink>
            </PopoverTrigger>

            {navItem.children && (
              <SubNavPopover
                bg={popoverContentBgColor}>
                <Stack>
                  {navItem.children.map((child: NavItem) => (
                    <DesktopSubNav key={child.label} {...child} />
                  ))}
                </Stack>
              </SubNavPopover>
            )}
          </Popover>
        </NavItemBox>
      ))}
    </NavItemsContainer>
  );
};

export default DesktopNav;