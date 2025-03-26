import React from 'react';
import { 
  Box, 
  Heading, 
  SimpleGrid, 
  Flex, 
  Text, 
  Icon,
  CircularProgress,
  CircularProgressLabel
} from '@chakra-ui/react';
import { FaBook, FaChalkboardTeacher } from 'react-icons/fa';

const CourseDistributionWidget: React.FC = () => {
  // Example course data
  const courseData = {
    totalCourses: 85,
    activeCourses: 72,
    faculties: [
      { name: 'Science & Technology', percentage: 35 },
      { name: 'Business & Economics', percentage: 25 },
      { name: 'Arts & Humanities', percentage: 20 },
      { name: 'Health Sciences', percentage: 20 }
    ]
  };

  return (
    <Box p={5} bg="white" borderRadius="md" boxShadow="md">
      <Heading size="md" mb={4}>Course Distribution</Heading>
      
      {/* Course counts */}
      <SimpleGrid columns={2} spacing={4} mb={5}>
        <Flex direction="column" align="center" p={3} bg="gray.50" borderRadius="md">
          <Icon as={FaBook} color="green.500" boxSize={6} mb={2} />
          <Text fontSize="sm">Total Courses</Text>
          <Text fontSize="xl" fontWeight="bold">{courseData.totalCourses}</Text>
        </Flex>
        
        <Flex direction="column" align="center" p={3} bg="gray.50" borderRadius="md">
          <Icon as={FaChalkboardTeacher} color="blue.500" boxSize={6} mb={2} />
          <Text fontSize="sm">Active Courses</Text>
          <Text fontSize="xl" fontWeight="bold">{courseData.activeCourses}</Text>
        </Flex>
      </SimpleGrid>
      
      {/* Faculty distribution */}
      <Text mb={3} fontWeight="medium">Faculty Distribution</Text>
      <SimpleGrid columns={2} spacing={4}>
        {courseData.faculties.map((faculty, index) => (
          <Box key={index} textAlign="center">
            <CircularProgress 
              value={faculty.percentage} 
              color={
                index === 0 ? "green.500" : 
                index === 1 ? "blue.500" : 
                index === 2 ? "purple.500" : "orange.500"
              } 
              size="80px"
            >
              <CircularProgressLabel>{faculty.percentage}%</CircularProgressLabel>
            </CircularProgress>
            <Text fontSize="xs" mt={1} noOfLines={2}>{faculty.name}</Text>
          </Box>
        ))}
      </SimpleGrid>
    </Box>
  );
};

export default CourseDistributionWidget;