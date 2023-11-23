import { css } from '@emotion/react';
import theme from '../../../style/theme';
import { ResponseProductsData } from '../../../types';

type PropsType = {
  resData: ResponseProductsData;
  rank: number | null;
};

const RowProduct = ({ resData, rank }: PropsType) => {
  return (
    <div css={ProductBox}>
      <div css={ProductImg}>
        {rank && rank < 11 && <p css={ProductRank}>{rank}</p>}
      </div>
      <div css={ProductData}>
        <div css={NameScoreBox}>
          <div css={ProductName}>{resData.productName}</div>
          <div css={ProductScore}>⭐ {resData.starAvg}</div>
        </div>
        <div css={ProductPrice}>{resData.price.toLocaleString()}원 ~</div>
      </div>
    </div>
  );
};

export default RowProduct;

const ProductBox = css`
  width: 32.5rem;
  height: 15.625rem;

  display: flex;
  gap: 1.25rem;

  padding: 1.5rem;

  border: 1px solid ${theme.colors.gray300};
  border-radius: 10px;

  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);

  cursor: pointer;

  transition: 0.2s all;
  &:hover {
    scale: 1.015;
  }
  &:active {
    scale: 0.985;
  }
`;

const ProductImg = css`
  width: 12.5rem;
  height: 12.5rem;

  position: relative;

  background-color: ${theme.colors.gray700};

  border-radius: 5px;
`;

const ProductRank = css`
  width: 2.25rem;
  height: 2.25rem;

  display: flex;
  justify-content: center;
  align-items: center;

  position: absolute;
  top: 0;
  left: 0;

  color: #fff;
  background-color: rgba(0, 0, 0, 0.6);

  border-radius: 5px 0 5px 0;

  font-size: 16px;
`;

const ProductData = css`
  flex: 1;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
`;

const NameScoreBox = css`
  width: 100%;

  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  gap: 0.625rem;
`;

const ProductName = css`
  width: 100%;

  display: flex;
  justify-content: flex-start;

  font-size: 1.5rem;
  font-weight: 600;
`;
const ProductScore = css`
  width: 100%;

  display: flex;
  justify-content: flex-start;

  font-size: 1rem;
`;
const ProductPrice = css`
  width: 100%;

  display: flex;
  justify-content: flex-end;

  font-size: 1.25rem;
  font-weight: 700;
`;
