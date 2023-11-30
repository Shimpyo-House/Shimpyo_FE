/* eslint-disable no-alert */
/* eslint-disable consistent-return */
import axios from 'axios';
import { axiosWithAccessToken } from '../Axios';
import { PostRoomData } from '../types';

const cartGetAxios = async () => {
  try {
    const response = await axiosWithAccessToken.get('/api/carts');
    return response.data.data;
  } catch (err) {
    console.error(err);
  }
};

const cartPostToJudgment = async (roomData: PostRoomData[]) => {
  try {
    const response = await axios.post('/api/reservations/preoccupy', {
      roomData,
    });
    return response.data.data;
  } catch (err) {
    alert('⚠️ 장바구니 post 에러');
  }
};

const cartDeleteItem = async (cartId: number) => {
  try {
    const response = await axiosWithAccessToken.delete(`/api/carts/${cartId}`);
    return response.data;
  } catch (err) {
    alert('⚠️ 장바구니 삭제 에러');
  }
};

export { cartGetAxios, cartPostToJudgment, cartDeleteItem };
