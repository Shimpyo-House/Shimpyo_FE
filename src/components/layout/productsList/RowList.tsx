import { useState } from 'react';
import { css } from '@emotion/react';
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
        productData.map((e) => <ColumnProduct resData={e} key={e.productId} />)}
    </div>
  );
};

export default RowList;

const ProdutsBox = css`
  display: flex;
  justify-content: space-between;
`;
