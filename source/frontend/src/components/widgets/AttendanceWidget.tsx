import React from 'react';
import { 
  Box, 
  Heading, 
  Flex, 
  Stat, 
  StatLabel, 
  StatNumber, 
  StatGroup, 
  Text, 
  Icon,
  Progress
} from '@chakra-ui/react';
import { FaUserCheck, FaUserTimes, FaUserClock } from 'react-icons/fa';

const AttendanceWidget: React.FC = () => {
  // Example attendance data
  const attendanceData = {
    present: 82,
    absent: 12,
    excused: 6,
    total: 100
  };

  // Top attended courses
  const topCourses = [
    { course: 'ART110', rate: 95 },
    { course: 'CS101', rate: 92 },
    { course: 'ENG205', rate: 87 },
  ];

  return (
    <Box p={5} bg="white" borderRadius="md" boxShadow="md">
      <Heading size="md" mb={4}>Attendance Statistics</Heading>
      
      {/* Main attendance stats */}
      <StatGroup mb={4}>
        <Stat>
          <StatLabel>Present</StatLabel>
          <Flex align="center">
            <Icon as={FaUserCheck} color="green.500" mr={2} />
            <StatNumber>{attendanceData.present}%</StatNumber>
          </Flex>
        </Stat>
        
        <Stat>
          <StatLabel>Absent</StatLabel>
          <Flex align="center">
            <Icon as={FaUserTimes} color="red.500" mr={2} />
            <StatNumber>{attendanceData.absent}%</StatNumber>
          </Flex>
        </Stat>
        
        <Stat>
          <StatLabel>Excused</StatLabel>
          <Flex align="center">
            <Icon as={FaUserClock} color="orange.500" mr={2} />
            <StatNumber>{attendanceData.excused}%</StatNumber>
          </Flex>
        </Stat>
      </StatGroup>
      
      {/* Top courses by attendance */}
      <Box mt={6}>
        <Text mb={3} fontWeight="medium">Top Courses by Attendance</Text>
        {topCourses.map((course, index) => (
          <Box key={index} mb={3}>
            <Flex justify="space-between" mb={1}>
              <Text fontSize="sm">{course.course}</Text>
              <Text fontSize="sm" fontWeight="bold">{course.rate}%</Text>
            </Flex>
            <Progress 
              value={course.rate} 
              size="sm" 
              colorScheme={index === 0 ? "green" : index === 1 ? "blue" : "purple"} 
              borderRadius="full"
            />
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default AttendanceWidget;