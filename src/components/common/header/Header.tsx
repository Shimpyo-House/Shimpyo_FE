import { css } from '@emotion/react';
import { useRecoilValue } from 'recoil';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import theme from '../../../style/theme';
import MenuBtn from './MenuBtn';
import useGetUserData from '../../../hooks/useGetUserData';
import SearchBar from './searchBar/SearchBar';
import { userAtom } from '../../../atoms/user';
import useCart from '../../../hooks/useCart';

const Header = () => {
  useGetUserData();

  const user = useRecoilValue(userAtom);

  const { cartQuery } = user ? useCart() : { cartQuery: { data: [] } };

  return (
    <div css={Container}>
      <nav css={InnerContainer}>
        <Link to="/" css={LogoText}>
          Shimpyo ,
        </Link>
        <SearchBar />
        <div css={IconContainer}>
          {!user && <p>로그인을 해주세요</p>}
          <div css={CartContainer}>
            <Link to="/carts">
              <AiOutlineShoppingCart css={CartIcon} />
              <span css={CartCount}>
                {cartQuery ? cartQuery.data.length : 0}
              </span>
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

  border-bottom: 1px solid ${theme.colors.gray400};

  width: 100%;
  height: 4.375rem;

  margin: 0 auto;

  max-width: 1280px;

  padding: 0.5rem 1rem;
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

  padding: 0.7rem;

  width: 1.25rem;
  height: 1.25rem;

  border-radius: 100%;

  color: ${theme.colors.white};
  background-color: ${theme.colors.blue700};
  font-weight: 700;
`;
