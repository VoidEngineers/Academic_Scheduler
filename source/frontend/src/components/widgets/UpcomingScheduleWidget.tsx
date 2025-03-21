import React from 'react';
import { Box, Heading, List, ListItem, Text, Flex, Badge } from '@chakra-ui/react';

interface ScheduleItem {
  course: string;
  date: string;
  time: string;
  lecturer: string;
  location: string;
  status: 'upcoming' | 'inProgress' | 'completed';
}

const UpcomingScheduleWidget: React.FC = () => {
  // Sample data - replace with actual data from your API
  const scheduleData: ScheduleItem[] = [
    {
      course: 'Introduction to Computer Science',
      date: '2025-03-23',
      time: '10:00 - 12:00',
      lecturer: 'Dr. Smith',
      location: 'Room 101',
      status: 'upcoming',
    },
    {
      course: 'Advanced Database Systems',
      date: '2025-03-23',
      time: '14:00 - 16:00',
      lecturer: 'Prof. Johnson',
      location: 'Lab 3',
      status: 'upcoming',
    },
    {
      course: 'Web Development',
      date: '2025-03-24',
      time: '09:00 - 11:00',
      lecturer: 'Ms. Davis',
      location: 'Room 205',
      status: 'upcoming',
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'upcoming':
        return 'blue';
      case 'inProgress':
        return 'green';
      case 'completed':
        return 'gray';
      default:
        return 'blue';
    }
  };

  return (
    <Box bg="white" p={5} borderRadius="md" boxShadow="md">
      <Heading size="md" mb={4}>Upcoming Schedule</Heading>
      <List spacing={3}>
        {scheduleData.map((item, index) => (
          <ListItem key={index} p={3} borderWidth="1px" borderRadius="md">
            <Flex justify="space-between" align="center">
              <Box>
                <Text fontWeight="bold">{item.course}</Text>
                <Text fontSize="sm">{item.date} • {item.time}</Text>
                <Text fontSize="sm">{item.lecturer} • {item.location}</Text>
              </Box>
              <Badge colorScheme={getStatusColor(item.status)}>
                {item.status === 'upcoming' ? 'Upcoming' : 
                 item.status === 'inProgress' ? 'In Progress' : 'Completed'}
              </Badge>
            </Flex>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default UpcomingScheduleWidget;