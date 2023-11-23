import { useState, useEffect } from 'react';
import { useAnimate, stagger, motion } from 'framer-motion';
import { css } from '@emotion/react';
import { MdMenu } from 'react-icons/md';
import theme from '../../../style/theme';
import rabbit from '../../../../public/rabbit.jpg';

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
  return (
    <nav css={MenuPosition} ref={scope}>
      <motion.button
        whileTap={{ scale: 0.97 }}
        onClick={() => setIsOpen(!isOpen)}
        css={MenuContainer}
      >
        <MdMenu css={MenuIcon} />
        <img src={rabbit} alt="사용자 프로필" css={Profile} />
      </motion.button>
      <ul
        css={ListBox}
        style={{
          pointerEvents: isOpen ? 'auto' : 'none',
          clipPath: 'inset(10% 50% 90% 50% round 10px)',
        }}
      >
        {/* 추후에 여기다가 링크나 모달 연결해서 쓰시면 됩니다! */}
        <li>내 정보</li>
        <li>결제 내역 </li>
        <li>로그아웃</li>
      </ul>{' '}
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

  padding: 0.2rem 1rem;

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
  width: 3rem;
  height: 3rem;

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
`;
