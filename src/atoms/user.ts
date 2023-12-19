import { atom } from 'recoil';

export type UserDataType = {
  memberId: number;
  email: string;
  name: string;
  photoUrl: string;
} | null;

export const userAtom = atom<UserDataType>({
  key: 'userAtom',
  default: null,
});
