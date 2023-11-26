/* eslint-disable react/jsx-no-useless-fragment */
import { useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import { userData } from '../atoms/user';
import { axiosWithAccessToken, axiosWithNoToken } from '../Axios';
import { getCookie, setCookie } from '../components/layout/auth/auth.utils';

const ACCESS_TOKEN_EXPIRED_MESSAGE = '';
const REFRESH_TOKEN_EXPIRED_MESSAGE = '토큰의 회원 정보가 일치하지 않습니다.';

const useTokenRefresher = () => {
  const setUserData = useSetRecoilState(userData);
  const navigate = useNavigate();
  const tokenRefresh = useCallback(
    async ({
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
      console.log('token이 Refresh됐습니다.');

      const expireDate = new Date(accessTokenExpiresIn);
      console.log(expireDate);
      console.log(expireDate.toUTCString());

      setCookie('accessToken', accessToken, {
        secure: true,
        Expires: expireDate.toUTCString(),
      });
      setCookie('refreshToken', refreshToken, {
        secure: true,
        maxAge: 60 * 24 * 7,
      });

      setUserData(res.data.data.member);
    },
    [],
  );

  useEffect(() => {
    console.log('useTokenRefresh 시작');
    // setUserData({ name: '가상인물', email: 'hello', id: 123, photoUrl: '' });
    axiosWithAccessToken.interceptors.request.use(
      (config) => {
        const accessToken = getCookie('accessToken');
        if (!accessToken) navigate('/signin');

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
        console.log('response', response);
        return response;
      },
      async (error) => {
        console.log('error', error);
        if (error.response?.code === 401) {
          // const expiresTime = getCookie('accessTokenExpiresIn');
          const prevAccessToken = getCookie('accessToken');
          const prevRefreshToken = getCookie('refreshToken');

          if (error.response?.message === ACCESS_TOKEN_EXPIRED_MESSAGE) {
            await tokenRefresh({ prevAccessToken, prevRefreshToken });
            window.location.reload();
          } else if (
            error.response?.message === REFRESH_TOKEN_EXPIRED_MESSAGE
          ) {
            navigate('/signin');
            /* eslint-disable no-alert */
            alert('토큰이 만료되어 재로그인이 필요합니다');
            console.log('토큰이 만료되어 재로그인이 필요합니다');
          }
        }
        return Promise.reject(error);
      },
    );
    return () => {
      console.log('refresh token unmount');
    };
  }, []);
};

export default useTokenRefresher;
