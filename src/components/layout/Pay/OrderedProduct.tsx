// 주문 완료 후 결제 완료 화면

import { css } from '@emotion/react';
import { useRecoilValue } from 'recoil';
import { cartDataState } from '../../../atoms/cartAtom';

const OrderedProduct = () => {
  const cartData = useRecoilValue(cartDataState);

  return (
    <div>
      {cartData.length > 0 ? (
        cartData.map((cartItem) => (
          <div key={cartItem.roomId} css={OrderedContainer}>
            <div css={BookingInfoCss}>
              <div css={BookHeader}>
                <span>최저가보상</span>
                <h1>{cartItem.roomName}</h1>
                <p>{cartItem.productName}</p>
              </div>

              <div css={CheckInOut}>
                <div>
                  <span>체크인</span>
                  <h3>{cartItem.startDate}</h3>
                  <p>{cartItem.checkIn}</p>
                </div>
                <div>
                  <span>체크아웃</span>
                  <h3>{cartItem.endDate}</h3>
                  <p>{cartItem.checkOut}</p>
                </div>
              </div>

              <div css={RefPeople}>
                기준 {cartItem.standard}명 / 최대 {cartItem.capacity}명
              </div>

              <div css={BookingPrice}>
                숙박 / 1박 <span>{cartItem.price}원</span>
              </div>
            </div>
          </div>
        ))
      ) : (
        <div css={ErrorMessage}>
          결제 정보를 불러올 수 없습니다. 예약 내역을 확인해주세요.
        </div>
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

const ErrorMessage = css`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 10rem;
`;

export default OrderedProduct;
