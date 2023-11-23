// 결제 부분 - 필수 약관 동의 후 결제 가능
import React from 'react';
import { css } from '@emotion/react';

const Payment = () => {
  return (
    <div>
      <div>
        <div>총 결제 금액</div>
        <div>300,000원</div>
      </div>

      <div>
        <label>
          <input type="checkbox" /> 필수 약관 전체 동의
        </label>
        <label>
          <input type="checkbox" /> [필수] 만 14세 이상 이용 동의
        </label>
        <label>
          <input type="checkbox" /> [필수] 개인정보 수집 및 이용
        </label>
        <label>
          <input type="checkbox" /> [필수] 개인정보 제 3자 제공
        </label>
        <label>
          <input type="checkbox" /> [선택] 이벤트, 혜택 정보 수신 동의
        </label>
        <label>
          <input type="checkbox" /> [선택] 이벤트, 혜택 정보 전송을 위한
          개인정보 수집 및 이용 동의
        </label>
      </div>

      <div>
        이용규칙, 취소 및 환불 규칙에 동의하실 경우 결제하기를 클릭해주세요.
      </div>

      <div>300,000원 결제하기</div>
    </div>
  );
};

export default Payment;
