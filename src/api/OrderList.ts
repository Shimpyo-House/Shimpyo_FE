import { axiosWithAccessToken } from '../Axios';
import { OrderedList } from '../types';

const OrderListAxios = async (roomIds: OrderedList) => {
  try {
    const response = await axiosWithAccessToken.get('/api/rooms', {
      params: roomIds,
    });
    return response.data.data;
  } catch (error) {
    console.error(error);
    return error;
  }
};

export default OrderListAxios;
