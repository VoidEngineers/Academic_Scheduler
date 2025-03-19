import React from 'react';
import {
  Box,
  Stack,
  Link,
  Popover,
  PopoverTrigger,
  PopoverContent,
  Text,
  useColorModeValue
} from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import { NavItem } from './types';
import {
  NavItemsContainer,
  NavLinkContainer,
  NavLinkText,
  DropdownLink
} from '../../styles/navBarStyle';

interface DesktopNavProps {
  navItems: NavItem[];
}

const DesktopNav: React.FC<DesktopNavProps> = ({ navItems }) => {
  const popoverContentBgColor = useColorModeValue('white', 'gray.800');
  const popoverBorderColor = useColorModeValue('gray.200', 'gray.600');
  const popoverHoverBgColor = useColorModeValue('gray.100', 'gray.700');
  const primaryColor = useColorModeValue('purple.600', 'purple.200');

  return (
    <NavItemsContainer>
      {navItems.map((navItem) => (
        <Box key={navItem.label}>
          <Popover trigger={'hover'} placement={'bottom-start'} gutter={8}>
            <PopoverTrigger>
              <NavLinkContainer>
                <Link
                  as={RouterLink}
                  to={navItem.href ?? '#'}
                  _hover={{ textDecoration: 'none' }}
                >
                  <NavLinkText primaryColor={primaryColor}>
                    {navItem.label}
                  </NavLinkText>
                </Link>
              </NavLinkContainer>
            </PopoverTrigger>

            {navItem.children && (
              <PopoverContent
                border={1}
                boxShadow={'md'}
                bg={popoverContentBgColor}
                p={4}
                borderColor={popoverBorderColor}
                rounded={'xl'}
                minW={'sm'}>
                <Stack>
                  {navItem.children.map((child) => (
                    <DropdownLink
                      key={child.label}
                      bgHoverColor={popoverHoverBgColor}>
                      <Link
                        as={RouterLink}
                        to={child.href ?? '#'}
                        role={'group'}
                        display={'block'}
                        p={2}
                        rounded={'md'}
                        _hover={{ textDecoration: 'none' }}>
                        <Text
                          transition={'all .3s ease'}
                          _groupHover={{ color: primaryColor }}
                          fontWeight={500}>
                          {child.label}
                        </Text>
                      </Link>
                    </DropdownLink>
                  ))}
                </Stack>
              </PopoverContent>
            )}
          </Popover>
        </Box>
      ))}
    </NavItemsContainer>
  );
};

export default DesktopNav;