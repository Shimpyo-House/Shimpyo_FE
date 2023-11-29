/* eslint-disable react/button-has-type */
import { css } from '@emotion/react';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import theme from '../../../style/theme';

const CartNoItem = () => {
  return (
    <div css={Container}>
      <AiOutlineShoppingCart css={CartIcon} />
      <h1>장바구니에 담긴 상품이 없습니다.</h1>
      <h3>원하는 상품을 담아보세요!</h3>
      <Link to="/">
        <button css={HomeButton}>숙소 둘러보기</button>
      </Link>
    </div>
  );
};

export default CartNoItem;

const Container = css`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 2rem;

  height: calc(100vh - 5rem);
`;

const CartIcon = css`
  width: 12.5rem;
  height: 12.5rem;

  color: ${theme.colors.blue500};
`;

const HomeButton = css`
  margin-top: 1rem;
  padding: 1rem 2.5rem;

  border: 2px solid ${theme.colors.blue600};
  border-radius: 0.5rem;

  font-size: 1.2rem;
  color: ${theme.colors.blue700};

  &:hover {
    font-weight: 700;
  }
`;
