import { css } from '@emotion/react';
import { ProductName, ProductPrice, ProductScore } from './NormalProduct';
import theme from '../../../style/theme';
import { ResponseProductsData } from '../../../types';

type PropsType = {
  resData: ResponseProductsData;
  rank: number;
};

export default function HotProduct({ resData, rank }: PropsType) {
  return (
    <div css={ProductBox}>
      <div css={ProductImg}>
        <p css={ProductRank}>{rank}</p>
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
}

const ProductBox = css`
  width: 30.3125rem;
  height: 11.5625rem;

  display: flex;
  gap: 1.25rem;

  padding: 1.25rem 1.25rem;

  border: 1px solid ${theme.colors.gray300};
  border-radius: 10px;

  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
`;

const ProductImg = css`
  width: 9.0625rem;
  height: 9.0625rem;

  position: relative;

  background-color: ${theme.colors.gray700};

  border-radius: 10px;
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
