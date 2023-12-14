import { axiosWithAccessToken } from '../Axios';
import { OrderedListData } from '../types';

const OrderListAxios = async (roomIds: OrderedListData) => {
  try {
    const response = await axiosWithAccessToken.get('/api/rooms', {
      params: roomIds,
    });
    console.log(response.data.data.rooms);
    return response.data.data.rooms;
  } catch (error) {
    console.error(error);
    return error;
  }
};

export default OrderListAxios;
