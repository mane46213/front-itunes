import axios, { AxiosInstance } from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const apiClient: AxiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor pour ajouter le JWT token
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('admin_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Interceptor pour gérer les erreurs
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('admin_token');
      window.location.href = '/admin';
    }
    return Promise.reject(error);
  }
);

export const productService = {
  getAll: () => apiClient.get('/products'),
  getById: (id: string) => apiClient.get(`/products/${id}`),
  create: (data: unknown) => apiClient.post('/products', data),
  update: (id: string, data: unknown) => apiClient.put(`/products/${id}`, data),
  delete: (id: string) => apiClient.delete(`/products/${id}`),
};

export const orderService = {
  create: (data: unknown) => apiClient.post('/orders', data),
  getById: (id: string) => apiClient.get(`/orders/${id}`),
  checkPaymentStatus: (id: string) => apiClient.get(`/orders/${id}/payment-status`),
};

export const adminService = {
  login: (email: string, password: string) => 
    apiClient.post('/admin/login', { email, password }),
  getStats: () => apiClient.get('/admin/stats'),
  getOrders: (status?: string) => 
    apiClient.get(`/admin/orders${status ? `?status=${status}` : ''}`),
  deliverOrder: (id: string, itunes_codes: string[]) => 
    apiClient.put(`/admin/orders/${id}/deliver`, { itunes_codes }),
  cancelOrder: (id: string) => 
    apiClient.put(`/admin/orders/${id}/cancel`, {}),
  getProducts: () => apiClient.get('/admin/products'),
  createProduct: (data: unknown) => apiClient.post('/admin/products', data),
  updateProduct: (id: string, data: unknown) => apiClient.put(`/admin/products/${id}`, data),
  deleteProduct: (id: string) => apiClient.delete(`/admin/products/${id}`),
};

export default apiClient;
