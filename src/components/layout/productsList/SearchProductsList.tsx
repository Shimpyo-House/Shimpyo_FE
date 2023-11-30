/* eslint-disable  @typescript-eslint/indent */
import { css } from '@emotion/react';
import { useInfiniteQuery } from 'react-query';
import { useEffect, useRef, useState } from 'react';
import ColumnList from './ColumnList';
import { useObs, useSearchData } from '../../../hooks/useProductsData';
import { ResponseProductsData } from '../../../types';

type PropsType = {
  keyword: string;
  count: string;
  location: string;
};

const SearchProductsList = ({ keyword, count, location }: PropsType) => {
  const [isEnd, setIsEnd] = useState(false);
  const [isReal, setIsReal] = useState(false);
  const obsRef = useRef(null);

  const { data, fetchNextPage } = useInfiniteQuery<
    unknown,
    unknown,
    ResponseProductsData[]
  >(
    keyword,
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
      if (data?.pages[data.pages.length - 1].length === 0) {
        setIsEnd(true);
      }
  }, []);

  useEffect(() => {
    console.log(data?.pages);
  }, [data]);

  const obsHandler = async (entries: IntersectionObserverEntry[]) => {
    const target = entries[0];
    if (target.isIntersecting && !isEnd) {
      fetchNextPage();
    }
  };

  useObs(obsHandler, obsRef);

  const getData = async (pageParam: number) => {
    try {
      const fetchData = await useSearchData(
        keyword,
        location,
        count,
        pageParam,
      );
      if (fetchData) {
        if (fetchData.length === 0) {
          setIsEnd(true);
        }
        setIsReal(true);
        return fetchData;
      }
    } catch (error) {
      console.log(error);
    }
    return undefined;
  };

  return (
    <div css={PageBox}>
      <div css={ListBox}>
        <div css={CategoryNameBox}>
          <h2 css={CategoryName}>{keyword}</h2>
        </div>
        {isReal && data?.pages ? (
          <ColumnList data={data.pages.flat()} />
        ) : (
          <div>존재하지 않음</div>
        )}
        {!isEnd && <div ref={obsRef} />}
      </div>
    </div>
  );
};

export default SearchProductsList;

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
