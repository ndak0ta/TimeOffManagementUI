import Axios, { InternalAxiosRequestConfig } from 'axios';
import { storage } from '@utils/storage';
import { API_URL } from '@config';

const axios = Axios.create({
    baseURL: API_URL,
});

axios.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  if (!config.headers) {
    return config;
  }
  
  const token = storage.getToken();
  
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
    return Promise.reject(error);
  }
); */

export default axios;
