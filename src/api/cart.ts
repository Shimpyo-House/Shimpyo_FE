/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-alert */
/* eslint-disable consistent-return */
import swal from 'sweetalert';
// import axios from 'axios';
import { axiosWithAccessToken } from '../Axios';
import { PostRoomData } from '../types';
import { getCookie } from '../components/layout/auth/auth.utils';

const cartGetAxios = async () => {
  const accessToken = getCookie('accessToken');
  try {
    if (accessToken) {
      const response = await axiosWithAccessToken.get('/api/carts');
      return response.data.data;
    }
  } catch (err) {
    console.error(err);
  }
};

const cartPostToJudgment = async (roomData: PostRoomData[]) => {
  try {
    const response = await axiosWithAccessToken.post(
      '/api/reservations/preoccupy',
      {
        roomData,
      },
    );
    return response.data.data;
  } catch (err) {
    swal({
      title: '장바구니 삭제 에러',
      icon: 'error',
    });
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
