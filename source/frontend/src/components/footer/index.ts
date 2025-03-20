import { useColorModeValue } from "@chakra-ui/react";
import type { FooterNavItem } from "./types";
import { FaTwitter, FaFacebook, FaInstagram } from "react-icons/fa";

export const FOOTER_LINKS: FooterNavItem[] = [
    { label: "About", href: "/about" },
    { label: "Privacy", href: "/privacy" },
    { label: "Terms", href: "/terms" },
    { label: "Contact", href: "/contact" }
  ];
  
  // Social media links
  export interface SocialLink {
    platform: string;
    href: string;
    icon: string;
  }

  // Helper to map social platform names to icons
  export const getSocialIcon = (platform: string) => {
    switch (platform.toLowerCase()) {
      case 'twitter':
        return FaTwitter;
      case 'facebook':
        return FaFacebook;
      case 'instagram':
        return FaInstagram;
      default:
        return FaTwitter;
    }
  };
  
  
  export const SOCIAL_LINKS: SocialLink[] = [
    { platform: "Twitter", href: "https://twitter.com/academicscheduler", icon: "twitter" },
    { platform: "Facebook", href: "https://facebook.com/academicscheduler", icon: "facebook" },
    { platform: "Instagram", href: "https://instagram.com/academicscheduler", icon: "instagram" }
  ];
  
  // Hook to get footer colors based on color mode
  export const useFooterColors = () => {
    return {
      bgColor: useColorModeValue("white", "gray.800"),
      textColor: useColorModeValue("gray.600", "gray.200"),
      borderColor: useColorModeValue("gray.200", "gray.700"),
      primaryColor: useColorModeValue("purple.600", "purple.300"),
      copyrightText: `© ${new Date().getFullYear()} Academic Scheduler. All rights reserved.`
    };
  };
  
  // Helper function to get external link props
  export const getExternalLinkProps = () => ({
    target: "_blank",
    rel: "noopener noreferrer"
  });