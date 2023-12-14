import { useQuery, useMutation, useQueryClient } from 'react-query';
import { useRecoilValue } from 'recoil';
import { cartGetAxios, cartDeleteItem, cartPostAxios } from '../api/cart';
import { PostRoomToCart } from '../types';
import { userAtom } from '../atoms/user';

const useCart = () => {
  const queryClient = useQueryClient();
  const user = useRecoilValue(userAtom);

  const getCartData = async () => {
    const data = await cartGetAxios(user);
    return data;
  };

  const cartGetQuery = useQuery([`${user} cart`], getCartData, {
    refetchOnWindowFocus: false,
  });

  const cartPostMutation = useMutation(
    async (requestData: PostRoomToCart) => {
      await cartPostAxios(requestData);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(`${user} cart`);
      },
    },
  );

  const deleteCartItemMutation = useMutation(
    async (cartId: number) => {
      await cartDeleteItem(cartId);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(`${user} cart`);
      },
    },
  );

  return {
    cartGetQuery,
    cartPostMutation,
    deleteCartItemMutation,
  };
};

export default useCart;
