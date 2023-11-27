import { atom } from 'recoil';

export type UserDataType = {
  id: number;
  email: string;
  name: string;
  photoUrl: string;
} | null;

/* eslint-disable import/prefer-default-export */
export const userData = atom<UserDataType>({
  key: 'userData',
  default: null,
});
