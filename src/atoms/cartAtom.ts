/* eslint-disable import/prefer-default-export */
import { atom } from 'recoil';

export type CartDataType = {
  roomId: number;
  roomName: string;
  productName: string;
  startDate: string;
  endDate: string;
  standard: number;
  capacity: number;
  checkIn: string;
  checkOut: string;
  price: number;
};

export const cartDataState = atom<CartDataType[]>({
  key: 'cartData',
  default: [],
});
