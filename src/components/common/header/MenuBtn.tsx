/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { useAnimate, stagger, motion } from 'framer-motion';
import { css } from '@emotion/react';
import { MdMenu } from 'react-icons/md';
import { useRecoilState } from 'recoil';
import theme from '../../../style/theme';
import userImg from '/user_default.svg';
import { userAtom } from '../../../atoms/user';
import { getCookie, removeCookie } from '../../layout/auth/auth.utils';

const staggerMenuItems = stagger(0.1, { startDelay: 0.15 });

function useMenuAnimation(isOpen: boolean) {
  const [scope, animate] = useAnimate();

  useEffect(() => {
    animate(
      'ul',
      {
        clipPath: isOpen
          ? 'inset(0% 0% 0% 0% round 10px)'
          : 'inset(0% 0% 100% 50% round 10px)',
      },
      {
        type: 'spring',
        bounce: 0,
        duration: 0.5,
      },
    );

    animate(
      'li',
      isOpen
        ? { opacity: 1, scale: 1, filter: 'blur(0px)' }
        : { opacity: 0, scale: 0.3, filter: 'blur(20px)' },
      {
        duration: 0.2,
        delay: isOpen ? staggerMenuItems : 0,
      },
    );
  }, [isOpen]);

  return scope;
}

const MenuBtn = () => {
  const [isOpen, setIsOpen] = useState(false);
  const scope = useMenuAnimation(isOpen);
  const [user, setUser] = useRecoilState(userAtom);
  const accessToken = getCookie('accessToken');

  useEffect(() => {
    const handleOutsideClick = () => {
      setIsOpen(false);
    };
    if (isOpen) {
      document.addEventListener('click', handleOutsideClick);
    }
    return () => {
      document.removeEventListener('click', handleOutsideClick);
    };
  }, [isOpen]);

  const handlerLogout = useCallback(() => {
    removeCookie('accessToken');
    removeCookie('refreshToken');
    removeCookie('accessTokenExpiresIn');

    setUser(null);

    alert('성공적으로 로그아웃 됐습니다.');
  }, []);

  return (
    <nav css={MenuPosition} ref={scope}>
      <motion.button
        whileTap={{ scale: 0.97 }}
        onClick={(e) => {
          e.stopPropagation();
          setIsOpen(!isOpen);
        }}
        css={MenuContainer}
      >
        <MdMenu css={MenuIcon} />
        <img
          src={user?.photoUrl || userImg}
          alt="사용자 프로필"
          css={Profile}
        />
      </motion.button>
      <ul
        css={ListBox}
        onClick={(e) => {
          e.stopPropagation();
        }}
        style={{
          pointerEvents: isOpen ? 'auto' : 'none',
          clipPath: 'inset(10% 50% 90% 50% round 10px)',
        }}
      >
        {accessToken ? (
          <>
            <li>
              <Link to="/mypage">내 정보</Link>
            </li>
            <li>
              <Link to="/reservation">결제 내역</Link>
            </li>
            <li
              onClick={handlerLogout}
              css={css`
                cursor: pointer;
              `}
            >
              로그아웃
            </li>
          </>
        ) : (
          <>
            <li>
              <Link to="/signin">로그인</Link>
            </li>
            <li>
              <Link to="/signup">회원가입</Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default MenuBtn;

const MenuPosition = css`
  display: flex;
  flex-direction: column;
  align-items: center;

  position: relative;
`;

const MenuContainer = css`
  display: flex;
  align-items: center;
  gap: 1rem;

  padding: 0.4rem 1rem;

  border-radius: 3rem;

  background-color: ${theme.colors.gray200};

  cursor: pointer;
`;

const MenuIcon = css`
  width: 1.8rem;
  height: 1.8rem;

  color: ${theme.colors.gray700};
`;

const Profile = css`
  width: 2.4rem;
  height: 2.4rem;

  border-radius: 50%;
`;

const ListBox = css`
  width: 14rem;

  position: absolute;
  top: 3.8rem;
  right: 0;

  display: flex;
  flex-direction: column;

  gap: 3rem;
  padding: 2rem 1.5rem;
  margin: 0;

  color: ${theme.colors.gray700};
  background: ${theme.colors.gray200};

  font-weight: 700;

  list-style: none;

  z-index: 10;
`;
