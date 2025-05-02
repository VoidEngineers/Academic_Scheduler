import { useState, useEffect, useCallback } from 'react';
import { userService } from '../services/userService';
import { User, UserFormValues } from '../types/user';
import { useToast } from '@chakra-ui/react';

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

  // Fetch all users
  const fetchUsers = useCallback(async () => {
    setIsLoading(true);
    try {
      console.log('Fetching users...');
      const data = await userService.getAll();
      console.log('Users fetched:', data);
      
      if (Array.isArray(data)) {
        setUsers(data);
        setError(null);
      } else {
        console.error('Invalid data format received:', data);
        setError('Invalid data format received from server');
      }
    } catch (err: any) {
      console.error('Error fetching users:', err);
      setError(`Failed to load users: ${err.message || 'Unknown error'}`);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Load users on component mount
  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  // Filter users when filters or user list changes
  useEffect(() => {
    console.log('Filtering users. Total users:', users.length);
    
    const filtered = users.filter(user => {
      // Skip invalid entries
      if (!user || !user.name || !user.email || !user.userRole) {
        console.warn('Skipping invalid user entry:', user);
        return false;
      }

      const matchesSearch =
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesRole =
        !selectedRole ||
        selectedRole === 'All Roles' ||
        user.userRole.toLowerCase() === selectedRole.toLowerCase();

      return matchesSearch && matchesRole;
    });

    console.log('Filtered users:', filtered.length);
    setFilteredUsers(filtered);
  }, [users, searchTerm, selectedRole]);

  // Handler for search input change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  // Handler for role filter change
  const handleRoleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedRole(e.target.value);
  };

  // Handler for adding a new user
  const handleAddClick = () => {
    setCurrentUser(null);
    setIsFormOpen(true);
  };

  // Handler for editing a user
  const handleEditClick = (user: User) => {
    setCurrentUser(user);
    setIsFormOpen(true);
  };

  // Handler for deleting a user
  const handleDeleteClick = (userId: string) => {
    const user = users.find(u => u.id === userId);
    if (user) {
      setCurrentUser(user);
    }
    setUserToDelete(userId);
    setIsDeleteOpen(true);
  };

  // Close form modal
  const handleFormClose = () => {
    setIsFormOpen(false);
  };

  // Close delete modal
  const handleDeleteClose = () => {
    setIsDeleteOpen(false);
    setUserToDelete(null);
  };

  // Handle form submission (create or update)
  const handleFormSubmit = async (values: UserFormValues) => {
    try {
      if (currentUser) {
        // Update existing user
        await userService.update(currentUser.id, values);
        toast({
          title: 'User updated',
          description: `${values.userName} was successfully updated.`,
          status: 'success',
          duration: 3000,
          isClosable: true,
        });
      } else {
        // Create new user
        await userService.create(values);
        toast({
          title: 'User created',
          description: `${values.userName} was successfully created.`,
          status: 'success',
          duration: 3000,
          isClosable: true,
        });
      }
      
      setIsFormOpen(false);
      fetchUsers(); // Refresh user list
    } catch (err: any) {
      toast({
        title: 'Error',
        description: err.response?.data || 'Failed to save user',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
      console.error('Error saving user:', err);
    }
  };

  // Delete a user
  const handleDeleteConfirm = async () => {
    if (!userToDelete) return;
    
    try {
      await userService.delete(userToDelete);
      toast({
        title: 'User deleted',
        description: currentUser ? `${currentUser.name} was successfully deleted.` : 'User was successfully deleted.',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
      
      setIsDeleteOpen(false);
      setUserToDelete(null);
      fetchUsers(); // Refresh user list
    } catch (err: any) {
      toast({
        title: 'Error',
        description: err.response?.data || 'Failed to delete user',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
      console.error('Error deleting user:', err);
    }
  };

  // Add a course to a user
  const handleAddCourse = async (userId: string, courseId: string) => {
    try {
      await userService.addCourse(userId, courseId);
      toast({
        title: 'Course added',
        description: 'Course has been successfully assigned to the user.',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
      fetchUsers(); // Refresh user list
    } catch (err: any) {
      toast({
        title: 'Error',
        description: err.response?.data || 'Failed to add course',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
      console.error('Error adding course:', err);
    }
  };

  // Remove a course from a user
  const handleRemoveCourse = async (userId: string, courseId: string) => {
    try {
      await userService.removeCourse(userId, courseId);
      toast({
        title: 'Course removed',
        description: 'Course has been successfully removed from the user.',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
      fetchUsers(); // Refresh user list
    } catch (err: any) {
      toast({
        title: 'Error',
        description: err.response?.data || 'Failed to remove course',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
      console.error('Error removing course:', err);
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
      onRoleChange: handleRoleChange,
      onAddClick: handleAddClick,
      onEditClick: handleEditClick,
      onDeleteClick: handleDeleteClick,
      onFormClose: handleFormClose,
      onFormSubmit: handleFormSubmit,
      onDeleteClose: handleDeleteClose,
      onDeleteConfirm: handleDeleteConfirm,
      onAddCourse: handleAddCourse,
      onRemoveCourse: handleRemoveCourse,
    }
  };
};