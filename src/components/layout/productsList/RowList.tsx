import { useState } from 'react';
import { css } from '@emotion/react';
import { Link } from 'react-router-dom';
import ColumnProduct from './ColumnProduct';
import useFetchData from './useProductsData';
import { ResponseProductsData } from '../../../types';

type PropsType = {
  category: string;
};

const RowList = ({ category }: PropsType) => {
  const [productData, setProductData] = useState<ResponseProductsData[] | null>(
    null,
  );
  useFetchData(category, setProductData);
  return (
    <div css={ProductsBox}>
      {productData &&
        productData.map((e) => (
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
