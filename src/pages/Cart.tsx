/* eslint-disable import/no-cycle */
import useCart from '../hooks/useCart';
import CartItem from '../components/layout/cart/CartItem';
import CartNoItem from '../components/layout/cart/CartNoItem';

const Cart = () => {
  const {
    cartQuery: { data: cartData },
  } = useCart();

  return !cartData || cartData.length === 0 ? <CartNoItem /> : <CartItem />;
};

export default Cart;
