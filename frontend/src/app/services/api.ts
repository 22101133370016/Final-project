import axios from 'axios';
import type { FarmerSignupData } from '../types/api';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
});

// Add token to requests if available
api.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auth APIs
export const authApi = {
  farmerSignup: (data: FarmerSignupData) => api.post('/farmer/register', data),
  farmerAdminSignup: (data: any) => api.post('/farmer-admin/register', data),
  adminSignup: (data: any) => api.post('/admin/register', data),
  distributorSignup: (data: any) => api.post('/distributor/register', data),
  login: (data: any) => api.post('/login', data),
  logout: () => api.post('/logout')
};

// Farmer APIs
export const farmerApi = {
  getProfile: () => api.get('/farmer/profile'),
  updateProfile: (data: any) => api.put('/farmer/profile', data)
};

// Admin APIs
export const adminApi = {
  getDashboard: () => api.get('/admin/dashboard'),
  getAllFarmers: () => api.get('/admin/farmers')
};

// Distributor APIs
export const distributorApi = {
  getProfile: () => api.get('/distributor/profile')
};

// Resource APIs
export const resourceApi = {
  // Inputs
  getInputs: () => api.get('/inputs'),
  getInput: (id: string | number) => api.get(`/inputs/${id}`),
  createInput: (data: any) => api.post('/inputs', data),
  updateInput: (id: string | number, data: any) => api.put(`/inputs/${id}`, data),
  deleteInput: (id: string | number) => api.delete(`/inputs/${id}`),
  
  // Education Materials
  getEducationMaterials: () => api.get('/education'),
  getEducationMaterial: (id: string | number) => api.get(`/education/${id}`),
  createEducationMaterial: (data: any) => api.post('/education', data),
  updateEducationMaterial: (id: string | number, data: any) => api.put(`/education/${id}`, data),
  deleteEducationMaterial: (id: string | number) => api.delete(`/education/${id}`),
  
  // Prices
  getPrices: () => api.get('/prices'),
  getPrice: (id: string | number) => api.get(`/prices/${id}`),
  createPrice: (data: any) => api.post('/prices', data),
  updatePrice: (id: string | number, data: any) => api.put(`/prices/${id}`, data),
  deletePrice: (id: string | number) => api.delete(`/prices/${id}`)
};

export default api;
