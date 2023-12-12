/* eslint-disable  @typescript-eslint/indent */
import { css } from '@emotion/react';
import { useInfiniteQuery } from 'react-query';
import { useRef, useState } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';
import ColumnList from './ColumnList';
import useObs from '../../../hooks/useObs';
import { ResponseProductsData } from '../../../types';
import theme from '../../../style/theme';
import { getSearchData } from '../../../api/productsList';

const SearchProductsList = () => {
  const [isEnd, setIsEnd] = useState(false);
  const [isReal, setIsReal] = useState(true);
  const queryLocation = useLocation();
  const [searchPrams] = useSearchParams();

  const obsRef = useRef(null);

  const { data, fetchNextPage } = useInfiniteQuery<
    unknown,
    unknown,
    ResponseProductsData[]
  >(
    queryLocation.key,
    ({ pageParam = 0 }) => {
      return getSearchData(pageParam, setIsEnd, setIsReal, searchPrams);
    },
    {
      refetchOnWindowFocus: false,
      getNextPageParam: (pageParam, allPage) => {
        if (!allPage) {
          return pageParam;
        }
        return allPage.length;
      },
    },
  );

  const obsHandler = async (entries: IntersectionObserverEntry[]) => {
    const target = entries[0];
    if (target.isIntersecting && !isEnd) {
      fetchNextPage();
    }
  };

  useObs(obsHandler, obsRef);

  return (
    <div css={PageBox}>
      <div css={ListBox}>
        <div css={CategoryName}>
          <p>검색결과</p>
        </div>
        {isReal && data?.pages && (
          <ColumnList data={data.pages.flat()} main={false} />
        )}
        {!isReal && (
          <div css={FailBox}>
            <p css={FailText}>검색결과가 없습니다.</p>
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
