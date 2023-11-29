/* eslint-disable @typescript-eslint/indent */

import { useQuery } from 'react-query';
import MainProductsList from '../components/layout/productsList/MainProductsList';
import { useProductsData } from '../hooks/useProductsData';
import { ResponseProductsData } from '../types';
import ListBackground from '../components/layout/productsList/ListBackground';

const getData = async () => {
  const hotData: ResponseProductsData[] | undefined = await useProductsData(
    0,
    4,
    'hot',
  );
  const pensionData: ResponseProductsData[] | undefined = await useProductsData(
    0,
    3,
    '펜션,풀빌라',
  );
  const hotelData: ResponseProductsData[] | undefined = await useProductsData(
    0,
    3,
    '호텔,모텔',
  );
  if (hotData && pensionData && hotelData) {
    const data = [[...hotData], [...pensionData], [...hotelData]];
    return data;
  }
  return undefined;
};

const Home = () => {
  const { isLoading, data } = useQuery<
    ResponseProductsData[][] | undefined,
    unknown
  >('main', getData, {
    refetchOnWindowFocus: false,
    staleTime: 100000,
  });

  return (
    <div>
      <ListBackground />
      {isLoading ? <div>Loading...</div> : <MainProductsList data={data} />}
    </div>
  );
};

export default Home;
