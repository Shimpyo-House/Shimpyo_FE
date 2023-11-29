import axios from 'axios';
import { getCookie } from './components/layout/auth/auth.utils';

const BASE_URL = import.meta.env.VITE_BACKEND_ENDPOINT;
const accessToken = getCookie('accessToken');

export const axiosWithAccessToken = axios.create({
  baseURL: BASE_URL,
  timeout: 2000,
  headers: {
    'Content-Type': 'application/json',
    withCredentials: true,
    Authorization: `Bearer ${accessToken}`,
  },
});

export const axiosWithNoToken = axios.create({
  baseURL: BASE_URL,
  timeout: 2000,
  headers: {
    'Content-Type': 'application/json',
    withCredentials: true,
  },
});
