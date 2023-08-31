import Axios, { InternalAxiosRequestConfig } from 'axios';
import { storage } from '@utils/storage';
import { API_URL } from '@config';

const axios = Axios.create({
    baseURL: API_URL
});

axios.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const token = storage.getToken();
  
  if (!config.headers) {
      return config;
  }

  if (token) {
    config.headers.authorization = `Bearer ${token}`;
  }
  
  config.headers.Accept = 'application/json';
  return config;
});

/* axios.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    if (error.response?.status === 401) {
      storage.clearToken();
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
); */

export default axios;
