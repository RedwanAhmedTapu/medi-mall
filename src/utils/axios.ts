// src/utils/axios.ts
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000',
});

// Request interceptor for adding the access token to headers
api.interceptors.request.use(async (config) => {
  const token = localStorage.getItem('accessToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

// Response interceptor to handle token refresh
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshResponse = await axios.post('/auth/refresh-token');
        const newAccessToken = refreshResponse.data.accessToken;
        localStorage.setItem('accessToken', newAccessToken);

        axios.defaults.headers.common['Authorization'] = `Bearer ${newAccessToken}`;
        return api(originalRequest);
      } catch (err) {
        localStorage.removeItem('accessToken');
        window.location.href = '/login'; // Redirect to login on token expiration
      }
    }

    return Promise.reject(error);
  }
);

export default api;
