import axios from 'axios';
import { Lecturer, LecturerFormValues } from '../types/lecturer';

const API_URL = 'http://localhost:8082/api/lecturers';

export const lecturerService = {
  getAll: async (): Promise<Lecturer[]> => {
    const response = await axios.get(`${API_URL}/all`);
    return response.data;
  },
  
  getById: async (id: string): Promise<Lecturer> => {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
  },
  
  getByDepartment: async (department: string): Promise<Lecturer[]> => {
    const response = await axios.get(`${API_URL}/department/${department}`);
    return response.data;
  },
  
  create: async (lecturer: LecturerFormValues): Promise<Lecturer> => {
    const response = await axios.post(`${API_URL}/add`, lecturer);
    return response.data;
  },
  
  update: async (id: string, lecturer: LecturerFormValues): Promise<Lecturer> => {
    const response = await axios.put(`${API_URL}/${id}`, lecturer);
    return response.data;
  },
  
  delete: async (id: string): Promise<void> => {
    await axios.delete(`${API_URL}/${id}`);
  },
  
  addCourse: async (lecturerId: string, courseId: string): Promise<Lecturer> => {
    const response = await axios.post(`${API_URL}/${lecturerId}/courses/${courseId}`);
    return response.data;
  },
  
  removeCourse: async (lecturerId: string, courseId: string): Promise<Lecturer> => {
    const response = await axios.delete(`${API_URL}/${lecturerId}/courses/${courseId}`);
    return response.data;
  },
  
  // Additional lecturer-specific functions
  updateAvailability: async (lecturerId: string, availability: any): Promise<Lecturer> => {
    const response = await axios.put(`${API_URL}/${lecturerId}/availability`, availability);
    return response.data;
  },
  
  getAvailability: async (lecturerId: string): Promise<any> => {
    const response = await axios.get(`${API_URL}/${lecturerId}/availability`);
    return response.data;
  },
  
  getTeachingLoad: async (lecturerId: string): Promise<number> => {
    const response = await axios.get(`${API_URL}/${lecturerId}/teaching-load`);
    return response.data;
  }
};