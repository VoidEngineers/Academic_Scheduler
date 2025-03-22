import React from "react";
import { Container, Box, Flex } from "@chakra-ui/react";
import UserProfileCard from "./UserProfileCard";
import { Sidebar } from "../../components/sideBar/Sidebar";

const ProfilePage: React.FC = () => {
  // Sample user data - in a real application, this would come from your backend
  const sampleUserData = {
    registrationDate: "December 24, 2024 12:01 PM",
    firstName: "Vikum",
    lastName: "Basnayaka",
    username: "vikumchathuranga",
    email: "chathx.vik@gmail.com",
    phoneNumber: "",
    skillOccupation: "",
    biography: "",
  };

  return (
    <Flex minH='100vh' bg='gray.50'>
      <Sidebar userName='Vikum Basnayaka' />
      <Container maxW='container.md' py={8}>
        <Box w='full'>
          <UserProfileCard userData={sampleUserData} />
        </Box>
      </Container>
    </Flex>
  );
};

export default ProfilePage;
