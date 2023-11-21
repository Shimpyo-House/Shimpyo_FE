import axios from 'axios';

const BASE_URL =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:5173'
    : 'https://backend_deploy.com';

export const axiosWithAccessToken = axios.create({
  baseURL: BASE_URL,
  timeout: 2000,
  headers: {
    Authorization: `Bearer ${import.meta.env.VITE_ACCESS_TOKEN}`,
    'Content-Type': 'application/json',
    withCredentials: true,
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
