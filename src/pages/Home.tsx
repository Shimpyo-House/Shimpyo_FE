/* eslint-disable @typescript-eslint/indent */

import { useQuery } from 'react-query';
import MainProductsList from '../components/layout/productsList/MainProductsList';
import { useQueryProductsData } from '../components/layout/productsList/useProductsData';
import { ResponseProductsData } from '../types';

const getData = async () => {
  const hotData: ResponseProductsData[] | undefined =
    await useQueryProductsData(4, 'hot');
  const pensionData: ResponseProductsData[] | undefined =
    await useQueryProductsData(3, 'pension');
  const hotelData: ResponseProductsData[] | undefined =
    await useQueryProductsData(3, 'hotel');
  if (hotData && pensionData && hotelData) {
    const data = [[...hotData], [...pensionData], [...hotelData]];
    return data;
  }
  return undefined;
};

const Home = () => {
  const { isLoading, isError, data } = useQuery<
    ResponseProductsData[][] | undefined,
    unknown
  >('main', getData, {
    refetchOnWindowFocus: false,
    staleTime: 50000,
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error!</div>;
  }
  // console.log(data);

  return <MainProductsList data={data} />;
};

export default Home;
