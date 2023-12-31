// 주문 완료 후 결제 완료 화면

import { useEffect, useState } from 'react';
import { css } from '@emotion/react';
import { useRecoilValue } from 'recoil';
import { cartDataState } from '../../../atoms/cartAtom';
import OrderListAxios from '../../../api/OrderList';
import { OrderedListData } from '../../../types';

const OrderedProduct = () => {
  const cartData = useRecoilValue(cartDataState);
  const [orderCom, setOrderCom] = useState<any>('');

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

  const roomPrices =
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

  return (
    <div css={BookingInfoCss}>
      {orderCom.length > 0 ? (
        orderCom.map((product: any, index: number) => {
          const roomKey = `${product.productId}-${cartData[index].roomId}`;

          return (
            <div key={roomKey}>
              <div css={OrderedContainer}>
                <div css={BookingInfoCss}>
                  <div css={BookHeader}>
                    <span>최저가보상</span>
                    <h1>{product.productName}</h1>
                    <p>{product.roomName}</p>
                  </div>

                  <div css={CheckInOut}>
                    <div>
                      <span>체크인</span>
                      <h3>{cartData[index].startDate}</h3>
                      <p>{product.checkIn}</p>
                    </div>
                    <div>
                      <span>체크아웃</span>
                      <h3>{cartData[index].endDate}</h3>
                      <p>{product.checkOut}</p>
                    </div>
                  </div>

                  <div css={RefPeople}>
                    기준 {product.standard}명 / 최대 {product.capacity}명
                  </div>

                  <div css={BookingPrice}>
                    숙박 / 1박 <span>{totalPrice.toLocaleString()}원</span>
                  </div>
                </div>
              </div>
            </div>
          );
        })
      ) : (
        <div>예약 내역이 없습니다.</div>
      )}
    </div>
  );
};

const OrderedContainer = css`
  width: 100%;
  padding: 2rem;

  margin-top: 1rem;

  box-shadow: 1px 1px 4px 0px #cacaca;
  border-radius: 5px;
`;

const BookingInfoCss = css`
  padding: 1rem 1.4rem;
`;

const BookHeader = css`
  font-weight: 900;

  span {
    padding: 0 0.2rem;
    border: 1px solid #9dbdef;
    border-radius: 4px;

    color: #3a7bdf;
    font-size: 0.7rem;
    font-weight: 900;
  }

  h1 {
    margin-top: 0.6rem;
    margin-bottom: 0.3rem;

    font-size: 1.4rem;
  }
`;

const CheckInOut = css`
  margin-top: 2rem;
  display: grid;
  grid-template-columns: 1fr 1fr;

  span {
    font-size: 0.9rem;
    color: #808080;
  }

  h3 {
    margin-top: 0.4rem;

    font-size: 1.2rem;
    font-weight: 900;
  }

  p {
    margin-top: 0.3rem;
    font-size: 1.1rem;
  }
`;

const RefPeople = css`
  margin-top: 1rem;
`;

const BookingPrice = css`
  margin-top: 1rem;
  text-align: end;

  span {
    font-size: 1.3rem;
    font-weight: 900;
  }
`;

export default OrderedProduct;
