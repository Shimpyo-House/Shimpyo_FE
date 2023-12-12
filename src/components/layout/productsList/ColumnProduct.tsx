/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */

import { css } from '@emotion/react';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { IoMdHeartEmpty } from 'react-icons/io';
import theme from '../../../style/theme';
import { ResponseProductsData } from '../../../types';
import Star from '../../common/star';
import changeProductData from '../../../hooks/changeProductData';

type PropsType = {
  resData: ResponseProductsData;
};

type SetType = {
  address: string | null;
  productName: string | null;
};

const ColumnProduct = ({ resData }: PropsType) => {
  const [changeData, setChangeData] = useState<SetType>({
    address: null,
    productName: null,
  });

  changeProductData(resData, setChangeData);

  return (
    <Link to={`/products/${resData.productId}`} css={ProductBox}>
      <div css={ImgBox}>
        <img css={ProductImg} src={resData.image} alt="숙소 대표 사진" />
        <p
          css={Heart}
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
          }}
        >
          <IoMdHeartEmpty />
        </p>
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

export default ColumnProduct;

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
    scale: 1.015;
  }
  &:active {
    scale: 0.985;
  }
`;

const ImgBox = css`
  position: relative;

  width: 100%;

  cursor: default;
`;

const ProductImg = css`
  width: 100%;
  height: 11.25rem;

  background-color: ${theme.colors.gray700};

  border-radius: 5px;
`;

const Heart = css`
  position: absolute;
  top: 0;
  right: 0;

  display: flex;
  justify-content: center;
  align-items: center;

  width: 3rem;
  height: 3rem;

  font-size: 1.875rem;
  color: rgb(255, 65, 65);
  transition: all 0.4s;

  z-index: 10;

  cursor: pointer;
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
