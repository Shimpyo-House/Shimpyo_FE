import React from 'react';
import { css } from '@emotion/react';
import theme from '../../../style/theme';

export default function NormalProduct() {
  return (
    <div css={ProductBox}>
      <div css={ProductImg} />
      <div css={ProductName}>파크하얏트 부산</div>
      <div css={ProductScore}>⭐ 4.7</div>
      <div css={ProductPrice}>
        <span>80,000원 ~</span>
      </div>
    </div>
  );
}

const ProductBox = css`
  width: 330px;
  height: 340px;

  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;

  padding: 25px 20px;

  border: 1px solid ${theme.colors.gray300};
  border-radius: 10px;

  box-sizing: border-box;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
`;

const ProductImg = css`
  width: 100%;
  height: 180px;

  background-color: ${theme.colors.gray700};

  border-radius: 10px;
`;

export const ProductName = css`
  width: 100%;

  display: flex;
  justify-content: flex-start;

  font-size: 20px;
  font-weight: 600;
`;
export const ProductScore = css`
  width: 100%;

  display: flex;
  justify-content: flex-start;

  font-size: 14px;
`;
export const ProductPrice = css`
  width: 100%;

  display: flex;
  justify-content: flex-end;

  font-size: 16px;
  font-weight: 700;
`;
