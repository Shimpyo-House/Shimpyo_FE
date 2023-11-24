/* eslint-disable import/no-cycle */
import { useEffect, useState } from 'react';
import { ResponseCartsData } from '../types';
import cartAxios from '../api/cart';
import CartItem from '../components/layout/cart/CartItem';
import CartTotal from '../components/layout/cart/CartTotal';

const Cart = () => {
  const [carts, setCarts] = useState<ResponseCartsData[] | null>(null);

  useEffect(() => {
    const cartData = async () => {
      try {
        const data = await cartAxios();
        setCarts(data);
      } catch (error) {
        console.error('장바구니 error: ', error);
      }
    };

    cartData();
  }, []);

  return (
    <>
      <CartItem carts={carts} />
      <CartTotal />
    </>
  );
};

export default Cart;
