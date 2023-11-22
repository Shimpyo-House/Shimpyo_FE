/* eslint-disable import/no-cycle */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable @typescript-eslint/no-use-before-define */
import React from 'react';
import { css } from '@emotion/react';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { Label, CheckBox } from '../../../pages/Cart';
import theme from '../../../style/theme';
import cartimg from './cartimg.png';

const CartItem = () => {
  return (
    <>
      <div css={Container}>
        <label htmlFor="box" css={Label}>
          <input id="box" type="checkbox" css={CheckBox} />
        </label>
        <img css={CartImg} src={cartimg} alt="장바구니 상품 이미지" />
        <div css={DescriptionContainer}>
          <h3 css={RoomName}>남해 글래드810 풀빌라</h3>
          <p css={RoomPeriod}>2023.11.20 (월) ~ 2023.11.21 (화)</p>
          <p css={RooType}>디럭스룸</p>
          <p css={RoomPerson}>기준 8명 / 최대 12명</p>
          <p css={RoomDescription}>왕의 침대.. 왕의 TV... 왕관...</p>
        </div>
        <div css={RightContainer}>
          <RiDeleteBin6Line css={DeleteIcon} />
          <div css={PriceContainer}>
            <p css={Price}>숙박 10,000원</p>
            <p css={PriceText}>취소 및 환불 불가</p>
          </div>
        </div>
      </div>
      <div css={Container}>
        <label htmlFor="box" css={Label}>
          <input id="box" type="checkbox" css={CheckBox} />
        </label>
        <img css={CartImg} src={cartimg} alt="장바구니 상품 이미지" />
        <div css={DescriptionContainer}>
          <h3 css={RoomName}>남해 글래드810 풀빌라</h3>
          <p css={RoomPeriod}>2023.11.20 (월) ~ 2023.11.21 (화)</p>
          <p css={RooType}>디럭스룸</p>
          <p css={RoomPerson}>기준 8명 / 최대 12명</p>
          <p css={RoomDescription}>왕의 침대.. 왕의 TV... 왕관...</p>
        </div>
        <div css={RightContainer}>
          <RiDeleteBin6Line css={DeleteIcon} />
          <div css={PriceContainer}>
            <p css={Price}>숙박 10,000원</p>
            <p css={PriceText}>취소 및 환불 불가</p>
          </div>
        </div>
      </div>
      <div css={Container}>
        <label htmlFor="box" css={Label}>
          <input id="box" type="checkbox" css={CheckBox} />
        </label>
        <img css={CartImg} src={cartimg} alt="장바구니 상품 이미지" />
        <div css={DescriptionContainer}>
          <h3 css={RoomName}>남해 글래드810 풀빌라</h3>
          <p css={RoomPeriod}>2023.11.20 (월) ~ 2023.11.21 (화)</p>
          <p css={RooType}>디럭스룸</p>
          <p css={RoomPerson}>기준 8명 / 최대 12명</p>
          <p css={RoomDescription}>왕의 침대.. 왕의 TV... 왕관...</p>
        </div>
        <div css={RightContainer}>
          <RiDeleteBin6Line css={DeleteIcon} />
          <div css={PriceContainer}>
            <p css={Price}>숙박 10,000원</p>
            <p css={PriceText}>취소 및 환불 불가</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default CartItem;

const Container = css`
  display: flex;
  align-items: flex-start;

  height: 15rem;

  margin: 3rem 0;
`;

const CartImg = css`
  width: 15rem;
  height: 15rem;
  flex-shrink: 0;
`;

const DescriptionContainer = css`
  display: flex;
  flex-direction: column;
  justify-content: space-around;

  width: 60%;
  height: 90%;

  margin-left: 2rem;
`;

const RoomName = css`
  font-size: 1.5rem;
`;

const RoomPeriod = css`
  font-size: 0.95rem;
`;

const RooType = css`
  font-size: 0.95rem;
  color: ${theme.colors.gray700};
`;

const RoomPerson = css`
  font-size: 0.95rem;
  color: ${theme.colors.gray700};
`;

const RoomDescription = css`
  font-size: 0.95rem;
  color: ${theme.colors.gray700};
`;

const RightContainer = css`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-end;

  height: 90%;
`;

const DeleteIcon = css`
  width: 2rem;
  height: 2rem;

  color: ${theme.colors.gray700};

  cursor: pointer;
  transition: all 0.15s ease-in-out;

  &:hover {
    color: ${theme.colors.gray500};
  }
`;

const PriceContainer = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
`;

const Price = css`
  font-weight: 700;
`;

const PriceText = css`
  font-size: 0.8rem;
  font-weight: 700;
  color: ${theme.colors.error};
`;
