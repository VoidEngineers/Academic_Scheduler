import React from 'react';
import {
  Flex,
  Input,
  InputGroup,
  InputLeftElement,
  Select,
  Button,
  Box,
} from '@chakra-ui/react';
import { SearchIcon, AddIcon } from '@chakra-ui/icons';

interface UserControlsProps {
  searchTerm: string;
  selectedRole: string;
  onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onRoleChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  onAddClick: () => void;
}

export const UserControls: React.FC<UserControlsProps> = ({
  searchTerm,
  selectedRole,
  onSearchChange,
  onRoleChange,
  onAddClick,
}) => {
  const roles = ['All Roles', 'Student', 'Lecturer', 'Instructor', 'Admin'];

  return (
    <Box mb={6}>
      <Flex direction={{ base: 'column', md: 'row' }} gap={4} mb={4}>
        <InputGroup maxW={{ base: '100%', md: '300px' }}>
          <InputLeftElement pointerEvents="none">
            <SearchIcon color="gray.300" />
          </InputLeftElement>
          <Input
            placeholder="Search users..."
            value={searchTerm}
            onChange={onSearchChange}
          />
        </InputGroup>

        <Select
          maxW={{ base: '100%', md: '200px' }}
          value={selectedRole}
          onChange={onRoleChange}
          placeholder="Filter by role"
        >
          {roles.map(role => (
            <option key={role} value={role}>
              {role}
            </option>
          ))}
        </Select>

        <Button
          leftIcon={<AddIcon />}
          colorScheme="blue"
          onClick={onAddClick}
          ml={{ base: 0, md: 'auto' }}
        >
          Add User
        </Button>
      </Flex>
    </Box>
  );
};