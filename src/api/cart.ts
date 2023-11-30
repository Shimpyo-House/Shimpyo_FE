/* eslint-disable consistent-return */
import swal from 'sweetalert';
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

const cartPostToJudgment = async (rooms: PostRoomData[]) => {
  try {
    const response = await axiosWithAccessToken.post(
      '/api/reservations/preoccupy',
      {
        rooms,
      },
    );
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
    swal({
      title: '장바구니 삭제 에러',
      icon: 'error',
    });
  }
};

export { cartGetAxios, cartPostToJudgment, cartDeleteItem };
