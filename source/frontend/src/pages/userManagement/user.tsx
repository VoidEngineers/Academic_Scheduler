import React from 'react';
import { Box, Heading } from '@chakra-ui/react';
import { UserList } from '../../components/user/UserList';
import { UserControls } from '../../components/user/UserControls';
import { useUserManagement } from '../../hooks/useUserManagement';
import { UserFormModal } from '../../components/user/UserFormModal';
import { DeleteConfirmModal } from '../../components/user/DeleteConfimModal'; 

const UserManagement: React.FC = () => {
  const {
    users,
    isLoading,
    error,
    filters,
    currentUser,
    modalStates,
    handlers
  } = useUserManagement();

  if (error) {
    return <Box p={5}>Error loading users: {error}</Box>;
  }

  return (
    <Box p={5}>
      <Heading mb={6}>User Management</Heading>
      
      <UserControls 
        searchTerm={filters.searchTerm}
        selectedRole={filters.selectedRole}
        onSearchChange={handlers.onSearchChange}
        onRoleChange={handlers.onRoleChange}
        onAddClick={handlers.onAddClick}
      />
      
      <UserList 
        users={users}
        isLoading={isLoading}
        onEditUser={handlers.onEditClick}
        onDeleteUser={handlers.onDeleteClick}
        onAddCourse={handlers.onAddCourse}
        onRemoveCourse={handlers.onRemoveCourse}
      />

      {modalStates.isFormOpen && (
        <UserFormModal
          user={currentUser}
          isOpen={modalStates.isFormOpen}
          onClose={handlers.onFormClose}
          onSubmit={(values) => handlers.onFormSubmit(values as any)} // * remove this any
        />
      )}

      {modalStates.isDeleteOpen && (
        <DeleteConfirmModal 
          isOpen={modalStates.isDeleteOpen}
          onClose={handlers.onDeleteClose}
          onConfirm={handlers.onDeleteConfirm}
        />
      )}
    </Box>
  );
};

export default UserManagement;