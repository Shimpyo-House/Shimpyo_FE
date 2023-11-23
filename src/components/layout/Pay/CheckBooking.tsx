// if !로그인  -> 로그인 하기 안내 /login으로 이동 navigate
// 숙소 예약 완료 후 무료 취소 안내 토글
// BookingInfo.tsx 컴포넌트가 여기서 쓰일거임

import React, { useState } from 'react';
import { css } from '@emotion/react';
import BookingInfo from './BookingInfo';

const Container = css``;

const CheckBooking = () => {
  // login은 값을 받아올 것 같음 코드 변경 예상
  const [login, setLogin] = useState(true);
  const [toggled, setToggled] = useState(false);

  return (
    <nav css={Container}>
      <div>
        {login ? (
          <div>
            안녕하세요, <span>소유나</span> 님
          </div>
        ) : (
          <div>로그인 하시겠어요?</div>
        )}
      </div>
      <div>
        <h1>숙소</h1>
        <button onClick={() => setToggled(!toggled)}>
          예약 완료 후 무료취소 안내
        </button>
        {toggled && (
          <div>
            <ul>
              <li>
                예약일시 기준 체크인 시각 이전일 경우 무료취소가 가능합니다.
              </li>
              <li>숙소 정책에 따라 일부 상품은 무료취소가 불가능합니다.</li>
            </ul>
            <hr /> {/* div로 변경 예정 */}
            <div>
              <div>모텔</div>
              <div>
                <h3>1시간 이내 무료 취소</h3>
                <span>
                  체크인 시각 이후에 예약을 한 경우에는 15분 이내 무료 취소가
                  가능합니다.
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
      <div>
        <BookingInfo />
        <BookingInfo />
        <BookingInfo />
      </div>
    </nav>
  );
};

export default CheckBooking;
