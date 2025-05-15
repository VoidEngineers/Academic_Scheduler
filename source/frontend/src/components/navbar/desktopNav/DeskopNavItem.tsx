import React from 'react';
import {
  Box,
  Link,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Stack,
  Text,
} from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import {
  DropdownLink,
  NavLinkContainer,
  NavLinkText,
} from './styles';

import { useDesktopNavColors } from '../../../hooks/useDesktopNavColors'
import type {DesktopNavItemProps} from './types';


const DesktopNavItem: React.FC<DesktopNavItemProps> = ({ navItem }) => {
  const {
    popoverContentBgColor,
    popoverBorderColor,
    popoverHoverBgColor,
    primaryColor,
  } = useDesktopNavColors();

  return (
    <Box>
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
  );
};

export default DesktopNavItem;