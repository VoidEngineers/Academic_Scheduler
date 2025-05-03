import React from 'react';
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  IconButton,
  Badge,
  Box,
  Text,
  Spinner,
  Flex,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Select,
  Button,
} from '@chakra-ui/react';
import { EditIcon, DeleteIcon } from '@chakra-ui/icons';

interface User {
  id: string;
  name: string;
  email: string;
  userRole: string;
  courses?: string[];
}

interface Course {
  id: string;
  name: string;
}

interface UserListProps {
  users: User[];
  isLoading: boolean;
  onEditUser: (user: User) => void;
  onDeleteUser: (userId: string) => void;
  onAddCourse?: (userId: string, courseId: string) => void;
  onRemoveCourse?: (userId: string, courseId: string) => void;
  availableCourses?: Course[];
}

export const UserList: React.FC<UserListProps> = ({
  users,
  isLoading,
  onEditUser,
  onDeleteUser,
  onAddCourse,
  onRemoveCourse,
  availableCourses = [],
}) => {
  if (isLoading) {
    return (
      <Flex justify="center" align="center" minH="200px">
        <Spinner size="xl" />
      </Flex>
    );
  }

  if (users.length === 0) {
    return (
      <Box textAlign="center" p={5} color="gray.500">
        <Text>No users found</Text>
      </Box>
    );
  }

  const getRoleBadgeColor = (role: string) => {
    switch (role.toLowerCase()) {
      case 'admin':
        return 'red';
      case 'lecturer':
      case 'instructor':
        return 'purple';
      case 'student':
        return 'green';
      default:
        return 'gray';
    }
  };

  return (
    <Box overflowX="auto">
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>Name</Th>
            <Th>Email</Th>
            <Th>Role</Th>
            <Th>Actions</Th>
          </Tr>
        </Thead>
        <Tbody>
          {users.map(user => (
            <React.Fragment key={user.id}>
              <Tr>
                <Td>{user.name}</Td>
                <Td>{user.email}</Td>
                <Td>
                  <Badge colorScheme={getRoleBadgeColor(user.userRole)}>
                    {user.userRole}
                  </Badge>
                </Td>
                <Td>
                  <Flex gap={2}>
                    <IconButton
                      aria-label="Edit user"
                      icon={<EditIcon />}
                      size="sm"
                      onClick={() => onEditUser(user)}
                    />
                    <IconButton
                      aria-label="Delete user"
                      icon={<DeleteIcon />}
                      size="sm"
                      colorScheme="red"
                      onClick={() => onDeleteUser(user.id)}
                    />
                  </Flex>
                </Td>
              </Tr>
              
              {/* Course management section */}
              {(user.userRole === 'Student' || user.userRole === 'Lecturer' || user.userRole === 'Instructor') && 
                onAddCourse && onRemoveCourse && (
                <Tr>
                  <Td colSpan={4} p={0}>
                    <Accordion allowToggle>
                      <AccordionItem border="none">
                        <AccordionButton py={2}>
                          <Box flex="1" textAlign="left">
                            Manage Courses
                          </Box>
                          <AccordionIcon />
                        </AccordionButton>
                        <AccordionPanel pb={4}>
                          <Box>
                            <Text fontWeight="bold" mb={2}>
                              Enrolled Courses
                            </Text>
                            {user.courses && user.courses.length > 0 ? (
                              <Box mb={4}>
                                {user.courses.map(courseId => {
                                  const course = availableCourses.find(c => c.id === courseId);
                                  return (
                                    <Flex key={courseId} justify="space-between" mb={2}>
                                      <Text>{course ? course.name : courseId}</Text>
                                      <Button
                                        size="xs"
                                        colorScheme="red"
                                        onClick={() => onRemoveCourse(user.id, courseId)}
                                      >
                                        Remove
                                      </Button>
                                    </Flex>
                                  );
                                })}
                              </Box>
                            ) : (
                              <Text mb={4} fontSize="sm" color="gray.500">
                                No courses assigned
                              </Text>
                            )}

                            <Box>
                              <Text fontWeight="bold" mb={2}>
                                Add Course
                              </Text>
                              <Flex>
                                <Select
                                  placeholder="Select course"
                                  size="sm"
                                  mr={2}
                                  onChange={(e) => {
                                    if (e.target.value) {
                                      onAddCourse(user.id, e.target.value);
                                      e.target.value = '';
                                    }
                                  }}
                                >
                                  {availableCourses
                                    .filter(course => !user.courses?.includes(course.id))
                                    .map(course => (
                                      <option key={course.id} value={course.id}>
                                        {course.name}
                                      </option>
                                    ))}
                                </Select>
                              </Flex>
                            </Box>
                          </Box>
                        </AccordionPanel>
                      </AccordionItem>
                    </Accordion>
                  </Td>
                </Tr>
              )}
            </React.Fragment>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
};