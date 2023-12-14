import { css } from '@emotion/react';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import ColumnList from './ColumnList';
import { ResponseProductsData } from '../../../types';
import theme from '../../../style/theme';
import { getSearchData } from '../../../api/productsList';

const SearchProductsList = () => {
  const [isReal, setIsReal] = useState(true);
  const [searchPrams] = useSearchParams();
  const [data, setData] = useState<ResponseProductsData[] | undefined>(
    undefined,
  );

  useEffect(() => {
    getData();
  }, [searchPrams]);

  const getData = async () => {
    const fetchData = await getSearchData(setIsReal, searchPrams);
    setData(fetchData);
  };

  return (
    <div css={PageBox}>
      <div css={ListBox}>
        <div css={CategoryName}>
          <p>검색결과</p>
        </div>
        {isReal && data && <ColumnList data={data} main={false} />}
        {!isReal && (
          <div css={FailBox}>
            <p css={FailText}>검색결과가 없습니다.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchProductsList;

const PageBox = css`
  position: relative;

  min-height: 100vh;

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
