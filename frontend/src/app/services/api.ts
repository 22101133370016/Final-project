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
  farmerAdminSignup: (data) => api.post('/farmer-admin/register', data),
  adminSignup: (data) => api.post('/admin/register', data),
  distributorSignup: (data) => api.post('/distributor/register', data),
  login: (data) => api.post('/login', data),
  logout: () => api.post('/logout'),

  // Farmer Admin specific APIs
  getFarmerAdminFarmers: () => api.get('/farmer-admin/farmers'),
  assignFarmerItem: (data) => api.post('/farmer-admin/assign-item', data),
  assignFarmerLoan: (data) => api.post('/farmer-admin/assign-loan', data),
  deleteFarmer: (id) => api.delete(`/farmer-admin/farmers/${id}`),
  updateFarmer: (id, data) => api.put(`/farmer-admin/farmers/${id}`, data),

  // Farmer Admin management APIs
  getFarmerAdmins: () => api.get('/farmer-admin/admins'),
  updateFarmerAdmin: (id, data) => api.put(`/farmer-admin/admins/${id}`, data),
  deleteFarmerAdmin: (id) => api.delete(`/farmer-admin/admins/${id}`),
};

// Farmer APIs
export const farmerApi = {
  getProfile: () => api.get('/farmer/profile'),
  updateProfile: (data) => api.put('/farmer/profile', data),
  getUpdates: () => api.get('/farmer/updates'),
  getDashboardData: () => api.get('/farmer/dashboard-data')
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
  getInput: (id) => api.get(`/inputs/${id}`),
  createInput: (data) => api.post('/inputs', data),
  updateInput: (id, data) => api.put(`/inputs/${id}`, data),
  deleteInput: (id) => api.delete(`/inputs/${id}`),

  // Education Materials
  getEducationMaterials: () => api.get('/education'),
  getEducationMaterial: (id) => api.get(`/education/${id}`),
  createEducationMaterial: (data) => api.post('/education', data),
  updateEducationMaterial: (id, data) => api.put(`/education/${id}`, data),
  deleteEducationMaterial: (id) => api.delete(`/education/${id}`),

  // Prices
  getPrices: () => api.get('/prices'),
  getPrice: (id) => api.get(`/prices/${id}`),
  createPrice: (data) => api.post('/prices', data),
  updatePrice: (id, data) => api.put(`/prices/${id}`, data),
  deletePrice: (id) => api.delete(`/prices/${id}`)
};

export default api;
