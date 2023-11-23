import axios from 'axios';
import { getCookie, setCookie } from './components/layout/auth/auth.utils';

const BASE_URL =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:5173'
    : 'https://backend_deploy.com';

export const axiosWithAccessToken = axios.create({
  baseURL: BASE_URL,
  timeout: 2000,
  headers: {
    'Content-Type': 'application/json',
    withCredentials: true,
  },
});

export const axiosWithNoToken = axios.create({
  baseURL: BASE_URL,
  timeout: 2000,
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosWithAccessToken.interceptors.request.use(
  (config) => {
    console.log(config);
    const accessToken = getCookie('accessToken');
    if (!accessToken) window.location.href = '/signin';

    /* eslint-disable no-param-reassign */
    config.headers.Authorization = `Bearer ${accessToken}`;
    return config;
  },
  (error) => {
    console.log('error', error);
  },
);

axiosWithAccessToken.interceptors.response.use(
  (response) => {
    console.log(response);
    return response;
  },
  async (error) => {
    console.log('error', error);
    if (error.response?.code === 401) {
      const expiresTime = getCookie('accessTokenExpiresIn');
      const prevAccessToken = getCookie('accessToken');
      const prevRefreshToken = getCookie('refreshToken');

      if (
        expiresTime &&
        expiresTime < Date.now() &&
        prevAccessToken &&
        prevRefreshToken
      ) {
        await tokenRefresh({ prevAccessToken, prevRefreshToken });
        /* eslint-disable no-alert */
        alert('here!');
      } else {
        window.location.href = '/signin';
      }
    }
  },
);

const tokenRefresh = async ({
  prevAccessToken,
  prevRefreshToken,
}: {
  prevAccessToken: string;
  prevRefreshToken: string;
}) => {
  const res = await axiosWithNoToken.post('/api/auth/refresh', {
    prevAccessToken,
    prevRefreshToken,
  });
  const { accessToken, accessTokenExpiresIn, refreshToken } =
    res.data.data.token;
  setCookie('accessToken', accessToken);
  setCookie('accessTokenExpiresIn', accessTokenExpiresIn);
  setCookie('refreshToken', refreshToken);
};
