import { css } from '@emotion/react';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import theme from '../../../style/theme';
import { ResponseProductsData } from '../../../types';
import Star from '../../common/star';
import changeProductData from '../../../hooks/changeProductData';

type PropsType = {
  resData: ResponseProductsData;
  rank: number | null;
};

type SetType = {
  address: string | null;
  productName: string | null;
};

const SearchProduct = ({ resData, rank }: PropsType) => {
  const [changeData, setChangeData] = useState<SetType>({
    address: null,
    productName: null,
  });

  changeProductData(resData, setChangeData);
  return (
    <Link to={`/products/${resData.productId}`}>
      <div css={ProductBox}>
        <div css={ProductImgBox}>
          <img css={ProductImg} src={resData.image} alt="숙소 대표 사진" />
          {rank && rank < 4 && <p css={ProductRank}>{rank}</p>}
        </div>
        <div css={ProductData}>
          <div css={NameScoreBox}>
            <p css={ProductName}>{changeData.productName}</p>
            <p css={ProductAddress}>{changeData.address}</p>
            <div css={ProductScore}>
              <div css={SpaceScore}>
                <Star />
                {resData.starAvg.toFixed(1)}
              </div>
            </div>
          </div>
          <p css={ProductPrice}>{resData.price.toLocaleString()}원</p>
        </div>
      </div>
    </Link>
  );
};

export default SearchProduct;

const ProductBox = css`
  width: 68.75rem;
  height: 20rem;

  display: flex;
  gap: 1.25rem;

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

const ProductImgBox = css`
  width: 20rem;
  height: 20rem;

  position: relative;

  border-radius: 5px;

  background-color: ${theme.colors.gray700};
`;

const ProductImg = css`
  width: 100%;
  height: 100%;

  position: absolute;
  top: 0;
  left: 0;

  border-radius: 5px 0 0 5px;

  z-index: 5;
`;

const ProductRank = css`
  width: 4rem;
  height: 4rem;

  display: flex;
  justify-content: center;
  align-items: center;

  position: absolute;
  top: 0;
  left: 0;

  color: #fff;
  background-color: rgba(0, 0, 0, 0.6);

  border-radius: 5px 0 5px 0;

  font-size: 25px;
  font-weight: 600;

  z-index: 10;
`;

const ProductData = css`
  flex: 1;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;

  padding: 2rem;
`;

const NameScoreBox = css`
  width: 100%;

  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  gap: 1rem;
`;

const ProductName = css`
  width: 100%;

  display: flex;
  justify-content: flex-start;

  font-size: 2.2rem;
  font-weight: 700;
`;
const ProductAddress = css`
  width: 100%;
  display: flex;
  justify-content: flex-start;

  font-size: 1.3rem;
`;
const ProductScore = css`
  width: 100%;

  display: flex;
  justify-content: flex-start;

  font-size: 1.3rem;
`;
const SpaceScore = css`
  width: 2.7rem;

  display: flex;
  justify-content: space-between;
`;
const ProductPrice = css`
  width: 100%;

  display: flex;
  justify-content: flex-end;

  font-size: 2.2rem;
  font-weight: 700;
`;
