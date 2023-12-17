import { useEffect, useState } from 'react';
import { css } from '@emotion/react';
import { useRecoilValue } from 'recoil';
import OrderListAxios from '../api/OrderList';
import theme from '../style/theme';
import { cartDataState } from '../atoms/cartAtom';
import OrderedProduct from '../components/layout/Pay/OrderedProduct';
import { OrderedListData } from '../types';

const OrderedList = () => {
  const [orderCom, setOrderCom] = useState([]);
  const [loading, setLoading] = useState(true);
  const paymentMethod = localStorage.getItem('PaymentMethod');
  const userName = localStorage.getItem('UserName');
  const userPhoneNum = localStorage.getItem('UserPhoneNum');

  const cartData = useRecoilValue(cartDataState);

  const roomIdsAsString = cartData
    .map((item) => String(item.roomId))
    .join(', ');

  const RoomIds: OrderedListData = {
    roomIds: roomIdsAsString,
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await OrderListAxios(RoomIds);
        setOrderCom(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  // 박수 계산
  const parseDate = (dateString: string) => {
    const [year, month, day] = dateString.split('-').map(Number);
    return new Date(year, month - 1, day);
  };

  const calculateNightCount = (startDate: string, endDate: string): number => {
    const start = parseDate(startDate);
    const end = parseDate(endDate);

    const timeDiff = Math.abs(end.getTime() - start.getTime());

    const oneDay = 24 * 60 * 60 * 1000;

    return Math.round(timeDiff / oneDay);
  };

  const calculateProductTotal = (cartItem: any, product: any) => {
    const nightCount = calculateNightCount(
      cartItem.startDate,
      cartItem.endDate,
    );
    return nightCount * product.price;
  };

  const roomPrices: number[] =
    orderCom.length > 0
      ? orderCom.map((product: any, index: number) => {
          const cartItem = cartData[index];
          return calculateProductTotal(cartItem, product);
        })
      : [];

  const totalPrice = roomPrices.reduce(
    (acc: number, cur: number) => acc + cur,
    0,
  );

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

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
              <div>{totalPrice.toLocaleString()}원</div>
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

  .ball:nth-of-type(1) {
    animation: bounce-1 1.4s ease-in-out infinite;
  }

  @keyframes bounce-1 {
    50% {
      transform: translateY(-1rem);
      background-color: ${theme.colors.blue700};
    }
  }

  .ball:nth-of-type(2) {
    animation: bounce-3 1.4s ease-in-out 0.2s infinite;
  }

  @keyframes bounce-2 {
    50% {
      transform: translateY(-1rem);
      background-color: ${theme.colors.blue700};
    }
  }

  .ball:nth-of-type(3) {
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
