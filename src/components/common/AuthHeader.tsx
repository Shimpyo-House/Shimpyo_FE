/* eslint-disable @typescript-eslint/no-use-before-define */
import { css } from '@emotion/react';
import { MdMenu } from 'react-icons/md';
import { Link } from 'react-router-dom';
import theme from '../../style/theme';

const AuthHeader = () => {
  return (
    <div css={Container}>
      <nav css={InnerContainer}>
        <Link to="/">
          <h1 css={LogoText}>Shimpyo ,</h1>
        </Link>
        <MdMenu css={MenuIcon} />
      </nav>
    </div>
  );
};

export default AuthHeader;

const Container = css`
  display: block;
  position: fixed;
  top: 0;
  z-index: 999;

  width: 100%;
  height: 4.375rem;
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

const MenuIcon = css`
  width: 1.8rem;
  height: 1.8rem;

  color: ${theme.colors.gray700};

  cursor: pointer;
`;
