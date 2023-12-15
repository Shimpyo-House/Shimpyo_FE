// 예약한 객실 (숙소명, 옵션, 체크인/체크아웃, 금액, 방문시간 radio등) 컴포넌트화

import { useEffect, useState } from 'react';
import { css } from '@emotion/react';
import { useRecoilValue } from 'recoil';
import { cartDataState } from '../../../atoms/cartAtom';
import OrderListAxios from '../../../api/OrderList';
import { OrderedListData } from '../../../types';

const BookingInfo = () => {
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

  return (
    <div css={BookingInfoCss}>
      {orderCom.length > 0 ? (
        orderCom.map((product: any) => {
          return (
            <div key={product.productId}>
              {cartData.length > 0 ? (
                cartData.map((cartItem, index) => (
                  <div key={cartItem.roomId}>
                    <div css={BookHeader}>
                      <span>최저가보상</span>
                      <h1>{product.productName}</h1>
                      <p>{product.roomName}</p>
                    </div>

                    <div css={CheckInOut}>
                      <div>
                        <span>체크인</span>
                        <h3>{cartItem.startDate}</h3>
                        <p>{product.checkIn}</p>
                      </div>
                      <div>
                        <span>체크아웃</span>
                        <h3>{cartItem.endDate}</h3>
                        <p>{product.checkOut}</p>
                      </div>
                    </div>

                    <div css={RefPeople}>
                      기준 {product.standard}명 / 최대 {product.capacity}명
                    </div>

                    <div css={BookingPrice}>
                      숙박 /{' '}
                      {calculateNightCount(
                        cartItem.startDate,
                        cartItem.endDate,
                      )}
                      박{' '}
                      <span>
                        {(
                          calculateNightCount(
                            cartItem.startDate,
                            cartItem.endDate,
                          ) * product.price
                        ).toLocaleString()}
                        원
                      </span>
                    </div>

                    <div css={VisitWay}>
                      <div>방문수단 선택</div>
                      <form>
                        <label htmlFor={`walk-${index}`}>
                          <input
                            id={`walk-${index}`}
                            type="radio"
                            name="button"
                          />
                          도보
                        </label>
                        <label htmlFor={`car-${index}`}>
                          <input
                            id={`car-${index}`}
                            type="radio"
                            name="button"
                          />
                          차량
                        </label>
                      </form>
                    </div>
                  </div>
                ))
              ) : (
                <p>장바구니가 비어있습니다.</p>
              )}
            </div>
          );
        })
      ) : (
        <div>예약 내역이 없습니다.</div>
      )}
    </div>
  );
};

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
    margin-left: 1rem;
    font-size: 1.3rem;
    font-weight: 900;
  }
`;

const VisitWay = css`
  display: flex;
  justify-content: space-between;

  padding: 1rem 1.5rem;
  margin-top: 1.5rem;
  margin-bottom: 1rem;

  border: 1px solid #c8deff;
  border-radius: 5px;

  label {
    margin-left: 1.3rem;

    cursor: pointer;
  }

  input {
    margin-right: 0.4rem;

    cursor: pointer;
  }
`;

export default BookingInfo;
