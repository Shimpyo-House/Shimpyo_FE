/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */

import { useState } from 'react';
import { css } from '@emotion/react';
import { Star } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import changeProductData from '../../../hooks/changeProductData';
import { ResponseProductsData } from '../../../types';
import theme from '../../../style/theme';
import FavHeart from './FavHeart';

type PropsType = {
  resData: ResponseProductsData;
};

type SetType = {
  address: string | null;
  productName: string | null;
};

const FavProduct = ({ resData }: PropsType) => {
  const [changeData, setChangeData] = useState<SetType>({
    address: null,
    productName: null,
  });

  changeProductData(resData, setChangeData);

  return (
    <Link to={`/products/${resData.productId}`} css={ProductBox}>
      <div css={HeartBox}>
        <img css={ProductImg} src={resData.image} alt="숙소 대표 사진" />
        <div
          onClick={(e) => {
            e.stopPropagation();
            e.preventDefault();
          }}
        >
          <FavHeart
            productId={resData.productId}
            favorites={resData.favorites}
          />
        </div>
      </div>
      <p css={ProductName}>{changeData.productName}</p>
      <p css={ProductAddress}>{changeData.address}</p>
      <div css={ProductScore}>
        <div css={SpaceScore}>
          <Star />
          {resData.starAvg.toFixed(1)}
        </div>
      </div>
      <p css={ProductPrice}>{resData.price.toLocaleString()}원</p>
    </Link>
  );
};

export default FavProduct;

const ProductBox = css`
  width: 20.625rem;
  height: 21.25rem;

  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;

  padding: 1.5625rem 1.25rem;

  border: 1px solid ${theme.colors.gray300};
  border-radius: 10px;

  background-color: ${theme.colors.white};

  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);

  cursor: pointer;

  transition: 0.2s all;
  &:hover {
    background-color: ${theme.colors.blue100};
  }
`;

const HeartBox = css`
  position: relative;

  width: 100%;
`;

const ProductImg = css`
  width: 100%;
  height: 11.25rem;

  background-color: ${theme.colors.gray700};

  border-radius: 5px;
`;

const ProductName = css`
  width: 100%;

  display: flex;
  justify-content: flex-start;

  font-size: 1.25rem;
  font-weight: 600;
`;
const ProductAddress = css`
  width: 100%;
  display: flex;
  justify-content: flex-start;

  font-size: 0.8rem;
`;
const ProductScore = css`
  width: 100%;

  display: flex;
  justify-content: flex-start;

  font-size: 0.875rem;
`;
const SpaceScore = css`
  width: 2.4rem;

  display: flex;
  justify-content: space-between;
`;
const ProductPrice = css`
  width: 100%;

  display: flex;
  justify-content: flex-end;

  font-size: 1.35rem;
  font-weight: 700;
`;
