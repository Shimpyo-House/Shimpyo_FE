import { useQuery, useMutation, useQueryClient } from 'react-query';
import { cartGetAxios, cartDeleteItem } from '../api/cart';

const useCart = () => {
  const queryClient = useQueryClient();
  const cartQuery = useQuery('cart', cartGetAxios);

  const deleteCartItemMutation = useMutation(
    async (cartId: number) => {
      await cartDeleteItem(cartId);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('cart');
      },
    },
  );

  return { cartQuery, deleteCartItemMutation };
};

export default useCart;
