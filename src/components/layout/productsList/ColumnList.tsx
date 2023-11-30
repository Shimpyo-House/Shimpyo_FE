import { css } from '@emotion/react';
import { useEffect } from 'react';
import RowProduct from './RowProduct';
import { ResponseProductsData } from '../../../types';

type PropsType = {
  data: ResponseProductsData[];
};

const ColumnList = ({ data }: PropsType) => {
  useEffect(() => {
    console.log(data);
  }, []);

  return (
    <div css={ProductsBox}>
      {data &&
        data.map((e, i) => (
          <RowProduct resData={e} rank={i + 1} key={e.productId} />
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
