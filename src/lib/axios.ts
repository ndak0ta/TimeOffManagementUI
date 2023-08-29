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

export default axios;
