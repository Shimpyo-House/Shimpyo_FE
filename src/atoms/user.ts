import { atom } from 'recoil';

export type UserDataType = {
  memberId: number;
  email: string;
  name: string;
  photoUrl: string;
} | null;

/* eslint-disable import/prefer-default-export */
export const userAtom = atom<UserDataType>({
  key: 'userAtom',
  default: null,
});
