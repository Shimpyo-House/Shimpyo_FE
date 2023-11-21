import React from 'react';
import { css } from '@emotion/react';
import NormalProduct from './NormalProduct';

export default function NormalList() {
  return (
    <div css={ProdutsBox}>
      <NormalProduct />
      <NormalProduct />
      <NormalProduct />
    </div>
  );
}

const ProdutsBox = css`
  display: flex;
  justify-content: space-between;
`;
