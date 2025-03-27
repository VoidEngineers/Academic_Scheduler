import { useState } from "react";
import { Text } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import {
  UserManagementContainer,
  BackButton,
  ErrorMessage,
  ControlsContainer,
  SearchContainer,
  SearchInput,
  FilterContainer,
  RoleFilter,
  AddUserButton,
  LoadingMessage,
  UsersContainer,
  UsersTable,
  TableHeader,
  TableData,
  TableRow,
  StatusSelect,
  ActionButtonsContainer,
  EditButton,
  DeleteButton,
  NoResults,
  ModalOverlay,
  Modal,
  ModalTitle,
  FormGroup,
  FormLabel,
  FormInput,
  FormSelect,
  ModalButtonsContainer,
  SubmitButton,
  CancelButton
} from "../../styles/userManagementStyle";

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  department: string;
  status: string;
}

export const UserManagement = () => {
  // Initial mock data instead of API calls
  const [users, setUsers] = useState<User[]>([
    { id: "1", name: "John Doe", email: "john@example.com", role: "student", department: "Computer Science", status: "Active" },
    { id: "2", name: "Jane Smith", email: "jane@example.com", role: "lecturer", department: "Engineering", status: "Active" },
    { id: "3", name: "Robert Johnson", email: "robert@example.com", role: "admin", department: "Business", status: "Active" },
    { id: "4", name: "Emily Davis", email: "emily@example.com", role: "student", department: "Mathematics", status: "Inactive" },
    { id: "5", name: "Michael Wilson", email: "michael@example.com", role: "lecturer", department: "Physics", status: "Suspended" }
  ]);
  
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRole, setSelectedRole] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    role: "student",
    department: "",
    password: "",
    confirmPassword: ""
  });
  const [error, setError] = useState("");
  
  const navigate = useNavigate();

  // Roles for dropdown filter
  const roles = ["All Roles", "Student", "Lecturer", "Admin"];
  // Departments for dropdown
  const departments = ["Computer Science", "Engineering", "Business", "Mathematics", "Physics"];

  // Filter users based on search term and role
  const filteredUsers = users.filter(user => {
    const matchesSearch = 
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.id.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesRole = selectedRole === "" || selectedRole === "All Roles" || 
      user.role.toLowerCase() === selectedRole.toLowerCase();
    
    return matchesSearch && matchesRole;
  });

  // Handle input changes for new user form
  const handleNewUserChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNewUser(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle add user form submission
  const handleAddUser = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (newUser.password !== newUser.confirmPassword) {
      setError("Passwords don't match");
      return;
    }

    // Generate a new ID
    const newId = (users.length + 1).toString();
    
    // Create new user and add to state
    const userToAdd: User = {
      id: newId,
      name: newUser.name,
      email: newUser.email,
      role: newUser.role,
      department: newUser.department,
      status: "Active"
    };
    
    setUsers([...users, userToAdd]);
    setShowAddModal(false);
    setNewUser({
      name: "",
      email: "",
      role: "student",
      department: "",
      password: "",
      confirmPassword: ""
    });
    setError("");
    
    // Optional: Show success message
    alert(`User ${newUser.name} added successfully!`);
  };

  // Handle edit user
  const handleEditUser = (user: User) => {
    setCurrentUser(user);
    setShowEditModal(true);
  };

  // Handle edit user form submission
  const handleUpdateUser = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser) return;

    // Update user in state
    const updatedUsers = users.map(user => 
      user.id === currentUser.id ? currentUser : user
    );
    
    setUsers(updatedUsers);
    setShowEditModal(false);
    setCurrentUser(null);
    
    // Optional: Show success message
    alert(`User ${currentUser.name} updated successfully!`);
  };

  // Handle delete user
  const handleDeleteUser = (userId: string) => {
    if (!window.confirm("Are you sure you want to delete this user?")) {
      return;
    }

    // Delete user from state
    const updatedUsers = users.filter(user => user.id !== userId);
    setUsers(updatedUsers);
    
    // Optional: Show success message
    alert("User deleted successfully!");
  };

  // Handle current user input changes
  const handleCurrentUserChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    if (!currentUser) return;
    
    const { name, value } = e.target;
    setCurrentUser(prev => {
      if (!prev) return prev;
      return {
        ...prev,
        [name]: value
      };
    });
  };

  // Update user status
  const handleStatusChange = (userId: string, newStatus: string) => {
    // Update user status in state
    const updatedUsers = users.map(user => 
      user.id === userId ? { ...user, status: newStatus } : user
    );
    
    setUsers(updatedUsers);
  };

  
  return (
    <UserManagementContainer>
      <Text fontSize='50px' color='black' textAlign='center'>
        User Management
      </Text>

      {error && <ErrorMessage>{error}</ErrorMessage>}

      <ControlsContainer>
        <SearchContainer>
          <SearchInput
            type="text"
            placeholder="Search users..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </SearchContainer>
        <FilterContainer>
          <RoleFilter 
            value={selectedRole} 
            onChange={(e) => setSelectedRole(e.target.value)}
          >
            {roles.map(role => (
              <option key={role} value={role}>{role}</option>
            ))}
          </RoleFilter>
        </FilterContainer>
        <AddUserButton onClick={() => setShowAddModal(true)}>
          Add New User
        </AddUserButton>
      </ControlsContainer>

      {isLoading ? (
        <LoadingMessage>Loading users...</LoadingMessage>
      ) : (
        <UsersContainer>
          <UsersTable>
            <thead>
              <tr>
                <TableHeader>ID</TableHeader>
                <TableHeader>Name</TableHeader>
                <TableHeader>Email</TableHeader>
                <TableHeader>Role</TableHeader>
                <TableHeader>Department</TableHeader>
                <TableHeader>Status</TableHeader>
                <TableHeader>Actions</TableHeader>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.length > 0 ? (
                filteredUsers.map((user) => (
                  <TableRow key={user.id}>
                    <TableData>{user.id}</TableData>
                    <TableData>{user.name}</TableData>
                    <TableData>{user.email}</TableData>
                    <TableData>{user.role}</TableData>
                    <TableData>{user.department}</TableData>
                    <TableData>
                      <StatusSelect
                        status={user.status}
                        value={user.status}
                        onChange={(e) => handleStatusChange(user.id, e.target.value)}
                      >
                        <option value="Active">Active</option>
                        <option value="Inactive">Inactive</option>
                        <option value="Suspended">Suspended</option>
                      </StatusSelect>
                    </TableData>
                    <ActionButtonsContainer>
                      <EditButton onClick={() => handleEditUser(user)}>
                        Edit
                      </EditButton>
                      <DeleteButton onClick={() => handleDeleteUser(user.id)}>
                        Delete
                      </DeleteButton>
                    </ActionButtonsContainer>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <NoResults colSpan={7}>No users found</NoResults>
                </TableRow>
              )}
            </tbody>
          </UsersTable>
        </UsersContainer>
      )}

      {/* Add User Modal */}
      {showAddModal && (
        <ModalOverlay>
          <Modal>
            <ModalTitle>Add New User</ModalTitle>
            <form onSubmit={handleAddUser}>
              <FormGroup>
                <FormLabel>Name</FormLabel>
                <FormInput
                  type="text"
                  name="name"
                  value={newUser.name}
                  onChange={handleNewUserChange}
                  required
                />
              </FormGroup>
              
              <FormGroup>
                <FormLabel>Email</FormLabel>
                <FormInput
                  type="email"
                  name="email"
                  value={newUser.email}
                  onChange={handleNewUserChange}
                  required
                />
              </FormGroup>
              
              <FormGroup>
                <FormLabel>Role</FormLabel>
                <FormSelect
                  name="role"
                  value={newUser.role}
                  onChange={handleNewUserChange}
                  required
                >
                  <option value="student">Student</option>
                  <option value="lecturer">Lecturer</option>
                  <option value="admin">Admin</option>
                </FormSelect>
              </FormGroup>
              
              <FormGroup>
                <FormLabel>Department</FormLabel>
                <FormSelect
                  name="department"
                  value={newUser.department}
                  onChange={handleNewUserChange}
                  required
                >
                  <option value="">Select Department</option>
                  {departments.map(dept => (
                    <option key={dept} value={dept}>{dept}</option>
                  ))}
                </FormSelect>
              </FormGroup>
              
              <FormGroup>
                <FormLabel>Password</FormLabel>
                <FormInput
                  type="password"
                  name="password"
                  value={newUser.password}
                  onChange={handleNewUserChange}
                  required
                  minLength={8}
                />
              </FormGroup>
              
              <FormGroup>
                <FormLabel>Confirm Password</FormLabel>
                <FormInput
                  type="password"
                  name="confirmPassword"
                  value={newUser.confirmPassword}
                  onChange={handleNewUserChange}
                  required
                  minLength={8}
                />
              </FormGroup>
              
              <ModalButtonsContainer>
                <SubmitButton type="submit">Add User</SubmitButton>
                <CancelButton 
                  type="button" 
                  onClick={() => setShowAddModal(false)}
                >
                  Cancel
                </CancelButton>
              </ModalButtonsContainer>
            </form>
          </Modal>
        </ModalOverlay>
      )}

      {/* Edit User Modal */}
      {showEditModal && currentUser && (
        <ModalOverlay>
          <Modal>
            <ModalTitle>Edit User</ModalTitle>
            <form onSubmit={handleUpdateUser}>
              <FormGroup>
                <FormLabel>Name</FormLabel>
                <FormInput
                  type="text"
                  name="name"
                  value={currentUser.name}
                  onChange={handleCurrentUserChange}
                  required
                />
              </FormGroup>
              
              <FormGroup>
                <FormLabel>Email</FormLabel>
                <FormInput
                  type="email"
                  name="email"
                  value={currentUser.email}
                  onChange={handleCurrentUserChange}
                  required
                />
              </FormGroup>
              
              <FormGroup>
                <FormLabel>Role</FormLabel>
                <FormSelect
                  name="role"
                  value={currentUser.role}
                  onChange={handleCurrentUserChange}
                  required
                >
                  <option value="student">Student</option>
                  <option value="lecturer">Lecturer</option>
                  <option value="admin">Admin</option>
                </FormSelect>
              </FormGroup>
              
              <FormGroup>
                <FormLabel>Department</FormLabel>
                <FormSelect
                  name="department"
                  value={currentUser.department}
                  onChange={handleCurrentUserChange}
                  required
                >
                  {departments.map(dept => (
                    <option key={dept} value={dept}>{dept}</option>
                  ))}
                </FormSelect>
              </FormGroup>
              
              <ModalButtonsContainer>
                <SubmitButton type="submit">Update User</SubmitButton>
                <CancelButton 
                  type="button" 
                  onClick={() => setShowEditModal(false)}
                >
                  Cancel
                </CancelButton>
              </ModalButtonsContainer>
            </form>
          </Modal>
        </ModalOverlay>
      )}
    </UserManagementContainer>
  );
};

export default UserManagement;