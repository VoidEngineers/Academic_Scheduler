import axios from 'axios';
import { User, UserFormValues } from '../types/user';

const API_URL = 'http://localhost:8082/api/users';

export const userService = {
  getAll: async (): Promise<User[]> => {
    const response = await axios.get(`${API_URL}/all`);
    return response.data;
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
  }
};