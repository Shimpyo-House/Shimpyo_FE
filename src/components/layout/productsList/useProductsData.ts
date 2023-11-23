import axios from 'axios';
import { Dispatch, useEffect } from 'react';
import { ResponseProducts, ResponseProductsData } from '../../../types';

const useFetchData = (
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

export default useFetchData;
