import axios from 'axios';
import { getToken } from '../utils/localStorage';

const { VITE_BACKEND_URL } = import.meta.env;
const token = getToken();

if (token) {
  axios.defaults.headers.common['Authorization'] = getToken();
}

const api = axios.create({
  baseURL: VITE_BACKEND_URL,
});

export default api;