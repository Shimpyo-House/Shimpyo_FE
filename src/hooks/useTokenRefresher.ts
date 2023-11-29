/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable no-param-reassign */
/* eslint-disable no-else-return */
/* eslint-disable no-alert */

import { useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import { userAtom } from '../atoms/user';
import { axiosWithAccessToken, axiosWithNoToken } from '../Axios';
import { getCookie, setCookie } from '../components/layout/auth/auth.utils';
import {
  REFRESH_TOKEN_EXPIRED_MESSAGE,
  WRONG_PASSWORD_MESSAGE,
} from '../components/layout/auth/auth.constant';
import { loadingAtom } from '../atoms/loading';

const useTokenRefresher = () => {
  const setUserData = useSetRecoilState(userAtom);
  const setLoading = useSetRecoilState(loadingAtom);
  const navigate = useNavigate();
  const tokenRefresh = useCallback(
    async ({
      prevAccessToken,
      prevRefreshToken,
    }: {
      prevAccessToken: string;
      prevRefreshToken: string;
    }) => {
      try {
        setLoading({
          isLoading: true,
          message: '토큰이 리프레시 되고 있습니다.',
        });
        const res = await axiosWithNoToken.post('/api/auth/refresh', {
          accessToken: prevAccessToken,
          refreshToken: prevRefreshToken,
        });

        const { accessToken, accessTokenExpiresIn, refreshToken } =
          res.data.data.token;

        const option = {
          secure: true,
          maxAge: 60 * 24 * 7,
          // httpOnly: true,
        };

        /* 쿠키 => Access, Refresh */
        setCookie('accessToken', accessToken, option);
        setCookie('refreshToken', refreshToken, option);
        setCookie('accessTokenExpiresIn', accessTokenExpiresIn, option);

        setUserData(res.data.data.member);

        alert('token이 Refresh됐습니다.');
      } catch (e) {
        console.log(e);
      } finally {
        setLoading({ isLoading: false, message: '' });
      }
    },
    [],
  );

  useEffect(() => {
    console.log('useTokenRefresh mount');
    axiosWithAccessToken.interceptors.request.use(
      (config) => {
        const accessToken = getCookie('accessToken');
        const refreshToken = getCookie('refreshToken');
        const accessTokenExpiresIn = getCookie('accessTokenExpiresIn');

        if (!accessToken) {
          navigate('/');
          return config;
        } else if (Date.now() > accessTokenExpiresIn) {
          tokenRefresh({
            prevAccessToken: accessToken,
            prevRefreshToken: refreshToken,
          });
        }
        return config;
      },
      (error) => {
        console.log(error);
      },
    );

    axiosWithAccessToken.interceptors.response.use(
      (response) => {
        console.log('response', response);
        return response;
      },
      async (error) => {
        if (error.response?.data.code === 401) {
          const prevAccessToken = getCookie('accessToken');
          const prevRefreshToken = getCookie('refreshToken');

          /* Refresh Token 만료시 */
          if (error.response?.data.message === REFRESH_TOKEN_EXPIRED_MESSAGE) {
            navigate('/signin');
            alert('토큰이 만료되어 재로그인이 필요합니다');

            /* Access Token 만료 및 로그인 정보 없을 시 */
          } else if (!prevAccessToken) {
            await tokenRefresh({ prevAccessToken, prevRefreshToken });
          } else if (error.response?.data.message === WRONG_PASSWORD_MESSAGE) {
            return Promise.reject(error);
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
