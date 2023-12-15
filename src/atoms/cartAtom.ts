import { atom } from 'recoil';
import { ResponseCartData } from '../types';

export type CartDataType = {
  cartId: number;
  roomId: number;
  startDate: string;
  endDate: string;
};

export const cartDataState = atom<CartDataType[]>({
  key: 'cartData',
  default: [],
});

export type CartSoldOutData = {
  cartId: number;
  roomCode: number;
  roomId: number;
  startDate: string;
  endDate: string;
};

export const cartSoldOutState = atom<CartSoldOutData[]>({
  key: 'cartSoldOutData',
  default: [],
});

export type CartCheckedList = {
  checked: boolean;
};

export const cartCheckedRoomListState = atom<ResponseCartData[]>({
  key: 'cartCheckedList',
  default: [],
});
