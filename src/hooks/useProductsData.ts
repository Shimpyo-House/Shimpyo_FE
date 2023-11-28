import { ResponseProducts, ResponseProductsData } from '../types';
import { axiosWithNoToken } from '../Axios';

const useProductsData = async (
  page: number,
  productsVolume: number,
  category: string,
): Promise<ResponseProductsData[] | undefined> => {
  try {
    if (category === 'hot') {
      const fetchData = await axiosWithNoToken.get<ResponseProducts>(
        `/api/products?page=${page}&size=${productsVolume}&sort=starAvg,desc`,
      );
      return fetchData.data.data;
    }
    const fetchData = await axiosWithNoToken.get<ResponseProducts>(
      `/api/products?page=${page}&size=${productsVolume}&sort=starAvg,desc&category=${category}`,
    );
    return fetchData.data.data;
  } catch (error) {
    console.log(error);
    return undefined;
  }
};
export default useProductsData;
