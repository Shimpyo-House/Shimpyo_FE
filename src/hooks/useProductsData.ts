import { useEffect } from 'react';
import { ResponseProducts, ResponseProductsData } from '../types';
import { axiosWithNoToken } from '../Axios';

const useProductsData = async (
  page: number,
  productsVolume: number,
  category: string,
): Promise<ResponseProductsData[] | [] | undefined> => {
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

const useSearchData = async (
  keyword: string,
  location: string,
  count: string,
  page: number,
) => {
  try {
    const countNumber = parseInt(count, 10);
    if (location === 'x' && keyword !== 'x') {
      const fetchData = await axiosWithNoToken.get<ResponseProducts>(
        `/api/products?page=${page}&size=30&productName=${keyword}&sort=starAvg,desc`,
      );
      const searchData = fetchData.data.data.filter(
        (products) => products.capacity >= countNumber,
      );

      return searchData;
    }
    if (keyword === 'x' && location !== 'x') {
      const fetchData = await axiosWithNoToken.get<ResponseProducts>(
        `/api/products?page=${page}&size=30&address=${location}&sort=starAvg,desc`,
      );
      const searchData = fetchData.data.data.filter(
        (products) => products.capacity >= countNumber,
      );

      return searchData;
    }
    if (keyword === 'x' && location === 'x') {
      const fetchData = await axiosWithNoToken.get<ResponseProducts>(
        `/api/products?page=${page}&size=30&sort=starAvg,desc`,
      );
      const searchData = fetchData.data.data.filter(
        (products) => products.capacity >= countNumber,
      );

      return searchData;
    }
    const fetchData = await axiosWithNoToken.get<ResponseProducts>(
      `/api/products?page=${page}&size=30&productName=${keyword}&address=${location}&sort=starAvg,desc`,
    );
    const searchData = fetchData.data.data.filter(
      (products) => products.capacity >= countNumber,
    );

    return searchData;
  } catch (error) {
    console.log(error);
  }
  return undefined;
};

const useObs = (
  obsHandler: (entries: IntersectionObserverEntry[]) => Promise<void>,
  obsRef: React.MutableRefObject<null>,
) => {
  useEffect(() => {
    const io = new IntersectionObserver(obsHandler, {
      threshold: 1,
    });
    if (obsRef.current) {
      io.observe(obsRef.current);
    }
    return () => {
      io.disconnect();
    };
  }, []);
};

export { useProductsData, useObs, useSearchData };
