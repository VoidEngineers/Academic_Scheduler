import React from 'react';
import { 
  Box, 
  Heading, 
  Flex, 
  Text, 
  Stat, 
  StatLabel, 
  StatNumber, 
  StatHelpText, 
  StatArrow,
  Icon
} from '@chakra-ui/react';
import { FaUserGraduate } from 'react-icons/fa';

const EnrollmentWidget: React.FC = () => {
  // Example enrollment data
  const enrollmentData = {
    total: 1250,
    newThisMonth: 85,
    growthRate: 3.5,
    departments: [
      { name: 'Computer Science', count: 356 },
      { name: 'Engineering', count: 284 },
      { name: 'Business', count: 230 }
    ]
  };

  return (
    <Box p={5} bg="white" borderRadius="md" boxShadow="md">
      <Heading size="md" mb={4}>Enrollment Statistics</Heading>
      
      {/* Total enrollment with icon */}
      <Flex align="center" mb={4}>
        <Icon as={FaUserGraduate} boxSize={10} color="blue.500" mr={3} />
        <Box>
          <Text fontSize="sm" color="gray.500">Total Students</Text>
          <Text fontSize="3xl" fontWeight="bold">{enrollmentData.total}</Text>
        </Box>
      </Flex>
      
      {/* Growth stats */}
      <Stat mb={4}>
        <StatLabel>New Enrollments</StatLabel>
        <StatNumber>{enrollmentData.newThisMonth}</StatNumber>
        <StatHelpText>
          <StatArrow type={enrollmentData.growthRate > 0 ? 'increase' : 'decrease'} />
          {Math.abs(enrollmentData.growthRate)}% from last month
        </StatHelpText>
      </Stat>
      
      {/* Department breakdown */}
      <Text mb={2} fontWeight="medium">Top Departments</Text>
      {enrollmentData.departments.map((dept, index) => (
        <Flex key={index} justify="space-between" mb={1}>
          <Text fontSize="sm">{dept.name}</Text>
          <Text fontSize="sm" fontWeight="bold">{dept.count} students</Text>
        </Flex>
      ))}
    </Box>
  );
};

export default EnrollmentWidget;