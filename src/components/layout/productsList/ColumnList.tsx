/* eslint-disable @typescript-eslint/indent */

import { css } from '@emotion/react';
import RowProduct from './RowProduct';
import { ResponseProductsData } from '../../../types';
import SearchProduct from './SearchProduct';

type PropsType = {
  data: ResponseProductsData[];
  main: boolean;
};

const ColumnList = ({ data, main }: PropsType) => {
  return (
    <div css={ProductsBox}>
      {data && main
        ? data.map((e, i) => (
            <RowProduct resData={e} rank={i + 1} key={e.productId} />
          ))
        : data.map((e, i) => (
            <SearchProduct resData={e} rank={i + 1} key={e.productId} />
          ))}
    </div>
  );
};

export default ColumnList;

const ProductsBox = css`
  width: 100%;

  position: relative;

  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: flex-start;
  align-content: space-between;

  gap: 3.125rem;
`;
