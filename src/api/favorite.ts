import { axiosWithAccessToken } from '../Axios';
import { FavoriteResponseProducts, SetFavoriteRes } from '../types';

const getFavorite = async (page: number) => {
  try {
    const fetchData = await axiosWithAccessToken.get<FavoriteResponseProducts>(
      `/api/favorites?page=${page}&size=20`,
    );
    return fetchData.data.data.products;
  } catch (error) {
    console.log(error);
  }
  return undefined;
};

const setFavorite = async (productId: string) => {
  try {
    const response: SetFavoriteRes | undefined =
      await axiosWithAccessToken.post(`/api/favorites/${productId}`);
    if (response) {
      return true;
    }
  } catch (error) {
    console.log(error);
  }
  return false;
};

const deleteFavorite = async (productId: string) => {
  try {
    const response: SetFavoriteRes | undefined =
      await axiosWithAccessToken.delete(`/api/favorites/${productId}`);
    if (response) {
      return true;
    }
  } catch (error) {
    console.log(error);
  }
  return false;
};

export { getFavorite, setFavorite, deleteFavorite };
