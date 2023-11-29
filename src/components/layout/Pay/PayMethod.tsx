// 결제 수단 컴포넌트

import { useEffect, useState } from 'react';
import { css } from '@emotion/react';
import theme from '../../../style/theme';
import kakaopay from '/kakaopay.png';
import tosspay from '/tosspay.png';
import naverpay from '/naverpay.png';
import paypalImg from '/paypal.png';

type PaymentMethodType = {
  img: string;
  title: string;
  subtitle: string;
};

type PaymentMethodsType = {
  KAKAO_PAY: PaymentMethodType;
  TOSS_PAY: PaymentMethodType;
  NAVER_PAY: PaymentMethodType;
  CREDIT_CARD: PaymentMethodType;
  PAYPAL: PaymentMethodType;
};

const PayMethod = () => {
  const [kakao, setKakao] = useState(false);
  const [toss, setToss] = useState(false);

  const [naver, setNaver] = useState(false);
  const [card, setCard] = useState(false);
  const [paypal, setPaypal] = useState(false);
  const [selected, setSelected] = useState<keyof PaymentMethodsType | null>(
    null,
  );

  const paymentMethods: PaymentMethodsType = {
    KAKAO_PAY: {
      img: kakaopay,
      title: '2만원 이상 결제 시 2천원 즉시할인',
      subtitle: '매일 오전 10시/일 선착순 1500명/기간 내 1회 적용',
    },
    TOSS_PAY: {
      img: tosspay,
      title: '3만원 이상 10% 할인 (최대 1만원)',
      subtitle: '매일 오전 10시/일 선착순 200명 대상/기간 내 1회 적용',
    },
    NAVER_PAY: {
      img: naverpay,
      title: '5만원 이상 결제 시 5천P 적립',
      subtitle:
        '12월 29일 적립 예정 (12월 27일까지 취소되지 않은 경우, 기간 내 1회 적용)',
    },
    CREDIT_CARD: {
      img: '',
      title: '',
      subtitle: '',
    },
    PAYPAL: {
      img: '',
      title: '',
      subtitle: '',
    },
  };

  useEffect(() => {
    const storedPaymentMethod = localStorage.getItem('selectedPaymentMethod');

    if (storedPaymentMethod) {
      handleButtonClick(storedPaymentMethod);
    }
  }, []);
  const handleButtonClick = (method: any) => {
    setSelected(method);

    setKakao(false);
    setToss(false);
    setNaver(false);
    setCard(false);
    setPaypal(false);

    switch (method) {
      case 'KAKAO_PAY':
        setKakao(true);
        break;
      case 'TOSS_PAY':
        setToss(true);
        break;
      case 'NAVER_PAY':
        setNaver(true);
        break;
      case 'CREDIT_CARD':
        setCard(true);
        break;
      case 'PAYPAL':
        setPaypal(true);
        break;
      default:
        break;
    }

    localStorage.setItem('PaymentMethod', method);
  };

  return (
    <nav css={PaymethodWrap}>
      <h1>결제 수단</h1>
      <div css={Method}>
        <button
          type="button"
          css={[PaymentWay, kakao && ActiveStyle]}
          onClick={() => handleButtonClick('KAKAO_PAY')}
        >
          <img src={kakaopay} alt="카카오페이" />
        </button>
        <button
          type="button"
          css={[PaymentWay, toss && ActiveStyle]}
          onClick={() => handleButtonClick('TOSS_PAY')}
        >
          <img src={tosspay} alt="토스페이" />
        </button>
        <button
          type="button"
          css={[PaymentWay, naver && ActiveStyle]}
          onClick={() => handleButtonClick('NAVER_PAY')}
        >
          <img src={naverpay} alt="네이버페이" />
        </button>
        <button
          type="button"
          css={[PaymentWay, card && ActiveStyle]}
          onClick={() => handleButtonClick('CREDIT_CARD')}
        >
          카드
        </button>
        <button
          type="button"
          css={[PaymentWay, paypal && ActiveStyle]}
          onClick={() => handleButtonClick('PAYPAL')}
        >
          <img src={paypalImg} alt="제작자: Roundicons - Flaticon" />
        </button>
      </div>

      {selected && (
        <div css={PaymentInfoWrap}>
          {paymentMethods[selected].img === '' ? (
            ''
          ) : (
            <div css={PaymentInfo}>
              <div>
                <img src={paymentMethods[selected].img} alt={selected} />
              </div>
              <span>{paymentMethods[selected].title}</span>
              <p>{paymentMethods[selected].subtitle}</p>
            </div>
          )}
        </div>
      )}
    </nav>
  );
};

const PaymethodWrap = css`
  width: 100%;
  padding: 2rem;

  margin-top: 1rem;

  box-shadow: 1px 1px 4px 0px #cacaca;
  border-radius: 5px;

  h1 {
    font-size: 1.4rem;
    font-weight: 900;
  }
`;

const Method = css`
  margin-top: 1rem;
  padding: 1rem;

  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(3, 1fr);
  gap: 1rem;
`;

const PaymentWay = css`
  display: flex;
  justify-content: center;
  align-items: center;

  height: 4rem;

  border: 1px solid ${theme.colors.gray400};
  border-radius: 5px;
  font-size: 1.2rem;
  transition: 0.2s;

  &:first-of-type {
    grid-column: span 2;
  }

  img {
    width: 5rem;
  }

  &:nth-of-type(2) {
    img {
      width: 8rem;
    }
  }

  &:hover {
    background-color: ${theme.colors.gray200};
  }

  &:active {
    border: 1px solid ${theme.colors.blue600};
    background-color: ${theme.colors.blue200};
  }
`;

const ActiveStyle = css`
  border: 1px solid ${theme.colors.blue600};
  background-color: ${theme.colors.blue200};
`;

const PaymentInfoWrap = css`
  margin: 1rem;
`;

const PaymentInfo = css`
  margin-top: 1rem;
  padding: 2rem;

  background-color: ${theme.colors.gray200};
  border-radius: 5px;

  img {
    width: 6rem;
  }

  span {
    margin-top: 1rem;
    display: block;

    font-size: 1.1rem;
    font-weight: 700;
  }

  p {
    margin-top: 0.8rem;
  }
`;

export default PayMethod;
