import { css } from '@emotion/react';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import { Link } from 'react-router-dom';

import theme from '../../../style/theme';
import MenuBtn from './MenuBtn';

const Header = () => {
  return (
    <div css={Container}>
      <nav css={InnerContainer}>
        <Link to="/" css={LogoText}>
          Shimpyo ,
        </Link>
        <div css={IconContainer}>
          <div css={CartContainer}>
            <Link to="/carts">
              <AiOutlineShoppingCart css={CartIcon} />
              <span css={CartCount}>0</span>
            </Link>
          </div>
          <MenuBtn />
        </div>
      </nav>
    </div>
  );
};

export default Header;

const Container = css`
  display: block;
  position: fixed;
  top: 0;
  z-index: 999;

  width: 100%;
  height: 4.375rem;

  background-color: ${theme.colors.white};

  border-bottom: 1px solid ${theme.colors.gray400};
`;

const InnerContainer = css`
  display: flex;
  justify-content: space-between;
  align-items: center;

<<<<<<< HEAD
  padding: 0.5rem 1rem;
  border-bottom: 1px solid ${theme.colors.gray400};
=======
  width: 100%;
  height: 4.375rem;

  margin: 0 auto;

  max-width: 1280px;

  padding: 0.5rem 1rem;
>>>>>>> ba8710e889bf165b2b3aea4d6bb628f3226cf6b1
`;

const LogoText = css`
  color: ${theme.colors.blue700};
  font-size: 2rem;
  font-weight: 700;

  cursor: pointer;
`;

const IconContainer = css`
  display: flex;
  align-items: center;
  gap: 2rem;
`;

const CartContainer = css`
  position: relative;
`;

const CartIcon = css`
  width: 2.5rem;
  height: 2.5rem;

  color: ${theme.colors.blue500};

  cursor: pointer;
  transition: all 0.3s ease-in-out;

  &:hover {
    color: ${theme.colors.blue700};
  }
`;

const CartCount = css`
  display: flex;
  justify-content: center;
  align-items: center;

  position: absolute;
  top: -0.3125rem;
  right: -0.3125rem;

  width: 1.25rem;
  height: 1.25rem;

  border-radius: 100%;

  color: ${theme.colors.white};
  background-color: ${theme.colors.blue700};
  font-weight: 700;
`;
