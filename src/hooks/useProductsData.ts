import axios from 'axios';
import { Dispatch, useEffect } from 'react';
import { ResponseProducts, ResponseProductsData } from '../types';

const useSetProductsData = (
  category: string,
  set: Dispatch<React.SetStateAction<ResponseProductsData[] | null>>,
): void => {
  useEffect(() => {
    const fetchData = async (
      categoryName: string,
      setState: Dispatch<React.SetStateAction<ResponseProductsData[] | null>>,
    ) => {
      const data = await axios.get<ResponseProducts>(
        `/api/products?category=${categoryName}`,
      );
      setState(data.data.data);
    };
    fetchData(category, set);
  }, []);
};

const useQueryProductsData = async (
  productsVolume: number,
  category: string,
): Promise<ResponseProductsData[] | undefined> => {
  try {
    const fetchData = await axios.get<ResponseProducts>(
      `/api/products?category=${category}`,
    );
    const data = fetchData.data.data.slice(0, productsVolume);
    return data;
  } catch (error) {
    console.log(error);
    return undefined;
  }
};

export { useSetProductsData, useQueryProductsData };
