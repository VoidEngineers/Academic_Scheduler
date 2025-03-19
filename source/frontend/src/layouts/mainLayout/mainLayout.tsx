import React from "react";
import { useColorModeValue } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import Navbar from "../../components/navbar/navbar";
import { NAV_ITEMS } from "../../components/navbar/navData";
import {
  MainContainer,
  ContentWrapper,
  FooterContainer,
  FooterContent,
  FooterText,
  FooterLinks,
  FooterLink,
} from "../../styles/mainLayoutStyle";

import { MainLayoutProps } from "./types";

const MainLayout: React.FC<MainLayoutProps> = ({
  children,
  isLoggedIn = false,
  userName = "Guest",
  userAvatar = "",
}) => {
  const bgColor = useColorModeValue("white", "gray.800");
  const textColor = useColorModeValue("gray.600", "gray.200");
  const borderColor = useColorModeValue("gray.200", "gray.700");
  const primaryColor = useColorModeValue("purple.600", "purple.200");

  const currentYear = new Date().getFullYear();

  return (
    <MainContainer>
      <Navbar
        logo="Academic Scheduler"
        navItems={NAV_ITEMS}
        isLoggedIn={isLoggedIn}
        userName={userName}
        userAvatar={userAvatar}
      />

      <ContentWrapper>{children}</ContentWrapper>

      <FooterContainer bgColor={bgColor} borderColor={borderColor}>
        <FooterContent>
          <FooterText textColor={textColor}>
            © {currentYear} Academic Scheduler. All rights reserved.
          </FooterText>

          <FooterLinks>
            <FooterLink as={RouterLink} to="/about" primaryColor={primaryColor}>
              About
            </FooterLink>
            <FooterLink
              as={RouterLink}
              to="/privacy"
              primaryColor={primaryColor}
            >
              Privacy
            </FooterLink>
            <FooterLink as={RouterLink} to="/terms" primaryColor={primaryColor}>
              Terms
            </FooterLink>
            <FooterLink
              as={RouterLink}
              to="/contact"
              primaryColor={primaryColor}
            >
              Contact
            </FooterLink>
          </FooterLinks>
        </FooterContent>
      </FooterContainer>
    </MainContainer>
  );
};

export default MainLayout;
