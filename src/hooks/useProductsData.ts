import axios from 'axios';
import { Dispatch, useEffect } from 'react';
import { ResponseProducts, ResponseProductsData } from '../types';
import { axiosWithNoToken } from '../Axios';

const useSetProductsData = (
  category: string,
  set: Dispatch<React.SetStateAction<ResponseProductsData[] | null>>,
): void => {
  useEffect(() => {
    const fetchData = async (
      categoryName: string,
      setState: Dispatch<React.SetStateAction<ResponseProductsData[] | null>>,
    ) => {
      if (category === 'hot') {
        const data = await axios.get<ResponseProducts>(
          '/api/products?page=0&size=5&sort=starAvg,desc',
        );
        setState(data.data.data);
      } else {
        const data = await axios.get<ResponseProducts>(
          `/api/products?category=${categoryName}`,
        );
        setState(data.data.data);
      }
    };
    fetchData(category, set);
  }, []);
};

const useQueryProductsData = async (
  productsVolume: number,
  category: string,
): Promise<ResponseProductsData[] | undefined> => {
  try {
    if (category === 'hot') {
      const fetchData = await axiosWithNoToken.get<ResponseProducts>(
        `/api/products?page=0&size=${productsVolume}&sort=starAvg,desc`,
      );
      return fetchData.data.data;
    }
    const fetchData = await axiosWithNoToken.get<ResponseProducts>(
      `/api/products?page=0&size=${productsVolume}&sort=starAvg,desc&category=${category}`,
    );
    return fetchData.data.data;
  } catch (error) {
    console.log(error);
    return undefined;
  }
};

export { useSetProductsData, useQueryProductsData };
