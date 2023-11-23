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
    <div css={ProdutsBox}>
      {productData &&
        productData.map((e) => (
          <Link to={`/products/${e.productId}`} key={e.productId}>
            {/* 각 상품을 클릭할 때 해당 상품의 ID를 URL에 전달 */}
            <ColumnProduct resData={e} />
          </Link>
        ))}
    </div>
  );
};

export default RowList;

const ProdutsBox = css`
  display: flex;
  justify-content: space-between;
`;
