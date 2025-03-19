import React from 'react';
import {
  InputGroup,
  InputLeftElement,
  Input,
  useColorModeValue
} from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';

interface SearchBarProps {
  display?: object;
  maxWidth?: string;
  placeholder?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({
  display = { base: 'none', md: 'flex' },
  maxWidth = "400px",
  placeholder = "Search courses..."
}) => {
  return (
    <InputGroup display={display} maxW={maxWidth}>
      <InputLeftElement pointerEvents="none">
        <SearchIcon color="gray.400" />
      </InputLeftElement>
      <Input 
        type="text" 
        placeholder={placeholder}
        borderRadius="full"
        bg={useColorModeValue('gray.50', 'gray.700')}
      />
    </InputGroup>
  );
};

export default SearchBar;