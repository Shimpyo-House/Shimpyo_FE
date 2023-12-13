/* eslint-disable no-alert */
/* eslint-disable consistent-return */
// import Modal from 'react-modal';
// import { useState } from 'react';
import { axiosWithAccessToken } from '../Axios';
import { RoomData, PostRoomToCart } from '../types';
import { getCookie } from '../components/layout/auth/auth.utils';

const accessToken = getCookie('accessToken');

const cartGetAxios = async () => {
  try {
    if (accessToken) {
      const response = await axiosWithAccessToken.get('/api/carts');
      return response.data.data;
    }
  } catch (err) {
    console.error(err);
  }
};

const cartPostAxios = async (requestData: PostRoomToCart) => {
  try {
    const response = await axiosWithAccessToken.post('/api/carts', requestData);
    alert('상품을 장바구니에 성공적으로 담았습니다.');
    return response.data.data;
  } catch (error: any) {
    if (error.response && error.response.status === 403) {
      const errorMessage = error.response.data.message;
      alert('남은 객실 수 보다 초과해서 장바구니에 담을 수 없습니다.');
      console.error(errorMessage);
    } else {
      console.error('Error:', error);
    }
  }
};

const cartPostToJudgment = async (rooms: RoomData[]) => {
  try {
    const response = await axiosWithAccessToken.post(
      '/api/reservations/preoccupy',
      { rooms },
    );
    console.log(response.data.data);
    return response.data.data;
  } catch (err: any) {
    return err.response?.data?.data;
  }
};

const cartDeleteItem = async (cartId: number) => {
  try {
    const response = await axiosWithAccessToken.delete(`/api/carts/${cartId}`);
    return response.data;
  } catch (err) {
    console.error('장바구니 삭제 에러: ', err);
  }
};

export { cartGetAxios, cartPostAxios, cartPostToJudgment, cartDeleteItem };
