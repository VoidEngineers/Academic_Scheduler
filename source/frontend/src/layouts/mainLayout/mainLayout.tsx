import { useColorModeValue } from "@chakra-ui/react";
import React from "react";
import Footer from "../../components/footer/footer";
import Navbar from "../../components/navbar/mainNavbar/navbar";
import { NAV_ITEMS } from "../../components/navbar/mainNavbar/navData";
import {
  ContentWrapper,
  MainContainer
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
  const primaryColor = useColorModeValue("teal.600", "teal.300");

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

      <Footer
        bgColor={bgColor}
        textColor={textColor}
        borderColor={borderColor}
        primaryColor={primaryColor}
      />
    </MainContainer>
  );
};

export default MainLayout;