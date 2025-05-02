import axios from 'axios';
import { User, UserFormValues } from '../types/user';

const API_URL = 'http://localhost:8082/api/users';

export const userService = {
  getAll: async (): Promise<User[]> => {
    try {
      const response = await axios.get(`${API_URL}/all`);
      console.log('User data received:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error fetching users:', error);
      throw error;
    }
  },
  
  getById: async (id: string): Promise<User> => {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
  },
  
  create: async (user: UserFormValues): Promise<User> => {
    const response = await axios.post(`${API_URL}/add`, user);
    return response.data;
  },
  
  update: async (id: string, user: UserFormValues): Promise<User> => {
    const response = await axios.put(`${API_URL}/${id}`, user);
    return response.data;
  },
  
  delete: async (id: string): Promise<void> => {
    await axios.delete(`${API_URL}/${id}`);
  },
  
  addCourse: async (userId: string, courseId: string): Promise<User> => {
    const response = await axios.post(`${API_URL}/${userId}/courses/${courseId}`);
    return response.data;
  },
  
  removeCourse: async (userId: string, courseId: string): Promise<User> => {
    const response = await axios.delete(`${API_URL}/${userId}/courses/${courseId}`);
    return response.data;
  },

  getUsersByRole: async (role: string): Promise<User[]> => {
    const response = await axios.get(`${API_URL}/role/${role}`);
    return response.data;
  }
};