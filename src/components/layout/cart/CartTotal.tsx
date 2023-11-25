/* eslint-disable react/button-has-type */
import { css } from '@emotion/react';
import theme from '../../../style/theme';

interface CartTotalProps {
  totalPrice: number;
  checkedList: number[];
}

const CartTotal = ({ totalPrice, checkedList }: CartTotalProps) => {
  return (
    <div css={Container}>
      <h2>전체 주문 합계</h2>
      <div css={Total}>
        <p>상품 금액</p>
        <p>{totalPrice}원</p>
      </div>
      <div css={Total}>
        <p>주문 상품 개수</p>
        <p>{checkedList.length}개</p>
      </div>
      <button css={OrderButton}>주문하기</button>
    </div>
  );
};

export default CartTotal;

const Container = css`
  display: flex;
  flex-direction: column;
  gap: 2rem;

  margin-bottom: 1rem;
  padding: 3rem;

  border-top: 1px solid ${theme.colors.gray400};
`;

const Total = css`
  display: flex;
  justify-content: space-around;

  color: ${theme.colors.gray700};
  font-size: 1.3rem;
  font-weight: 700;
`;

const OrderButton = css`
  width: 70%;

  margin: auto;
  margin-top: 1rem;
  padding: 1rem;

  border-radius: 0.5rem;

  font-size: 1.3rem;
  font-weight: 700;
  color: ${theme.colors.white};
  background-color: ${theme.colors.blue700};

  cursor: pointer;
  transition: all 0.15s ease-in-out;

  &:hover {
    background-color: ${theme.colors.blue600};
  }
`;
