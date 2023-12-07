import { Dispatch } from 'react';
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

const getQuery = (searchPrams: URLSearchParams) => {
  const queryData = {
    keyword: searchPrams.get('keyword') || '',
    count: searchPrams.get('count') || '',
    location: searchPrams.get('location') || '',
  };
  return queryData;
};

const getSearchData = async (
  pageParam: number,
  setIsEnd: Dispatch<React.SetStateAction<boolean>>,
  setIsReal: Dispatch<React.SetStateAction<boolean>>,
  searchPrams: URLSearchParams,
) => {
  try {
    const queryData = await getQuery(searchPrams);
    const fetchData = await useSearchData(
      queryData.keyword,
      queryData.location,
      queryData.count,
      pageParam,
    );
    console.log(fetchData);
    if (fetchData) {
      if (fetchData.length < 30) {
        setIsEnd(true);
      }
      if (fetchData.length === 0) {
        setIsReal(false);
        return undefined;
      }
      setIsReal(true);
      return fetchData;
    }
  } catch (error) {
    console.log(error);
  }
  return undefined;
};

export { getSearchData, useProductsData };