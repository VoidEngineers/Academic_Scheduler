import React from "react";
import {
  Collapse,
  useColorModeValue,
  useDisclosure,
  Box,
  Flex,
  IconButton,
  Stack,
  useBreakpointValue,
} from "@chakra-ui/react";
import {
  HamburgerIcon,
  CloseIcon,
  SearchIcon,
  BellIcon,
} from "@chakra-ui/icons";
import { Link as RouterLink } from "react-router-dom";

// Import styled components
import {
  NavbarContainer,
  NavbarFlex,
  MobileMenuFlex,
  NavToggleButton,
  LogoContainer,
  LogoText,
  DesktopNavContainer,
  RightSection,
  SearchButton,
  NotificationButton,
} from "../../styles/navBarStyle";

// Import subcomponents
import DesktopNav from "./deskopNav";
import MobileNav from "./mobileNav";
import SearchBar from "../../components/serachBar/searchBar";
import UserMenu from "./userMenu";

// Import types and data
import { NavbarProps } from "./types";
import { NAV_ITEMS } from "./navData";

const Navbar: React.FC<NavbarProps> = ({
  logo = "Academic Scheduler",
  navItems = NAV_ITEMS,
  isLoggedIn = false,
  userName = "User",
  userAvatar = "",
}) => {
  const { isOpen, onToggle } = useDisclosure();
  const isDesktop = useBreakpointValue({ base: false, md: true });

  const bgColor = "#533a7b";
  const textColor = "white";
  const borderColor = "rgba(255, 255, 255, 0.1)";
  const primaryColor = "white";
  const hoverBgColor = "rgba(255, 255, 255, 0.1)";

  return (
    <NavbarContainer>
      <NavbarFlex
        bgColor={bgColor}
        textColor={textColor}
        borderColor={borderColor}
      >
        <MobileMenuFlex>
          <NavToggleButton
            onClick={onToggle}
            icon={
              isOpen ? <CloseIcon w={3} h={3} /> : <HamburgerIcon w={5} h={5} />
            }
            variant={"ghost"}
            aria-label={"Toggle Navigation"}
          />
        </MobileMenuFlex>

        <LogoContainer>
          <LogoText as={RouterLink} to='/' primaryColor={primaryColor}>
            {logo}
          </LogoText>

          <DesktopNavContainer>
            <DesktopNav navItems={navItems} />
          </DesktopNavContainer>
        </LogoContainer>

        <RightSection>
          {isDesktop && (
            <>
              <SearchButton
                aria-label='Search'
                icon={<SearchIcon />}
                variant='ghost'
                colorScheme='whiteAlpha'
                size='md'
                onClick={() => {
                  /* Add search functionality */
                }}
              />
              <NotificationButton
                aria-label='Notifications'
                icon={<BellIcon />}
                variant='ghost'
                colorScheme='whiteAlpha'
                size='md'
                onClick={() => {
                  /* Add notification functionality */
                }}
              />
            </>
          )}
          <UserMenu
            isLoggedIn={isLoggedIn}
            userName={userName}
            userAvatar={userAvatar}
            primaryColor={primaryColor}
            hoverBgColor={hoverBgColor}
          />
        </RightSection>
      </NavbarFlex>

      <Collapse in={isOpen} animateOpacity>
        <MobileNav navItems={navItems} />
      </Collapse>
    </NavbarContainer>
  );
};

export default Navbar;
