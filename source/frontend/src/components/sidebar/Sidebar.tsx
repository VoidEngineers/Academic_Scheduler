import React, { useState } from "react";
import {
  Box,
  VStack,
  Text,
  Icon,
  Button,
  Flex,
  IconButton,
} from "@chakra-ui/react";
import { FiHome, FiUser, FiBook, FiChevronLeft, FiMenu } from "react-icons/fi";
import { Link } from "react-router-dom";

interface SidebarProps {
  userName: string;
}

export const Sidebar: React.FC<SidebarProps> = ({ userName }) => {
  const [isOpen, setIsOpen] = useState(true);

  const menuItems = [
    { icon: FiHome, label: "Dashboard", path: "/user-profile" },
    { icon: FiUser, label: "My Profile", path: "/my-profile" },
    { icon: FiBook, label: "Enrolled Courses", path: "/enrolled-courses" },
  ];

  return (
    <>
      {/* Sidebar */}
      <Box
        w={isOpen ? "280px" : "0px"}
        h='100vh'
        bg='white'
        boxShadow='sm'
        position='fixed'
        left={0}
        transition='all 0.3s'
        overflow='hidden'
        zIndex={3}
      >
        <VStack spacing={2} align='stretch' h='full'>
          {/* Header */}
          <Flex px={6} py={6} alignItems='center'>
            <Text fontSize='xl' fontWeight='bold'>
              Hello,
            </Text>
            <Text fontSize='xl' ml={2}>
              {userName}
            </Text>
          </Flex>

          {/* Menu Items */}
          <VStack spacing={1} align='stretch' flex={1}>
            {menuItems.map((item) => (
              <Link to={item.path} key={item.label}>
                <Button
                  w='full'
                  variant='ghost'
                  justifyContent='flex-start'
                  pl={6}
                  py={3}
                  leftIcon={<Icon as={item.icon} boxSize={5} />}
                  _hover={{ bg: "blue.50", color: "blue.500" }}
                >
                  {item.label}
                </Button>
              </Link>
            ))}
          </VStack>
        </VStack>
      </Box>

      {/* Toggle Button */}
      <IconButton
        aria-label={isOpen ? "Close Sidebar" : "Open Sidebar"}
        icon={<Icon as={isOpen ? FiChevronLeft : FiMenu} boxSize={6} />}
        position='fixed'
        left={2}
        top={isOpen ? "auto" : "70px"}
        bottom={isOpen ? 2 : "auto"}
        onClick={() => setIsOpen(!isOpen)}
        variant='solid'
        colorScheme='blue'
        rounded='full'
        shadow='md'
        zIndex={4}
      />
    </>
  );
};
