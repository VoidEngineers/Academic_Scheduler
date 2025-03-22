import React from "react";
import {
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  VStack,
  Button,
  IconButton,
  Flex,
  HStack,
  Heading,
  Text,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import {
  HamburgerIcon,
  SettingsIcon,
  CalendarIcon,
  StarIcon,
  InfoIcon,
} from "@chakra-ui/icons";
import { FaUser, FaBookOpen } from "react-icons/fa";
import { MdReportProblem } from "react-icons/md";

interface AdminNavProps {
  isOpen: boolean;
  onClose: () => void;
  onOpen: () => void;
  drawerBg: string;
  menuActiveBg: string;
  menuHoverBg: string;
  cardBg: string;
  headerBorderColor: string;
}

const AdminNav: React.FC<AdminNavProps> = ({
  isOpen,
  onClose,
  onOpen,
  drawerBg,
  menuActiveBg,
  menuHoverBg,
  cardBg,
  headerBorderColor,
}) => {
  const navigate = useNavigate();

  return (
    <>
      <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent bg={drawerBg}>
          <DrawerCloseButton />
          <DrawerHeader borderBottomWidth="1px">Admin Controls</DrawerHeader>
          <DrawerBody p={0}>
            <VStack align="stretch" spacing={0}>
              <Button
                leftIcon={<StarIcon />}
                justifyContent="flex-start"
                variant="ghost"
                bg={menuActiveBg}
                py={6}
                borderRadius={0}
                onClick={() => navigate("/admin")}
              >
                Dashboard
              </Button>

              <Button
                leftIcon={<FaUser />}
                justifyContent="flex-start"
                variant="ghost"
                _hover={{ bg: menuHoverBg }}
                py={6}
                borderRadius={0}
                onClick={() => navigate("/admin/users")}
              >
                User Management
              </Button>
              <Button
                leftIcon={<FaBookOpen />}
                justifyContent="flex-start"
                variant="ghost"
                _hover={{ bg: menuHoverBg }}
                py={6}
                borderRadius={0}
                onClick={() => navigate("/admin/courses/list")}
              >
                Course Management
              </Button>
              <Button
                leftIcon={<CalendarIcon />}
                justifyContent="flex-start"
                variant="ghost"
                _hover={{ bg: menuHoverBg }}
                py={6}
                borderRadius={0}
                onClick={() => navigate("/admin/schedule")}
              >
                Schedule Management
              </Button>
              <Button
                leftIcon={<MdReportProblem />}
                justifyContent="flex-start"
                variant="ghost"
                _hover={{ bg: menuHoverBg }}
                py={6}
                borderRadius={0}
              >
                Conflict Management
              </Button>
              <Button
                leftIcon={<SettingsIcon />}
                justifyContent="flex-start"
                variant="ghost"
                _hover={{ bg: menuHoverBg }}
                py={6}
                borderRadius={0}
              >
                System Settings
              </Button>
              <Button
                leftIcon={<InfoIcon />}
                justifyContent="flex-start"
                variant="ghost"
                _hover={{ bg: menuHoverBg }}
                py={6}
                borderRadius={0}
              >
                About
              </Button>
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>

      <Flex
        bg={cardBg}
        p={5}
        borderRadius="lg"
        boxShadow="sm"
        borderLeft="4px solid"
        borderColor={headerBorderColor}
        justifyContent="space-between"
        alignItems="center"
        mb={6}
      >
        <HStack>
          <IconButton
            aria-label="Open menu"
            icon={<HamburgerIcon />}
            variant="ghost"
            onClick={onOpen}
            mr={3}
            size="lg"
          />
          <Heading as="h1" size="lg">
            Admin Dashboard
          </Heading>
        </HStack>
        <Text color="gray.500" fontWeight="medium">
          Academic Year 2024-2025
        </Text>
      </Flex>
    </>
  );
};

export default AdminNav;
