/* eslint-disable  @typescript-eslint/indent */
import { css } from '@emotion/react';
import { useInfiniteQuery } from 'react-query';
import { useEffect, useRef, useState } from 'react';
import ColumnList from './ColumnList';
import { useObs, useSearchData } from '../../../hooks/useProductsData';
import { ResponseProductsData } from '../../../types';
import theme from '../../../style/theme';

type PropsType = {
  keyword: string;
  count: string;
  location: string;
};

const SearchProductsList = ({ keyword, count, location }: PropsType) => {
  const [isEnd, setIsEnd] = useState(false);
  const [isReal, setIsReal] = useState(true);
  const [load, setLoad] = useState(false);
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
      const fetchData = await useSearchData(
        keyword,
        location,
        count,
        pageParam,
      );
      if (fetchData) {
        if (fetchData.length === 0) {
          setIsEnd(true);
          setIsReal(false);
          return undefined;
        }
        setIsReal(true);
        return fetchData;
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoad(false);
    }
    return undefined;
  };

  return (
    <div css={PageBox}>
      <div css={ListBox}>
        <div css={CategoryName}>
          <p>검색결과</p>
        </div>
        {isReal && data?.pages && <ColumnList data={data.pages.flat()} />}
        {!isReal && (
          <div css={FailBox}>
            <p css={FailText}>검색결과가 없습니다.</p>
          </div>
        )}
        {load && (
          <div css={SpinnerBox}>
            <img src="../../../public/spinner.gif" alt="로딩스피너" />
          </div>
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

const CategoryName = css`
  display: flex;
  flex-direction: column;
  justify-content: center;

  height: 6rem;

  font-size: 3rem;
  font-weight: 700;
`;

const ListBox = css`
  width: 68.75rem;

  display: flex;
  flex-direction: column;

  padding: 3.125rem 0;
  gap: 3rem;
`;

const SpinnerBox = css`
  display: flex;
  justify-content: center;

  height: 4rem;
`;

const FailBox = css`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  font-size: 3.125rem;
  font-weight: 700;
  color: ${theme.colors.gray700};
`;

const FailText = css`
  margin-bottom: 10rem;
`;
