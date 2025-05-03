import React from 'react';
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Badge,
  IconButton,
  Flex,
  Box,
  Text,
  Spinner
} from '@chakra-ui/react';
import { EditIcon, DeleteIcon } from '@chakra-ui/icons';
import { UserFormValues } from '../../types/user';

interface UserListProps {
  users: UserFormValues[];
  isLoading: boolean;
  onEditUser: (user: UserFormValues) => void;
  onDeleteUser: (userId: string) => void;
  onAddCourse: (userId: string, courseId: string) => void;
  onRemoveCourse: (userId: string, courseId: string) => void;
}

export const UserList: React.FC<UserListProps> = ({
  users,
  isLoading,
  onEditUser,
  onDeleteUser,
  onAddCourse,
  onRemoveCourse
}) => {
  if (isLoading) {
    return (
      <Box textAlign="center" py={10}>
        <Spinner size="xl" />
        <Text mt={4}>Loading users...</Text>
      </Box>
    );
  }

  if (users.length === 0) {
    return <Box p={5}>No users found.</Box>;
  }

  return (
    <Box overflowX="auto">
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>Name</Th>
            <Th>Email</Th>
            <Th>Role</Th>
            <Th>Courses</Th>
            <Th>Actions</Th>
          </Tr>
        </Thead>
        <Tbody>
          {users.map(user => (
            <Tr key={user.userId}>
              <Td>{user.userName}</Td>  
              <Td>{user.userEmail || 'N/A'}</Td>

              <Td>
                <Badge colorScheme={
                  user.userRole === 'ADMIN' ? 'red' :
                    user.userRole === 'LECTURER' ? 'green' : 'blue'
                }>
                  {user.userRole}
                </Badge>
              </Td>
              <Td>
                <Flex direction="column">
                  {user.courses && user.courses.length > 0 ? (
                    <Flex wrap="wrap" gap={1}>
                      {user.courses.map(course => (
                        <Badge
                          key={typeof course === 'string' ? course : (course as {id: string}).id}
                          colorScheme="purple"
                          mr={1}
                        >
                          {typeof course === 'string' ? course : (course as {code?: string, name?: string, id: string}).code || (course as {code?: string, name?: string, id: string}).name || (course as {id: string}).id}
                          <IconButton
                            aria-label="Remove course"
                            icon={<DeleteIcon />}
                            size="xs"
                            ml={1}
                            onClick={() => onRemoveCourse(user.userId, typeof course === 'string' ? course : (course as {id: string}).id)}
                          />
                        </Badge>
                      ))}
                    </Flex>
                  ) : (
                    <Text fontSize="sm" color="gray.500">No courses</Text>
                  )}
                  <IconButton
                    aria-label="Add course"
                    icon={<span>+</span>}
                    size="xs"
                    mt={2}
                    colorScheme="teal"
                    onClick={() => onAddCourse(user.userId, '')}
                  />
                </Flex>
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
                    onClick={() => onDeleteUser(user.userId)}
                  />
                </Flex>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
};