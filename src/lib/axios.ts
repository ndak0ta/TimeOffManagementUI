import Axios from 'axios';
import { storage } from '@utils/storage';
import { API_URL } from '@config';

const axios = Axios.create({
    baseURL: API_URL
});

axios.defaults.headers.common['Authorization'] = `Bearer ${storage.getToken()}`;

export default axios;
