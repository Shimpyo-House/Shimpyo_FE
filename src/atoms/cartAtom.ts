/* eslint-disable import/prefer-default-export */
import { atom } from 'recoil';
import { ResponseCartData } from '../types';

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

export type CartSoldOutData = {
  isAvailable: boolean;
  unavailableIds: number[];
};

export const cartSoldOutState = atom<CartSoldOutData>({
  key: 'cartSoldOutData',
  default: {
    isAvailable: false,
    unavailableIds: [],
  },
});

export type CartCheckedList = {
  checked: boolean;
};

export const cartCheckedRoomListState = atom<ResponseCartData[]>({
  key: 'cartCheckedList',
  default: [],
});
