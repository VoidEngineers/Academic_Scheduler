import React, { useState } from 'react';
import {
  Flex,
  Input,
  Select,
  Button,
  InputGroup,
  InputRightElement
} from '@chakra-ui/react';
import { AddIcon, SearchIcon } from '@chakra-ui/icons';

interface UserControlsProps {
  searchTerm: string;
  selectedRole: string;
  onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onRoleChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  onAddClick: () => void;
  onSearch?: (searchTerm: string) => void; // Add explicit search function
}

export const UserControls: React.FC<UserControlsProps> = ({
  searchTerm,
  selectedRole,
  onSearchChange,
  onRoleChange,
  onAddClick,
  onSearch
}) => {
  const [localSearchTerm, setLocalSearchTerm] = useState(searchTerm);

  // Handle local search term changes
  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocalSearchTerm(e.target.value);
    if (!onSearch) {
      // If no explicit search function, use the continuous filtering
      onSearchChange(e);
    }
  };

  // Handle search button click
  const handleSearchClick = () => {
    if (onSearch) {
      onSearch(localSearchTerm);
    } else {
      // Fallback to the input change handler with a synthetic event
      const syntheticEvent = {
        target: { value: localSearchTerm }
      } as React.ChangeEvent<HTMLInputElement>;
      onSearchChange(syntheticEvent);
    }
  };

  // Handle pressing Enter in the search field
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearchClick();
    }
  };

  return (
    <Flex mb={5} gap={4}>
      <InputGroup width="300px">
        <Input
          placeholder="Search users..."
          value={localSearchTerm}
          onChange={handleSearchInputChange}
          onKeyDown={handleKeyDown}
        />
        <InputRightElement>
          <Button
            h="1.75rem"
            size="sm"
            onClick={handleSearchClick}
            aria-label="Search"
          >
            <SearchIcon />
          </Button>
        </InputRightElement>
      </InputGroup>
      
      <Select
        placeholder="Filter by role"
        value={selectedRole}
        onChange={onRoleChange}
        width="200px"
      >
        <option value="">All Roles</option>
        <option value="ADMIN">Admin</option>
        <option value="LECTURER">Lecturer</option>
        <option value="STUDENT">Student</option>
      </Select>
      
      <Button 
        leftIcon={<AddIcon />}
        colorScheme="blue"
        onClick={onAddClick}
        ml="auto"
      >
        Add User
      </Button>
    </Flex>
  );
};