import React from 'react';
import { 
  Box, 
  Heading, 
  Flex, 
  Text, 
  Stat, 
  StatLabel, 
  StatNumber, 
  Icon,
  Badge,
  HStack
} from '@chakra-ui/react';
import { FaStar, FaArrowUp, FaArrowDown, FaMedal } from 'react-icons/fa';

const PerformanceWidget: React.FC = () => {
  // Example performance data
  const performanceData = {
    averageGPA: 3.42,
    passingRate: 92,
    topPerformers: [
      { course: 'CS450: Advanced Algorithms', score: 'A' },
      { course: 'BUS330: Marketing Strategy', score: 'A-' },
      { course: 'ENG205: Technical Writing', score: 'A-' }
    ]
  };

  return (
    <Box p={5} bg="white" borderRadius="md" boxShadow="md">
      <Heading size="md" mb={4}>Academic Performance</Heading>
      
      {/* Main performance metrics */}
      <Flex justify="space-between" mb={5}>
        <Stat>
          <StatLabel>Average GPA</StatLabel>
          <Flex align="center">
            <Icon as={FaStar} color="yellow.500" mr={2} />
            <StatNumber>{performanceData.averageGPA}</StatNumber>
          </Flex>
          <HStack spacing={1} mt={1}>
            <Icon 
              as={performanceData.averageGPA > 3.3 ? FaArrowUp : FaArrowDown} 
              color={performanceData.averageGPA > 3.3 ? "green.500" : "red.500"} 
              boxSize={3} 
            />
            <Text fontSize="xs">From previous semester</Text>
          </HStack>
        </Stat>
        
        <Stat textAlign="center">
          <StatLabel>Passing Rate</StatLabel>
          <Flex align="center" justify="center">
            <StatNumber>{performanceData.passingRate}%</StatNumber>
          </Flex>
          <Badge colorScheme="green" mt={1}>Good Standing</Badge>
        </Stat>
      </Flex>
      
      {/* Top performers */}
      <Box>
        <Flex align="center" mb={2}>
          <Icon as={FaMedal} color="orange.500" mr={2} />
          <Text fontWeight="medium">Top Performing Courses</Text>
        </Flex>
        
        {performanceData.topPerformers.map((course, index) => (
          <Flex key={index} justify="space-between" py={2} borderBottomWidth={index !== performanceData.topPerformers.length - 1 ? 1 : 0} borderColor="gray.100">
            <Text fontSize="sm" noOfLines={1} maxW="70%">{course.course}</Text>
            <Badge colorScheme={
              course.score === 'A' ? "green" : 
              course.score === 'A-' ? "teal" : "blue"
            }>
              {course.score}
            </Badge>
          </Flex>
        ))}
      </Box>
    </Box>
  );
};

export default PerformanceWidget;