/* eslint-disable @typescript-eslint/no-use-before-define */
import { css } from '@emotion/react';
import React from 'react';

// import theme from '../../../style/theme';

export default function ProductsDetail() {
  return (
    <div css={ProductDetailContainer}>
      <div css={ProductDetailImgBox}>
        <div css={ProductDetailImg} />
      </div>
      <div css={ProductDetailBox}>
        <div css={ProductData}>
          <div css={NameScoreContainer}>
            <div css={ProductName}>파크하얏트 부산</div>
            <div css={ProductScore}>⭐ 4.7</div>
          </div>
          <div css={ProductsLocation}>부산광역시 해운대구 마린시티1로 51</div>
        </div>
      </div>
    </div>
  );
}

const ProductDetailContainer = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 4rem;
`;

const ProductDetailImgBox = css`
  width: 100%;
  //   max-width: 1000px;
`;

const ProductDetailBox = css`
  width: 100%;
  //   max-width: 1000px;
  display: flex;
  gap: 20px;
  margin-top: 3rem;
`;

const ProductDetailImg = css`
  width: 800;
  height: 500px;

  background-image: url('/public/img1.jpeg');
  background-size: cover;

  border-radius: 10px;
`;

const ProductData = css`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
`;

const NameScoreContainer = css`
  display: flex;
  justify-content: space-between;
  width: 100%;
  align-items: center;
  font-size: 14px;
`;

const ProductScore = css`
  margin-left: auto;
  font-size: 1.875rem;
  font-weight: bold;
  width: 6.25rem;
`;

export const ProductName = css`
  width: 100%;

  display: flex;
  justify-content: flex-start;

  font-size: 3rem;
  font-weight: 600;
`;

const ProductsLocation = css`
  width: 100%;

  display: flex;
  justify-content: flex-start;

  font-size: 2.25rem;
  font-weight: 600;

  margin-top: 2rem;
`;
