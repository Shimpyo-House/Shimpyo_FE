import axios from 'axios';

export const axiosWithAccessToken = axios.create({
  baseURL: 'https://localhost:5173/api',
  timeout: 2000,
  headers: {
    Authorization: `Bearer ${import.meta.env.VITE_ACCESS_TOKEN}`,
  },
});

export const axiosWithNoToken = axios.create({
  baseURL: 'https://localhost:5173/api',
  timeout: 2000,
  headers: {},
});
