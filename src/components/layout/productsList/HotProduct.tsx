import { css } from '@emotion/react';
import React from 'react';
import { ProductName, ProductPrice, ProductScore } from './NormalProduct';
import theme from '../../../style/theme';

export default function HotProduct() {
  return (
    <div css={ProductBox}>
      <div css={ProductImg} />
      <div css={ProductData}>
        <div css={NameScoreBox}>
          <div css={ProductName}>파크하얏트 부산</div>
          <div css={ProductScore}>⭐ 4.7</div>
        </div>
        <div css={ProductPrice}>80,000원 ~</div>
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

  background-color: ${theme.colors.gray700};

  border-radius: 10px;
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
