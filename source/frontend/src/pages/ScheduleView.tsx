import React, { useState, useEffect } from 'react';
import '../styles/ScheduleView.css';
import { useNavigate } from "react-router-dom";
import { 
  Text, 
  Box, 
  useToast,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  FormControl,
  FormLabel,
  Input,
  useDisclosure,
  VStack
} from "@chakra-ui/react";

interface Student {
  userId: string;
  userEmail: string;
}

interface Schedule {
  scheduleId: string;
  tableId: string;
  tableName: string;
  courseId: string;
  instructorId: string;
  lic: string;
  meetingURL: string;
  startTime: number;
  endTime: number;
  duration: string;
  capacity: number;
  students: Student[];
}

interface Course {
  courseId: string;
  courseName: string;
  courseCode: string;
  courseDescription: string;
}

const ScheduleView: React.FC = () => {
  const navigate = useNavigate();
  const [schedules, setSchedules] = useState<Schedule[]>([]);
  const [editingSchedule, setEditingSchedule] = useState<Schedule | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    fetchSchedules();
  }, []);

  const fetchSchedules = async () => {
    try {
      const response = await fetch('http://localhost:8082/schedules/all', {
        credentials: 'include'
      });
      if (!response.ok) {
        throw new Error('Failed to fetch schedules');
      }
      const data = await response.json();
      setSchedules(data);
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to fetch schedules',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleEditClick = (schedule: Schedule) => {
    setEditingSchedule({ ...schedule });
    onOpen();
  };

  const handleDeleteClick = async (scheduleId: string) => {
    if (window.confirm(`Are you sure you want to delete the schedule "${scheduleId}"?`)) {

    try {
      console.log('idddddddddd',scheduleId);
      const response = await fetch(`http://localhost:8082/schedules/delete/${scheduleId}`, {
        method: 'DELETE',
        credentials: 'include'
      });
      
      if (!response.ok) {
        throw new Error('Failed to delete schedule');
      }

      setSchedules(schedules.filter(schedule => schedule.tableId !== scheduleId));
      toast({
        title: 'Success',
        description: 'Schedule deleted successfully',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to delete schedule',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  }
  };

  const handleCloseDialog = () => {
    setEditingSchedule(null);
    onClose();
  };

  const handleSaveChanges = async () => {
    console.log(editingSchedule?.scheduleId);
    if (editingSchedule) {
      try {
        const response = await fetch(`http://localhost:8082/schedules/update/${editingSchedule.scheduleId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
          body: JSON.stringify(editingSchedule),
        });

        if (!response.ok) {
          throw new Error('Failed to update schedule');
        }

        const updatedSchedule = await response.json();
        setSchedules(schedules.map(schedule => 
          schedule.scheduleId === updatedSchedule.scheduleId ? updatedSchedule : schedule
        ));
        
        toast({
          title: 'Success',
          description: 'Schedule updated successfully',
          status: 'success',
          duration: 3000,
          isClosable: true,
        });
        handleCloseDialog();
      } catch (error) {
        toast({
          title: 'Error',
          description: 'Failed to update schedule',
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
      }
    }
  };

  const formatTime = (timestamp: number) => {
    return new Date(timestamp).toLocaleTimeString();
  };

  if (isLoading) {
    return (
      <Box minH="100vh" bg="white" display="flex" justifyContent="center" alignItems="center">
        <Text fontSize="xl">Loading schedules...</Text>
      </Box>
    );
  }

  const handleAddSchedules = () => {
    navigate("/admin/schedule");
  };

  return (
    <Box minH="100vh" bg="white" p={4}>
      <button onClick={handleAddSchedules} className="manage-schedules-button">
        Schedule New Lecture
      </button>
      <Text fontSize="4xl" color="black" textAlign="center" mb={8}>
        Schedule Management
      </Text>
      {schedules.map((schedule) => (
        <Box key={schedule.tableId} mb={8} p={4} borderWidth="1px" borderRadius="lg">
          <Text fontSize="2xl" mb={4}>{schedule.tableName}</Text>
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th>Schedule ID</Th>
                <Th>Course ID</Th>
                <Th>Instructor ID</Th>
                <Th>Time</Th>
                <Th>Duration</Th>
                <Th>Capacity</Th>
                <Th>Meeting URL</Th>
                <Th>Actions</Th>
              </Tr>
            </Thead>
            <Tbody>
              <Tr>
                <Td>{schedule.scheduleId}</Td>
                <Td>{schedule.courseId}</Td>
                <Td>{schedule.instructorId}</Td>
                <Td>{formatTime(schedule.startTime)} - {formatTime(schedule.endTime)}</Td>
                <Td>{schedule.duration}</Td>
                <Td>{schedule.capacity}</Td>
                <Td>
                  <Button
                    as="a"
                    href={schedule.meetingURL}
                    target="_blank"
                    rel="noopener noreferrer"
                    colorScheme="blue"
                    size="sm"
                  >
                    Join Meeting
                  </Button>
                </Td>
                <Td>
                  <Button
                    colorScheme="blue"
                    size="sm"
                    mr={2}
                    onClick={() => handleEditClick(schedule)}
                  >
                    Edit
                  </Button>
                  <Button
                    colorScheme="red"
                    size="sm"
                    onClick={() => handleDeleteClick(schedule.scheduleId)}
                  >
                    Delete
                  </Button>
                </Td>
              </Tr>
            </Tbody>
          </Table>
        </Box>
      ))}

      <Modal isOpen={isOpen} onClose={handleCloseDialog}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit Schedule</ModalHeader>
          <ModalBody>
            <VStack spacing={4}>
              <FormControl>
                <FormLabel>Table Name</FormLabel>
                <Input
                  value={editingSchedule?.tableName || ''}
                  onChange={(e) => setEditingSchedule(prev => prev ? {...prev, tableName: e.target.value} : null)}
                />
              </FormControl>
              <FormControl>
                <FormLabel>Course ID</FormLabel>
                <Input
                  value={editingSchedule?.courseId || ''}
                  onChange={(e) => setEditingSchedule(prev => prev ? {...prev, courseId: e.target.value} : null)}
                />
              </FormControl>
              <FormControl>
                <FormLabel>Instructor ID</FormLabel>
                <Input
                  value={editingSchedule?.instructorId || ''}
                  onChange={(e) => setEditingSchedule(prev => prev ? {...prev, instructorId: e.target.value} : null)}
                />
              </FormControl>
              <FormControl>
                <FormLabel>Meeting URL</FormLabel>
                <Input
                  type="url"
                  value={editingSchedule?.meetingURL || ''}
                  onChange={(e) => setEditingSchedule(prev => prev ? {...prev, meetingURL: e.target.value} : null)}
                />
              </FormControl>
              <FormControl>
                <FormLabel>Capacity</FormLabel>
                <Input
                  type="number"
                  value={editingSchedule?.capacity || 0}
                  onChange={(e) => setEditingSchedule(prev => prev ? {...prev, capacity: parseInt(e.target.value)} : null)}
                />
              </FormControl>
            </VStack>
          </ModalBody>
          <ModalFooter>
            <Button variant="ghost" mr={3} onClick={handleCloseDialog}>
              Cancel
            </Button>
            <Button colorScheme="blue" onClick={handleSaveChanges}>
              Save Changes
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default ScheduleView;