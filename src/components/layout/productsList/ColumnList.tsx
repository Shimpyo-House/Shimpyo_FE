import { css } from '@emotion/react';
import RowProduct from './RowProduct';
import theme from '../../../style/theme';
import { ResponseProductsData } from '../../../types';

type PropsType = {
  category: string;
  data: ResponseProductsData[];
};

const ColumnList = ({ category, data }: PropsType) => {
  return (
    <div css={ProductsBox}>
      {data &&
        category === 'hot' &&
        data.map((e, i) => (
          <RowProduct resData={e} rank={i + 1} key={e.productId} />
        ))}
      {data &&
        category !== 'hot' &&
        data.map((e) => (
          <RowProduct resData={e} rank={null} key={e.productId} />
        ))}
      <div css={CenterLine} />
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

const CenterLine = css`
  width: 1px;
  height: 98%;

  position: absolute;
  top: 1%;
  left: 50%;

  background-color: ${theme.colors.gray400};
`;
