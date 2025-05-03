import { useState, useEffect, useRef, useCallback } from 'react';
import { useToast } from '@chakra-ui/react';
import { User, UserFormValues } from '../types/user';
import { userService } from '../services/userService';

export const useUserManagement = () => {
  // State for users and loading status
  const [users, setUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // State for current selection and operations
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [userToDelete, setUserToDelete] = useState<string | null>(null);

  // State for filters
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRole, setSelectedRole] = useState('');

  // State for modals
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const toast = useToast();
  const fetchInProgress = useRef(false);

  // Fetch all users
  const fetchUsers = useCallback(async () => {
    if (fetchInProgress.current) return;

    fetchInProgress.current = true;
    setIsLoading(true);

    try {
      const data = await userService.getAll();
      console.log('Fetched users:', data); // Debug the API response
      setUsers(data);
      setFilteredUsers(data); // Initialize filtered users with all users
      setError(null);
    } catch (err) {
      console.error('Error fetching users:', err);
      setError('Failed to load users. Please try again.');
      toast({
        title: 'Error',
        description: 'Failed to load users',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
      fetchInProgress.current = false;
    }
  }, [toast]);

  // Load users on component mount
  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  // Filter users when filters or user list changes
  // Filter users when filters or user list changes
useEffect(() => {
  if (!users || !Array.isArray(users)) {
    setFilteredUsers([]);
    return;
  }

  // Start with all users
  let result = [...users];

  // Apply role filter first - this ensures role filtering works consistently
  if (selectedRole) {
    result = result.filter(user => {
      // Handle possible null/undefined userRole and case insensitivity
      if (!user || !user.userRole) return false;
      return user.userRole.toUpperCase() === selectedRole.toUpperCase();
    });
  }

  // Then apply search term filter (if there's a search term)
  if (searchTerm) {
    const lowerCaseSearch = searchTerm.toLowerCase();
    result = result.filter(user => {
      if (!user) return false;
      
      // Only check properties that exist
      const nameMatch = user.name ? user.name.toLowerCase().includes(lowerCaseSearch) : false;
      const emailMatch = user.email ? user.email.toLowerCase().includes(lowerCaseSearch) : false;
      const idMatch = user.id ? user.id.toLowerCase().includes(lowerCaseSearch) : false;

      return nameMatch || emailMatch || idMatch;
    });
  }

  setFilteredUsers(result);
}, [users, searchTerm, selectedRole]);

  // Handler for search input change - used for continuous filtering
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  // Handler for explicit search button/Enter key - supports the UserControls search button
  const handleSearch = (term: string) => {
    setSearchTerm(term);
  };

  // Handler for role filter change
  const handleRoleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedRole(e.target.value);
  };

  // Modal handlers
  const handleAddClick = () => {
    setCurrentUser(null);
    setIsFormOpen(true);
  };

  const handleEditClick = (user: User) => {
    setCurrentUser(user);
    setIsFormOpen(true);
  };

  const handleDeleteClick = (userId: string) => {
    setUserToDelete(userId);
    setIsDeleteOpen(true);
  };

  const handleFormClose = () => {
    setIsFormOpen(false);
    setCurrentUser(null);
  };

  const handleDeleteClose = () => {
    setIsDeleteOpen(false);
    setUserToDelete(null);
  };

  // Form submission handlers
  const handleFormSubmit = async (values: UserFormValues) => {
    try {
      if (currentUser) {
        // Update existing user
        await userService.update(currentUser.id, values);
        toast({
          title: 'Success',
          description: 'User updated successfully',
          status: 'success',
          duration: 3000,
          isClosable: true,
        });
      } else {
        // Create new user
        await userService.create(values);
        toast({
          title: 'Success',
          description: 'User created successfully',
          status: 'success',
          duration: 3000,
          isClosable: true,
        });
      }

      // Refresh the user list
      fetchUsers();
      handleFormClose();
    } catch (err) {
      console.error('Error saving user:', err);
      toast({
        title: 'Error',
        description: `Failed to ${currentUser ? 'update' : 'create'} user`,
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const handleDeleteConfirm = async () => {
    if (!userToDelete) return;

    try {
      await userService.delete(userToDelete);
      toast({
        title: 'Success',
        description: 'User deleted successfully',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });

      // Update local state to remove the deleted user
      setUsers(users.filter(user => user.id !== userToDelete));
      handleDeleteClose();
    } catch (err) {
      console.error('Error deleting user:', err);
      toast({
        title: 'Error',
        description: 'Failed to delete user',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  // Course handlers
  const handleAddCourse = async (userId: string, courseId: string) => {
    // Implement modal to select course first
    console.log('Add course to user', userId, 'with course', courseId);
  };

  const handleRemoveCourse = async (userId: string, courseId: string) => {
    try {
      await userService.removeCourse(userId, courseId);

      // Update local state
      setUsers(users.map(user => {
        if (user.id === userId) {
          return {
            ...user,
            courses: Array.isArray(user.courses)
              ? user.courses.filter((course: string | { id: string }) => {
                const id = typeof course === 'string' ? course : course.id;
                return id !== courseId;
              })
              : []
          };
        }
        return user;
      }));

      toast({
        title: 'Success',
        description: 'Course removed from user',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    } catch (err) {
      console.error('Error removing course:', err);
      toast({
        title: 'Error',
        description: 'Failed to remove course',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return {
    users: filteredUsers,
    isLoading,
    error,
    filters: {
      searchTerm,
      selectedRole,
    },
    currentUser,
    modalStates: {
      isFormOpen,
      isDeleteOpen,
    },
    handlers: {
      onSearchChange: handleSearchChange,
      onSearch: handleSearch, // Add the explicit search handler
      onRoleChange: handleRoleChange,
      onAddClick: handleAddClick,
      onEditClick: handleEditClick,
      onDeleteClick: handleDeleteClick,
      onFormClose: handleFormClose,
      onDeleteClose: handleDeleteClose,
      onFormSubmit: handleFormSubmit,
      onDeleteConfirm: handleDeleteConfirm,
      onAddCourse: handleAddCourse,
      onRemoveCourse: handleRemoveCourse,
    }
  };
};