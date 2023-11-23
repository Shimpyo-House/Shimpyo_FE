import axios from 'axios';

const OrderAxios = async () => {
  try {
    const response = await axios.post('/api/orders');
    return response.data.message;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export default OrderAxios;
