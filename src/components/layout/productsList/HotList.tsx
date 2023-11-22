import { useState } from 'react';
import { css } from '@emotion/react';
import HotProduct from './HotProduct';
import theme from '../../../style/theme';
import { ResponseProductsData } from '../../../types';
import useFetchData from './useFetchData';

export default function HotList() {
  const [productData, setProductData] = useState<ResponseProductsData[] | null>(
    null,
  );

  useFetchData('인기상품', setProductData);

  return (
    <div css={ProductsBox}>
      {productData &&
        productData.map((e, i) => (
          <HotProduct resData={e} rank={i + 1} key={e.productId} />
        ))}
      <div css={CenterLine} />
    </div>
  );
}

const ProductsBox = css`
  width: 100%;
  height: 25.625rem;

  position: relative;

  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: flex-start;
  align-content: space-between;
`;

const CenterLine = css`
  width: 1px;
  height: 95%;

  position: absolute;
  top: 2.5%;
  left: 50%;

  background-color: ${theme.colors.gray400};
`;
