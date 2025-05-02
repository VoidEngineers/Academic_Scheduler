import { useState, useEffect, useCallback } from 'react';
import { User, UserFormValues } from '../types/user';
import { userService } from '../services/userService';
import { useToast } from '@chakra-ui/react';

export const useUserManagement = () => {
  // State
  const [users, setUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [userToDelete, setUserToDelete] = useState<string | null>(null);

  // UI state
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRole, setSelectedRole] = useState('');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const toast = useToast();

  // Load users
  const fetchUsers = useCallback(async () => {
    setIsLoading(true);
    try {
      const data = await userService.getAll();
      if (Array.isArray(data)) {
        setUsers(data);
        setError(null);
      } else {
        throw new Error('Invalid data format from API');
      }
    } catch (err) {
      setError('Failed to load users');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  // Filter users
  useEffect(() => {
    const filtered = users.filter(user => {
      if (!user || !user.name || !user.email || !user.userRole) return false;

      const matchesSearch =
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesRole =
        !selectedRole ||
        selectedRole === 'All Roles' ||
        user.userRole.toLowerCase() === selectedRole.toLowerCase();

      return matchesSearch && matchesRole;
    });

    setFilteredUsers(filtered);
  }, [users, searchTerm, selectedRole]);

  // Handlers
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleRoleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedRole(e.target.value);
  };

  const handleAddClick = () => {
    setCurrentUser(null);
    setIsFormOpen(true);
  };

  const handleEditClick = (user: User) => {
    setCurrentUser(user);
    setIsFormOpen(true);
  };

  const handleFormClose = () => {
    setIsFormOpen(false);
  };

  const handleFormSubmit = async (values: UserFormValues) => {
    try {
      if (currentUser) {
        await userService.update(currentUser.id, values);
        toast({
          title: 'User updated',
          status: 'success',
          duration: 3000,
        });
      } else {
        await userService.create(values);
        toast({
          title: 'User created',
          status: 'success',
          duration: 3000,
        });
      }
      setIsFormOpen(false);
      fetchUsers();
    } catch (err) {
      toast({
        title: 'Error',
        description: currentUser ? 'Failed to update user' : 'Failed to create user',
        status: 'error',
        duration: 3000,
      });
    }
  };

  const handleDeleteClick = (userId: string) => {
    setUserToDelete(userId);
    setIsDeleteOpen(true);
  };

  const handleDeleteClose = () => {
    setIsDeleteOpen(false);
    setUserToDelete(null);
  };

  const handleDeleteConfirm = async () => {
    if (!userToDelete) return;

    try {
      await userService.delete(userToDelete);
      toast({
        title: 'User deleted',
        status: 'success',
        duration: 3000,
      });
      setIsDeleteOpen(false);
      setUserToDelete(null);
      fetchUsers();
    } catch (err) {
      toast({
        title: 'Error',
        description: 'Failed to delete user',
        status: 'error',
        duration: 3000,
      });
    }
  };

  const handleAddCourse = async (userId: string, courseId: string) => {
    try {
      await userService.addCourse(userId, courseId);
      toast({
        title: 'Course added',
        status: 'success',
        duration: 3000,
      });
      fetchUsers();
    } catch (err) {
      toast({
        title: 'Error',
        description: 'Failed to add course',
        status: 'error',
        duration: 3000,
      });
    }
  };

  const handleRemoveCourse = async (userId: string, courseId: string) => {
    try {
      await userService.removeCourse(userId, courseId);
      toast({
        title: 'Course removed',
        status: 'success',
        duration: 3000,
      });
      fetchUsers();
    } catch (err) {
      toast({
        title: 'Error',
        description: 'Failed to remove course',
        status: 'error',
        duration: 3000,
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
      onRoleChange: handleRoleChange,
      onAddClick: handleAddClick,
      onEditClick: handleEditClick,
      onFormClose: handleFormClose,
      onFormSubmit: handleFormSubmit,
      onDeleteClick: handleDeleteClick,
      onDeleteClose: handleDeleteClose,
      onDeleteConfirm: handleDeleteConfirm,
      onAddCourse: handleAddCourse,
      onRemoveCourse: handleRemoveCourse,
    },
  };
};
