// if !로그인  -> 로그인 하기 안내 /login으로 이동 navigate
// 숙소 예약 완료 후 무료 취소 안내 토글
// BookingInfo.tsx 컴포넌트가 여기서 쓰일거임

import React, { useState } from 'react';
import { css } from '@emotion/react';
import BookingInfo from './BookingInfo';

const Container = css``;

const LoggedIn = css`
  width: 100%;
  padding: 1.25rem;

  margin-top: 1rem;

  box-shadow: 1px 1px 4px 0px #cacaca;
  border-radius: 5px;
`;

const LoggedInTo = css`
  color: #3a7bdf;
  font-weight: 900;

  &:hover {
    text-decoration: underline;
    cursor: pointer;
  }
`;

const LoggedInDes = css`
  margin-top: 0.7rem;

  font-size: 0.75rem;

  span {
    font-weight: 900;
  }
`;

const Booking = css`
  padding: 1.25rem;
  margin-top: 1rem;

  box-shadow: 1px 1px 4px 0px #cacaca;

  transition: height 0.5s ease;

  h1 {
    font-size: 1.1rem;
    font-weight: 900;
  }
`;

const Toggle = css`
  padding: 0.6rem 1rem;
  margin-top: 0.8rem;

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
  margin-top: 2rem;
`;

const CheckBooking = () => {
  // login은 값을 받아올 것 같음 코드 변경 예상
  const [login, setLogin] = useState(false);
  const [toggled, setToggled] = useState(false);

  return (
    <nav css={Container}>
      <div css={LoggedIn}>
        {login ? (
          <div css={LoggedInTo}>
            안녕하세요, <span>소유나</span> 님
          </div>
        ) : (
          <>
            <div css={LoggedInTo}>로그인 하시겠어요? &gt;</div>
            <div css={LoggedInDes}>
              <span>할인</span>과 <span>적립 혜택</span>을 받을 수 있습니다
            </div>
          </>
        )}
      </div>
      <div css={Booking}>
        <h1>숙소</h1>
        <div css={Toggle}>
          <button onClick={() => setToggled(!toggled)}>
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
          <BookingInfo />
          <BookingInfo />
        </div>
      </div>
    </nav>
  );
};

export default CheckBooking;
