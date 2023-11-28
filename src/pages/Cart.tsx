/* eslint-disable import/no-cycle */
import { useEffect, useState } from 'react';
import { ResponseCartData } from '../types';
import { cartGetAxios } from '../api/cart';
import CartItem from '../components/layout/cart/CartItem';

const Cart = () => {
  const [carts, setCarts] = useState<ResponseCartData[] | null>(null);

  useEffect(() => {
    const cartData = async () => {
      try {
        const data = await cartGetAxios();
        setCarts(data);
      } catch (error) {
        console.error('장바구니 error: ', error);
      }
    };
    cartData();
  }, []);

  return <CartItem carts={carts} />;
};

export default Cart;
