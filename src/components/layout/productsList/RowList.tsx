import { css } from '@emotion/react';
import { Link } from 'react-router-dom';
import ColumnProduct from './ColumnProduct';
import { ResponseProductsData } from '../../../types';

type PropsType = {
  data: ResponseProductsData[];
};

const RowList = ({ data }: PropsType) => {
  return (
    <div css={ProductsBox}>
      {data &&
        data.slice(0, 3).map((e) => (
          <Link to={`/products/${e.productId}`} key={e.productId}>
            <ColumnProduct resData={e} />
          </Link>
        ))}
    </div>
  );
};

export default RowList;

const ProductsBox = css`
  display: flex;
  justify-content: space-between;
`;
