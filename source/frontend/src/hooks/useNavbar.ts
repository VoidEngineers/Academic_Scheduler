import { useCallback } from 'react';
import { useColorModeValue } from '@chakra-ui/color-mode';

export interface UseNavbarProps {
  activeLink?: string;
  onLinkClick?: (linkName: string) => void;
}

export interface UseNavbarReturn {
  activeLink: string;
  bgColor: string;
  borderColor: string;
  handleLinkClick: (linkName: string) => void;
  isActive: (linkName: string) => boolean;
}

export const useNavbar = ({ 
  activeLink = "Cloud Computing", 
  onLinkClick 
}: UseNavbarProps): UseNavbarReturn => {
  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');
  
  const handleLinkClick = useCallback((linkName: string) => {
    if (onLinkClick) {
      onLinkClick(linkName);
    }
  }, [onLinkClick]);
  
  const isActive = useCallback((linkName: string) => {
    return activeLink === linkName;
  }, [activeLink]);

  return {
    activeLink,
    bgColor,
    borderColor,
    handleLinkClick,
    isActive
  };
};