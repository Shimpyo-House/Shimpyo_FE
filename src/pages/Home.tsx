import { useQuery } from 'react-query';
import { useSetRecoilState } from 'recoil';
import MainProductsList from '../components/layout/productsList/MainProductsList';
import { DataType, ResponseProductsData } from '../types';
import ListBackground from '../components/layout/productsList/ListBackground';
import { loadingAtom } from '../atoms/loading';
import { useProductsData } from '../api/productsList';

const Home = () => {
  const setLoading = useSetRecoilState(loadingAtom);

  const getData = async () => {
    try {
      setLoading({ isLoading: true, message: '데이터를 조회중입니다.' });
      const response: DataType | undefined = (await useProductsData(
        0,
        110,
        'hot',
      )) as DataType | undefined;
      const fetchData: ResponseProductsData[] | undefined =
        response?.productResponses;
      if (fetchData) {
        const hotData: ResponseProductsData[] | undefined = fetchData.slice(
          0,
          4,
        );
        const hotelData: ResponseProductsData[] | undefined = fetchData
          .filter(
            (product) =>
              product.category === '관광호텔' ||
              product.category === '유스호스텔' ||
              product.category === '콘도미니엄',
          )
          .slice(0, 3);
        const pensionData: ResponseProductsData[] | undefined = fetchData
          .filter((product) => product.category === '펜션')
          .slice(0, 3);
        const koreaData: ResponseProductsData[] | undefined = fetchData
          .filter((product) => product.category === '한옥')
          .slice(0, 3);
        const data = [
          [...hotData],
          [...hotelData],
          [...pensionData],
          [...koreaData],
        ];
        return data;
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading({ isLoading: false, message: '' });
    }
    return undefined;
  };

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
