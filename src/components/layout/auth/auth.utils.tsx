import { Cookies } from 'react-cookie';

type CookieNameType = 'accessToken' | 'refreshToken';

const cookies = new Cookies();

export const getCookie = (name: CookieNameType) => {
  return cookies.get(name);
};

export const setCookie = (
  name: CookieNameType,
  value: string,
  options?: any,
) => {
  return cookies.set(name, value, { ...options });
};

// /* 토큰 갱신 로직 */
// export const reloadingAccessToken = () => {
//   /* 1. 리프레시 토큰으로 시도 */
//   const refreshToken = getCookie('refreshToken');
//   if (refreshToken) {
//     /* 전송 => 성공시  setCookie() return => 만약 실패 => */
//     const data = axiosWithNoToken.post('/api/auth/refresh', {
//       refreshToken,
//     });
//   } else {
//     /* 로그인 페이지 리다이렉트 */
//   }

//   /* 2. 리프레시 토큰 */
// };

export const escapeRegExp = (string: string) => {
  if (!string) return undefined;
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
};
