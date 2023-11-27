/* eslint-disable consistent-return */
import axios from 'axios';

const cartGetAxios = async () => {
  try {
    const response = await axios.get('/api/carts');
    return response.data.data;
  } catch (err) {
    alert('⚠️ 장바구니 에러');
  }
};

interface PostRoomData {
  roomId: number;
  startDate: string;
  endDate: string;
}

const cartPostToPay = async (roomData: PostRoomData[]) => {
  try {
    const response = await axios.post('/api/carts', {
      roomData,
    });
    return response.data.data;
  } catch (err) {
    alert('⚠️ 장바구니 post 에러');
  }
};

const cartDeleteItem = async (cartId: number) => {
  try {
    const response = await axios.delete(`/api/carts/${cartId}`);
    return response.data;
  } catch (err) {
    alert('⚠️ 장바구니 삭제 에러');
  }
};

export { cartGetAxios, cartPostToPay, cartDeleteItem };
