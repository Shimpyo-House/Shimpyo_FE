import { useEffect, useState } from 'react';
import { css } from '@emotion/react';
// import OrderAxios from '../api/OrderComplete';
import OrderedProduct from '../components/layout/Pay/OrderedProduct';
import theme from '../style/theme';

const OrderedList = () => {
  // const [orderCom, setOrderCom] = useState('');
  const [loading, setLoading] = useState(true);
  const paymentMethod = localStorage.getItem('PaymentMethod');
  const userName = localStorage.getItem('UserName');
  const userPhoneNum = localStorage.getItem('UserPhoneNum');

  // useEffect(() => {
  //   const orderedData = async () => {
  //     try {
  //       const data = await OrderAxios();
  //       setOrderCom(data);
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   };

  //   orderedData();
  // }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  // const orderComplete = async () => {
  //   try {
  //     const data = await OrderAxios();
  //     setOrderCom(data);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  // orderComplete();

  return (
    <div>
      {loading ? (
        <div css={LoadingWrap}>
          <div css={Loader}>
            <li className="ball"> </li>
            <li className="ball"> </li>
            <li className="ball"> </li>
          </div>
          <div css={LoadingMessage}>결제가 진행중입니다</div>
        </div>
      ) : (
        <nav>
          <div css={OrderComplete}>결제가 완료되었습니다.</div>
          <OrderedProduct />

          <div css={OrderedWrap}>
            <div css={OrderedWrapEl}>
              <h3>이용자 정보</h3>
              <div>
                {userName} ({userPhoneNum})
              </div>
            </div>
            <div css={OrderedWrapEl}>
              <h3>결제 수단</h3>
              <div>{paymentMethod} 결제</div>
            </div>
            <div css={OrderedWrapEl}>
              <h3>총 결제 금액</h3>
              <div>156,000원</div>
            </div>
          </div>
        </nav>
      )}
    </div>
  );
};

const LoadingWrap = css`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  height: 75vh;
`;

const Loader = css`
  width: 12.5rem;
  display: flex;
  justify-content: space-evenly;

  .ball {
    list-style: none;
    width: 2rem;
    height: 2rem;
    border-radius: 50%;
    background-color: #fff;
  }

  .ball:nth-child(1) {
    animation: bounce-1 1.4s ease-in-out infinite;
  }

  @keyframes bounce-1 {
    50% {
      transform: translateY(-1rem);
      background-color: ${theme.colors.blue700};
    }
  }

  .ball:nth-child(2) {
    animation: bounce-3 1.4s ease-in-out 0.2s infinite;
  }

  @keyframes bounce-2 {
    50% {
      transform: translateY(-1rem);
      background-color: ${theme.colors.blue700};
    }
  }

  .ball:nth-child(3) {
    animation: bounce-3 1.4s ease-in-out 0.4s infinite;
  }

  @keyframes bounce-3 {
    50% {
      transform: translateY(-1rem);
      background-color: ${theme.colors.blue700};
    }
  }
`;

const LoadingMessage = css`
  margin-top: 6rem;
  font-size: 1.5rem;
  font-weight: 900;
  color: ${theme.colors.blue700};
`;

const OrderComplete = css`
  margin-top: 4rem;
  margin-bottom: 3rem;

  display: flex;
  justify-content: center;

  font-size: 2rem;
  font-weight: 900;
`;

const OrderedWrap = css`
  margin-top: 1.5rem;
  margin-bottom: 150px;
  padding: 1rem;

  display: flex;
  align-items: flex-end;
  flex-direction: column;

  gap: 1rem;

  font-size: 1.2rem;
`;

const OrderedWrapEl = css`
  display: flex;
  justify-content: flex-end;

  div {
    width: 16rem;

    text-align: end;
  }
`;

export default OrderedList;
