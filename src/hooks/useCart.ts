import { useQuery, useMutation, useQueryClient } from 'react-query';
import { cartGetAxios, cartDeleteItem, cartPostAxios } from '../api/cart';
import { PostRoomToCart } from '../types';

const useCart = () => {
  const queryClient = useQueryClient();
  const cartGetQuery = useQuery(['cart'], cartGetAxios, {
    refetchOnWindowFocus: false,
  });

  const cartPostMutation = useMutation(
    async (requestData: PostRoomToCart) => {
      await cartPostAxios(requestData);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('cart');
      },
    },
  );

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

  return { cartGetQuery, cartPostMutation, deleteCartItemMutation };
};

export default useCart;
