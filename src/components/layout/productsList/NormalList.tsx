import { useState } from 'react';
import { css } from '@emotion/react';
import NormalProduct from './NormalProduct';
import useFetchData from './useFetchData';
import { ResponseProductsData } from '../../../types';

type PropsType = {
  category: string;
};

export default function NormalList({ category }: PropsType) {
  const [productData, setProductData] = useState<ResponseProductsData[] | null>(
    null,
  );
  useFetchData(category, setProductData);
  return (
    <div css={ProdutsBox}>
      {productData && productData.map((e) => <NormalProduct resData={e} />)}
    </div>
  );
}

const ProdutsBox = css`
  display: flex;
  justify-content: space-between;
`;
