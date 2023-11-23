/* eslint-disable @typescript-eslint/no-use-before-define */
import React from 'react';
import { css } from '@emotion/react';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import { MdMenu } from 'react-icons/md';
import theme from '../../style/theme';
import rabbit from '/rabbit.jpg';

const Header = () => {
  return (
    <div css={Container}>
      <nav css={InnerContainer}>
        <h1 css={LogoText}>Shimpyo ,</h1>
        <div css={IconContainer}>
          <div css={CartContainer}>
            <AiOutlineShoppingCart css={CartIcon} />
            <span css={CartCount}>0</span>
          </div>
          <div css={MenuContainer}>
            <MdMenu css={MenuIcon} />
            <img src={rabbit} alt="사용자 프로필" css={Profile} />
          </div>
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

  width: 100%;
  height: 4.375rem;

  margin: 0 auto;

  max-width: 1280px;

  padding: 0.5rem 1rem;
`;

const LogoText = css`
  color: ${theme.colors.blue700};
  font-size: 2rem;

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

const MenuContainer = css`
  display: flex;
  align-items: center;
  gap: 1rem;

  padding: 0.2rem 1rem;

  border-radius: 3rem;

  background-color: ${theme.colors.gray200};
`;

const MenuIcon = css`
  width: 1.8rem;
  height: 1.8rem;

  color: ${theme.colors.gray700};

  cursor: pointer;
`;

const Profile = css`
  width: 3rem;
  height: 3rem;

  border-radius: 50%;

  cursor: pointer;
`;
