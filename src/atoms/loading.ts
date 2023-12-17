import { atom } from 'recoil';

export type LoadingDataType = {
  isLoading: boolean;
  message: string;
};

export const loadingAtom = atom<LoadingDataType>({
  key: 'loadingAtom',
  default: { isLoading: false, message: '' },
});
