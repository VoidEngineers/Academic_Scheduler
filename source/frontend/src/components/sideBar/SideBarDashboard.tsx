import React from "react";
import {
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  DrawerFooter,
  Collapse,
  Box,
  Icon,
} from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";
import { SidebarItem, DrawerButton } from "../../styles/sideBarStyles";
import { useSidebarLogic } from "./index";

const Sidebar: React.FC = () => {
  const {
    open,
    setOpen,
    isDashboardOpen,
    setIsDashboardOpen,
    isUsersOpen,
    setIsUsersOpen,
    isCoursesOpen,
    setIsCoursesOpen,
    isLecturersOpen,
    setIsLecturersOpen,
    isSettingsOpen,
    setIsSettingsOpen,
  } = useSidebarLogic();

  return (
    <>
      <Drawer isOpen={open} placement="left" onClose={() => setOpen(false)}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Admin Menu</DrawerHeader>
          <DrawerBody>
            <SidebarItem onClick={() => setIsDashboardOpen(!isDashboardOpen)}>
              Dashboard
            </SidebarItem>
            <Collapse in={isDashboardOpen}>
              <Box pl={4}>
                <SidebarItem>Sub-item 1</SidebarItem>
                <SidebarItem>Sub-item 2</SidebarItem>
              </Box>
            </Collapse>

            <SidebarItem onClick={() => setIsUsersOpen(!isUsersOpen)}>
              Users
            </SidebarItem>
            <Collapse in={isUsersOpen}>
              <Box pl={4}>
                <SidebarItem>Sub-item 1</SidebarItem>
                <SidebarItem>Sub-item 2</SidebarItem>
                <SidebarItem>Sub-item 3</SidebarItem>
                <SidebarItem>Sub-item 4</SidebarItem>
              </Box>
            </Collapse>

            <SidebarItem onClick={() => setIsCoursesOpen(!isCoursesOpen)}>
              Courses
            </SidebarItem>
            <Collapse in={isCoursesOpen}>
              <Box pl={4}>
                <SidebarItem>Sub-item 1</SidebarItem>
                <SidebarItem>Sub-item 2</SidebarItem>
              </Box>
            </Collapse>

            <SidebarItem onClick={() => setIsLecturersOpen(!isLecturersOpen)}>
              Lecturers
            </SidebarItem>
            <Collapse in={isLecturersOpen}>
              <Box pl={4}>
                <SidebarItem>Sub-item 1</SidebarItem>
                <SidebarItem>Sub-item 2</SidebarItem>
              </Box>
            </Collapse>

            <SidebarItem onClick={() => setIsSettingsOpen(!isSettingsOpen)}>
              Settings
            </SidebarItem>
            <Collapse></Collapse>
          </DrawerBody>
          <DrawerFooter></DrawerFooter>
        </DrawerContent>
      </Drawer>

      <DrawerButton
        onClick={() => setOpen(true)}
        leftIcon={<Icon as={HamburgerIcon} boxSize={6} />}
      ></DrawerButton>
    </>
  );
};

export default Sidebar;