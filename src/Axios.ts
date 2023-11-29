import axios from 'axios';

// const BASE_URL =
//   process.env.NODE_ENV === 'development'
//     ? 'http://localhost:5173'
//     : `${import.meta.env.VITE_BACKEND_ENDPOINT}`;

const BASE_URL = 'http://localhost:5173';

export const axiosWithAccessToken = axios.create({
  baseURL: BASE_URL,
  timeout: 2000,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

export const axiosWithNoToken = axios.create({
  baseURL: BASE_URL,
  timeout: 2000,
  headers: {
    'Content-Type': 'application/json',
    withCredentials: true,
  },
});
