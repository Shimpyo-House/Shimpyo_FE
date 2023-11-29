import { atom } from 'recoil';

export type LoadingDataType = {
  isLoading: boolean;
  message: string;
};

/* eslint-disable import/prefer-default-export */
export const loadingAtom = atom<LoadingDataType>({
  key: 'loadingAtom',
  default: { isLoading: false, message: '' },
});
