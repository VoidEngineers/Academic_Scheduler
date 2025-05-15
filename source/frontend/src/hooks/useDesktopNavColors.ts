import { useColorModeValue } from '@chakra-ui/react';

export const useDesktopNavColors = () => {
  return {
    popoverContentBgColor: useColorModeValue('white', 'gray.800'),
    popoverBorderColor: useColorModeValue('gray.200', 'gray.600'),
    popoverHoverBgColor: useColorModeValue('gray.100', 'gray.700'),
    primaryColor: useColorModeValue('purple.600', 'purple.200'),
  };
};