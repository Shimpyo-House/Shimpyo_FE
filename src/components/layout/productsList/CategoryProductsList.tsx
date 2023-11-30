/* eslint-disable  @typescript-eslint/indent */
import { css } from '@emotion/react';
import { useInfiniteQuery } from 'react-query';
import { useEffect, useRef, useState } from 'react';
import { useSetRecoilState } from 'recoil';
import ColumnList from './ColumnList';
import { useObs, useProductsData } from '../../../hooks/useProductsData';
import { ResponseProductsData } from '../../../types';
import { loadingAtom } from '../../../atoms/loading';

type PropsType = {
  category: string;
};

const CategoryProductsList = ({ category }: PropsType) => {
  const setLoading = useSetRecoilState(loadingAtom);
  const [isEnd, setIsEnd] = useState(false);
  const [load, setLoad] = useState(false);
  const obsRef = useRef(null);
  const pageVolume = 16;

  const { data, fetchNextPage } = useInfiniteQuery<
    unknown,
    unknown,
    ResponseProductsData[]
  >(
    category,
    ({ pageParam = 0 }) => {
      return getData(pageParam);
    },
    {
      refetchOnWindowFocus: false,
      staleTime: 100000,
      getNextPageParam: (pageParam, allPage) => {
        if (!allPage) {
          return pageParam;
        }
        return allPage.length;
      },
    },
  );

  // 페이지에 다시 돌아왔을 때 더 로딩할 페이지가 있는지 확인 로직
  useEffect(() => {
    if (data)
      if (
        data?.pages[data.pages.length - 1] < data?.pages[data.pages.length - 2]
      ) {
        setIsEnd(true);
      }
  }, []);

  const obsHandler = async (entries: IntersectionObserverEntry[]) => {
    const target = entries[0];
    if (target.isIntersecting && !isEnd) {
      fetchNextPage();
    }
  };

  useObs(obsHandler, obsRef);

  const getData = async (pageParam: number) => {
    try {
      setLoad(true);
      setLoading({ isLoading: true, message: '데이터를 조회중입니다.' });
      const fetchData = await useProductsData(pageParam, pageVolume, category);
      if (fetchData) {
        if (fetchData.length < pageVolume) {
          setIsEnd(true);
        }
        return fetchData;
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoad(false);
      setLoading({ isLoading: false, message: '' });
    }
    return undefined;
  };

  return (
    <div css={PageBox}>
      <div css={ListBox}>
        <div css={CategoryNameBox}>
          <h2 css={CategoryName}>
            {category === 'hot' && '인기 숙소'}
            {category === '관광호텔' && '호텔'}
            {category === '한옥' && '한옥'}
          </h2>
          <p css={CategoryDesc}>
            {category === 'hot' && '가장 잘 나가는 숙소 추천'}
            {category === '관광호텔' && '지금 떠나는 도심 호캉스!'}
            {category === '한옥' && '한옥에서 즐기는 대한민국의 정취'}
          </p>
        </div>
        {data && data.pages && <ColumnList data={data.pages.flat()} />}
        {load && (
          <div css={SpinnerBox}>
            <img src="/spinner.gif" alt="로딩스피너" />
          </div>
        )}
        {!isEnd && <div ref={obsRef} />}
      </div>
    </div>
  );
};

export default CategoryProductsList;

const PageBox = css`
  position: relative;

  min-height: calc(100vh - 70px);

  display: flex;
  justify-content: center;

  background-color: rgba(255, 2555, 255, 0.8);
`;

const ListBox = css`
  width: 68.75rem;

  display: flex;
  flex-direction: column;

  padding: 3.125rem 0;
  gap: 3rem;
`;

const CategoryNameBox = css`
  position: relative;

  height: 6rem;

  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const CategoryName = css`
  font-size: 3rem;
  font-weight: 700;
`;

const CategoryDesc = css`
  font-size: 1.5rem;
  font-weight: 400;
`;

const SpinnerBox = css`
  display: flex;
  justify-content: center;

  height: 4rem;
`;
