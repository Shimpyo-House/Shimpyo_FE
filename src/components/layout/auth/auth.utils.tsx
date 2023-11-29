import { Cookies } from 'react-cookie';

type CookieNameType = 'accessToken' | 'refreshToken' | 'accessTokenExpiresIn';

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

export const removeCookie = (name: CookieNameType) => {
  cookies.remove(name);
};

export const escapeRegExp = (string: string) => {
  if (!string) return undefined;
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
};
