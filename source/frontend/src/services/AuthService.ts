import axios from 'axios';

const API_URL = 'http://localhost:8082/api/auth'; 

export const authService = {
  // Admin login
  adminLogin: async (email: string, password: string) => {
    const response = await axios.post(`${API_URL}/admin/login`, { email, password });
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('userRole', 'ADMIN');
      localStorage.setItem('userData', JSON.stringify(response.data.user));
    }
    return response.data;
  },

  // Staff/Lecturer login
  lecturerLogin: async (email: string, password: string) => {
    const response = await axios.post(`${API_URL}/lecturer/login`, { email, password });
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('userRole', 'LECTURER');
      localStorage.setItem('userData', JSON.stringify(response.data.user));
    }
    return response.data;
  },

  // Student login
  studentLogin: async (email: string, password: string) => {
    const response = await axios.post(`${API_URL}/student/login`, { email, password });
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('userRole', 'STUDENT');
      localStorage.setItem('userData', JSON.stringify(response.data.user));
    }
    return response.data;
  },

  // Logout
  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userRole');
    localStorage.removeItem('userData');
  },

  // Get current user
  getCurrentUser: () => {
    const userData = localStorage.getItem('userData');
    return userData ? JSON.parse(userData) : null;
  },

  // Check if user is authenticated
  isAuthenticated: () => {
    return !!localStorage.getItem('token');
  },

  // Get user role
  getUserRole: () => {
    return localStorage.getItem('userRole');
  }
};