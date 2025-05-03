import React from 'react';
import { Box, Heading, Alert, AlertIcon, AlertTitle, AlertDescription, Button } from '@chakra-ui/react';
import { UserList } from '../../components/user/UserList';
import { UserControls } from '../../components/user/UserControls';
import { UserFormModal } from '../../components/user/UserFormModal';
import { DeleteConfirmModal } from '../../components/user/DeleteConfimModal';
import { useUserManagement } from '../../hooks/useUserManagement';

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
    return (
      <Alert status="error" variant="subtle" flexDirection="column" alignItems="center" justifyContent="center" textAlign="center" height="200px">
        <AlertIcon boxSize="40px" mr={0} />
        <AlertTitle mt={4} mb={1} fontSize="lg">
          Error Loading Users
        </AlertTitle>
        <AlertDescription maxWidth="sm">
          {error}
          <Box mt={4}>
            <Button onClick={() => window.location.reload()}>
              Try Again
            </Button>
          </Box>
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <Box p={5}>
      <Heading mb={6}>User Management</Heading>

      <UserControls
        searchTerm={filters.searchTerm}
        selectedRole={filters.selectedRole}
        onSearchChange={handlers.onSearchChange}
        onSearch={handlers.onSearch} 
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
          onSubmit={handlers.onFormSubmit}
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