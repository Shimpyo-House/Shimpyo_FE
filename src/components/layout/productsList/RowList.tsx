import { css } from '@emotion/react';
import { Link } from 'react-router-dom';
import ColumnProduct from './ColumnProduct';
import { ResponseProductsData } from '../../../types';

type PropsType = {
  data: ResponseProductsData[];
};

const RowList = ({ data }: PropsType) => {
  return (
    <div css={ProdutsBox}>
      {data &&
        data
          .slice(0, 3)
          .map((e) => <ColumnProduct resData={e} key={e.productId} />)}
    </div>
  );
};

export default RowList;

const ProductsBox = css`
  display: flex;
  justify-content: space-between;
`;
