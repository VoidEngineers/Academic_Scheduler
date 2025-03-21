import React from "react";
import {
  Box,
  Container,
  Grid,
  Stat,
  StatLabel,
  StatNumber,
  Text,
  VStack,
  HStack,
  Icon,
  Flex,
} from "@chakra-ui/react";
import { FiBook, FiBookOpen, FiAward } from "react-icons/fi";
import { Sidebar } from "../../components/sidebar/Sidebar";
import { CourseCard } from "../../components/courses/CourseCard";

export const UserProfile: React.FC = () => {
  const stats = [
    {
      icon: FiBook,
      label: "Enrolled Courses",
      value: "2",
    },
    {
      icon: FiBookOpen,
      label: "Active Courses",
      value: "2",
    },
    {
      icon: FiAward,
      label: "Completed Courses",
      value: "0",
    },
  ];

  const inProgressCourses = [
    {
      title: "Introduction to Containerization: Docker Beginners Guide",
      image: "/src/assets/userProfileAssets/docker-intro.png",
      rating: 4.9,
      completedLessons: 0,
      totalLessons: 17,
      isFree: true,
    },
    {
      title: "Introduction to Containerization: Kuberneties Beginners Guide",
      image: "/src/assets/userProfileAssets/docker-intro.png",
      rating: 4.3,
      completedLessons: 6,
      totalLessons: 17,
      isFree: true,
    },
    {
      title: "Introduction to Python Developer Guide",
      image: "/src/assets/userProfileAssets/docker-intro.png",
      rating: 3.9,
      completedLessons: 10,
      totalLessons: 17,
      isFree: true,
    },
    // Add more courses as needed
  ];

  return (
    <Flex minH='100vh' bg='gray.50'>
      <Sidebar userName='Vikum Basnayaka' />

      <Box w='full' p={8}>
        <Container maxW='container.xl'>
          <VStack spacing={8} align='stretch'>
            {/* Dashboard Section */}
            <Box>
              <Text fontSize='2xl' fontWeight='bold' mb={6}>
                Dashboard
              </Text>

              <Grid templateColumns='repeat(3, 1fr)' gap={6}>
                {stats.map((stat) => (
                  <Box
                    key={stat.label}
                    bg='white'
                    p={6}
                    borderRadius='lg'
                    shadow='sm'
                  >
                    <Stat>
                      <HStack spacing={4} mb={4}>
                        <Icon as={stat.icon} boxSize={8} color='blue.500' />
                        <StatLabel fontSize='lg'>{stat.label}</StatLabel>
                      </HStack>
                      <StatNumber fontSize='3xl'>{stat.value}</StatNumber>
                    </Stat>
                  </Box>
                ))}
              </Grid>
            </Box>

            {/* In Progress Courses Section */}
            <Box>
              <Text fontSize='2xl' fontWeight='bold' mb={6}>
                In Progress Courses
              </Text>

              <Grid
                templateColumns='repeat(auto-fill, minmax(300px, 1fr))'
                gap={6}
              >
                {inProgressCourses.map((course, index) => (
                  <CourseCard key={index} {...course} />
                ))}
              </Grid>
            </Box>
          </VStack>
        </Container>
      </Box>
    </Flex>
  );
};
