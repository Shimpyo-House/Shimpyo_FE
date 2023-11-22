import React from 'react';
import HotProduct from './HotProduct';
import { css } from '@emotion/react';
import theme from '../../../style/theme';

export default function HotList() {
  return (
    <div css={ProductsBox}>
      <HotProduct />
      <HotProduct />
      <HotProduct />
      <HotProduct />
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
