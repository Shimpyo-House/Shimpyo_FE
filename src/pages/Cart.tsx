/* eslint-disable import/no-cycle */
/* eslint-disable @typescript-eslint/no-use-before-define */
import React from 'react';
import { css } from '@emotion/react';
import theme from '../style/theme';
import CartItem from '../components/layout/cart/CartItem';
import CartTotal from '../components/layout/cart/CartTotal';

const Cart = () => {
  return (
    <>
      <label htmlFor="box" css={Label}>
        <input id="box" type="checkbox" css={CheckBox} />
        <p css={AllSelect}>전체 선택</p>
      </label>
      <CartItem />
      <CartTotal />
    </>
  );
};

export default Cart;

const Label = css`
  display: flex;
  align-items: center;
  gap: 0.8rem;

  margin: 1rem;
`;

export const CheckBox = css`
  width: 1.5rem;
  height: 1.5rem;

  border: 1.5px solid ${theme.colors.gray600};
  border-radius: 0.35rem;

  cursor: pointer;
  appearance: none;

  &:checked {
    border-color: transparent;

    background-image: url("data:image/svg+xml,%3csvg viewBox='0 0 16 16' fill='white' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M5.707 7.293a1 1 0 0 0-1.414 1.414l2 2a1 1 0 0 0 1.414 0l4-4a1 1 0 0 0-1.414-1.414L7 8.586 5.707 7.293z'/%3e%3c/svg%3e");
    background-size: 100% 100%;
    background-position: 50%;
    background-repeat: no-repeat;
    background-color: ${theme.colors.blue700};
  }
`;

const AllSelect = css`
  font-weight: 700;
`;
