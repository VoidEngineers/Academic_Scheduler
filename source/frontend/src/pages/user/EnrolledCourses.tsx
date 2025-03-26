import React, { useState } from "react";
import {
  Box,
  Container,
  Text,
  HStack,
  VStack,
  Select,
  Input,
  Button,
  InputGroup,
  InputRightElement,
  Flex,
} from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import { CourseCard } from "../../components/courses/CourseCard";
import { Sidebar } from "../../components/sideBar/Sidebar";

export const EnrolledCourses: React.FC = () => {
  const [sortBy, setSortBy] = useState("recently");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [progressFilter, setProgressFilter] = useState("");
  const [instructorFilter, setInstructorFilter] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  // Mock data for enrolled courses
  const enrolledCourses = [
    {
      title: "Pentaho for ETL & Data Integration Masterclass 2025 - PDI 9",
      image: "/src/assets/courses/pentaho.jpg",
      rating: 4.5,
      completedLessons: 7,
      totalLessons: 16,
      isFree: false,
    },
    {
      title: "Data Warehouse - The Ultimate Guide",
      image: "/src/assets/courses/data-warehouse.jpg",
      rating: 4.8,
      completedLessons: 0,
      totalLessons: 12,
      isFree: true,
    },
    {
      title: "Zabbix 7 Application and Network Monitoring",
      image: "/src/assets/courses/zabbix.jpg",
      rating: 4.2,
      completedLessons: 3,
      totalLessons: 15,
      isFree: false,
    },
    {
      title: "Docker for the Absolute Beginner - Hands On - DevOps",
      image: "/src/assets/courses/docker.jpg",
      rating: 4.7,
      completedLessons: 1,
      totalLessons: 20,
      isFree: true,
    },
  ];

  return (
    <Flex minH='100vh' bg='gray.50'>
      <Sidebar userName='Vikum Basnayaka' />
      <Box flex='1' p={8}>
        <Container maxW='container.xl'>
          <VStack spacing={8} align='stretch'>
            {/* Header Section */}
            <Box>
              <Text fontSize='3xl' fontWeight='bold' mb={2}>
                My learning
              </Text>
              <Text color='gray.600'>
                24hr 34min watched • View all activity
              </Text>
            </Box>

            {/* Filter Section */}
            <HStack spacing={4} wrap='wrap'>
              <Select
                placeholder='Recently Accessed'
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                w='200px'
                bg='white'
              >
                <option value='recently'>Recently Accessed</option>
                <option value='title'>Title</option>
                <option value='progress'>Progress</option>
              </Select>

              <Select
                placeholder='Categories'
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                w='200px'
                bg='white'
              >
                <option value='development'>Development</option>
                <option value='business'>Business</option>
                <option value='it'>IT & Software</option>
              </Select>

              <Select
                placeholder='Progress'
                value={progressFilter}
                onChange={(e) => setProgressFilter(e.target.value)}
                w='200px'
                bg='white'
              >
                <option value='in-progress'>In Progress</option>
                <option value='not-started'>Not Started</option>
                <option value='completed'>Completed</option>
              </Select>

              <Select
                placeholder='Instructor'
                value={instructorFilter}
                onChange={(e) => setInstructorFilter(e.target.value)}
                w='200px'
                bg='white'
              >
                <option value='instructor1'>Instructor 1</option>
                <option value='instructor2'>Instructor 2</option>
                <option value='instructor3'>Instructor 3</option>
              </Select>

              <Button colorScheme='gray' size='md'>
                Reset
              </Button>

              <InputGroup maxW='300px'>
                <Input
                  placeholder='Search my courses'
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  bg='white'
                />
                <InputRightElement>
                  <SearchIcon color='gray.500' />
                </InputRightElement>
              </InputGroup>
            </HStack>

            {/* Courses Grid */}
            <Box>
              <Flex wrap='wrap' gap={6}>
                {enrolledCourses.map((course, index) => (
                  <Box
                    key={index}
                    flexBasis={{
                      base: "100%",
                      md: "calc(50% - 12px)",
                      lg: "calc(33.33% - 16px)",
                    }}
                  >
                    <CourseCard {...course} />
                  </Box>
                ))}
              </Flex>
            </Box>
          </VStack>
        </Container>
      </Box>
    </Flex>
  );
};
