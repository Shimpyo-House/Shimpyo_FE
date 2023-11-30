import { axiosWithAccessToken } from '../Axios';

const OrderAxios = async () => {
  try {
    const response = await axiosWithAccessToken.get('/api/reservations');
    return response.data.data;
  } catch (error) {
    console.error(error);
    return error;
  }
};

export default OrderAxios;
