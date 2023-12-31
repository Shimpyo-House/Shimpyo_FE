import { css } from '@emotion/react';
import { Link } from 'react-router-dom';
import theme from '../../style/theme';
import MenuBtn from './header/MenuBtn';

const AuthHeader = () => {
  return (
    <div css={Container}>
      <nav css={InnerContainer}>
        <Link to="/">
          <h1 css={LogoText}>Shimpyo ,</h1>
        </Link>
        <MenuBtn />
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
