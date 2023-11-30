/* eslint-disable @typescript-eslint/indent */

import { useQuery } from 'react-query';
import MainProductsList from '../components/layout/productsList/MainProductsList';
import { useProductsData } from '../hooks/useProductsData';
import { ResponseProductsData } from '../types';
import ListBackground from '../components/layout/productsList/ListBackground';

const getData = async () => {
  const fetchData: ResponseProductsData[] | undefined = await useProductsData(
    0,
    30,
    'hot',
  );

  if (fetchData) {
    const hotData: ResponseProductsData[] | undefined = fetchData.slice(0, 4);
    const pensionData: ResponseProductsData[] | undefined = fetchData
      .filter(
        (product) =>
          product.category === '관광호텔' ||
          product.category === '유스호스텔' ||
          product.category === '콘도미니엄',
      )
      .slice(0, 3);
    const hotelData: ResponseProductsData[] | undefined = fetchData
      .filter((product) => product.category === '한옥')
      .slice(0, 3);
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
      {isLoading ? <div>...</div> : <MainProductsList data={data} />}
    </div>
  );
};

export default Home;
