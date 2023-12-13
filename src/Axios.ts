import axios from 'axios';
import { getCookie } from './components/layout/auth/auth.utils';

const BASE_URL = import.meta.env.VITE_BACKEND_ENDPOINT;
const accessToken = getCookie('accessToken');

export const axiosWithAccessToken = axios.create({
  baseURL: BASE_URL,
  timeout: 5000,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${accessToken}`,
  },
});

export const axiosWithNoToken = axios.create({
  baseURL: BASE_URL,
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
    withCredentials: true,
  },
});
