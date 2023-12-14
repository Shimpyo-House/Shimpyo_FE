// if !로그인  -> 로그인 하기 안내 /login으로 이동 navigate
// 숙소 예약 완료 후 무료 취소 안내 토글
// BookingInfo.tsx 컴포넌트가 여기서 쓰일거임

import { useState } from 'react';
import { css } from '@emotion/react';
import BookingInfo from './BookingInfo';

const CheckBooking = () => {
  // const [login] = useState(false);
  const [toggled, setToggled] = useState(false);
  return (
    <nav>
      <h1 css={OrderTitle}>주문 및 결제</h1>
      <div css={Booking}>
        <h1>숙소</h1>
        <div css={Toggle}>
          <button type="button" onClick={() => setToggled(!toggled)}>
            예약 완료 후 무료취소 안내
          </button>
          {toggled && (
            <div
              style={{
                height: toggled ? 'auto' : '0',
              }}
            >
              <ul>
                <li>
                  예약일시 기준 체크인 시각 이전일 경우 무료취소가 가능합니다.
                </li>
                <li>숙소 정책에 따라 일부 상품은 무료취소가 불가능합니다.</li>
              </ul>
            </div>
          )}
        </div>

        <div css={BookingInformation}>
          <BookingInfo />
        </div>
      </div>
    </nav>
  );
};

const OrderTitle = css`
  margin: 3rem 0 2rem;

  display: flex;
  justify-content: center;
  font-size: 2rem;
`;

const Booking = css`
  padding: 2rem;
  margin-top: 1rem;

  box-shadow: 1px 1px 4px 0px #cacaca;

  transition: height 0.5s ease;

  h1 {
    font-size: 1.3rem;
    font-weight: 900;
  }
`;

const Toggle = css`
  padding: 0.7rem 1rem;
  margin-top: 1rem;

  width: 100%;

  border-radius: 5px;
  background-color: #e5f0ff;
  text-align: left;

  button {
    width: 100%;

    text-align: left;
    font-weight: 900;
    cursor: pointer;
  }

  div {
    margin-top: 0.8rem;
    font-size: 0.8rem;

    ul {
      margin-bottom: 0.3rem;
      list-style-type: disc;
    }

    li {
      margin-left: 2rem;
      margin-bottom: 0.4rem;
    }
  }
`;

const BookingInformation = css`
  margin-top: 1rem;

  BookingInfo::after {
    content: '';
    display: block;
    border-top: 1px solid #ccc;
    margin-top: 10px;
  }
`;

export default CheckBooking;
