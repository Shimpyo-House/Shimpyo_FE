/* eslint-disable consistent-return */
import axios from 'axios';

const cartAxios = async () => {
  try {
    const response = await axios.get('/api/carts');
    return response.data.data;
  } catch (err) {
    alert('⚠️ 장바구니 에러');
  }
};

export default cartAxios;
