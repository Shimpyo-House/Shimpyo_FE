// 결제 부분 - 필수 약관 동의 후 결제 가능
import React, { useEffect, useState } from 'react';
import { css } from '@emotion/react';

const Payment = () => {
  const [allAgree, setAllAgree] = useState(false);
  const [ageAgree, setAgeAgree] = useState(false);
  const [infoAgree, setInfoAgree] = useState(false);
  const [thirdPartyAgree, setThirdPartyAgree] = useState(false);
  const [eventAgree, setEventAgree] = useState(false);
  const [eventInfoAgree, setEventInfoAgree] = useState(false);

  useEffect(() => {
    if (ageAgree && infoAgree && thirdPartyAgree) {
      setAllAgree(true);
    } else {
      setAllAgree(false);
    }
  }, [ageAgree, infoAgree, thirdPartyAgree]);

  const handleAllAgreeClick = () => {
    if (!allAgree) {
      setAgeAgree(true);
      setInfoAgree(true);
      setThirdPartyAgree(true);
    } else {
      setAgeAgree(false);
      setInfoAgree(false);
      setThirdPartyAgree(false);
    }

    if (!(ageAgree && infoAgree && thirdPartyAgree)) {
      setAllAgree(false);
    }
  };

  return (
    <div css={PaymentForm}>
      <div css={PaymentInfo}>결제 정보</div>

      <div css={TotalPrice}>
        <div>총 결제 금액</div>
        <p>300,000원</p>
      </div>

      <div css={Agreement}>
        <div css={AllAgree}>
          <label htmlFor="allAgree">
            <input
              id="allAgree"
              type="checkbox"
              checked={allAgree}
              onChange={handleAllAgreeClick}
            />{' '}
            필수 약관 전체 동의
          </label>
        </div>
        <div css={Agree}>
          <label htmlFor="ageAgree">
            <input
              id="ageAgree"
              type="checkbox"
              checked={ageAgree}
              onChange={() => setAgeAgree(!ageAgree)}
            />{' '}
            [필수] 만 14세 이상 이용 동의
          </label>
        </div>
        <div css={Agree}>
          <label htmlFor="infoAgree">
            <input
              id="infoAgree"
              type="checkbox"
              checked={infoAgree}
              onChange={() => setInfoAgree(!infoAgree)}
            />{' '}
            [필수] 개인정보 수집 및 이용
          </label>
        </div>
        <div css={Agree}>
          <label htmlFor="thirdPartyAgree">
            <input
              id="thirdPartyAgree"
              type="checkbox"
              checked={thirdPartyAgree}
              onChange={() => setThirdPartyAgree(!thirdPartyAgree)}
            />{' '}
            [필수] 개인정보 제 3자 제공
          </label>
        </div>
        <div css={Agree}>
          <label htmlFor="eventAgree">
            <input
              id="eventAgree"
              type="checkbox"
              checked={eventAgree}
              onChange={() => setEventAgree(!eventAgree)}
            />{' '}
            [선택] 이벤트, 혜택 정보 수신 동의
          </label>
        </div>
        <div css={Agree}>
          <label htmlFor="eventInfoAgree">
            <input
              id="eventInfoAgree"
              type="checkbox"
              checked={eventInfoAgree}
              onChange={() => setEventInfoAgree(!eventInfoAgree)}
            />{' '}
            [선택] 이벤트, 혜택 정보 전송을 위한 개인정보 수집 및 이용 동의
          </label>
        </div>
      </div>

      <div css={AgreeInfo}>
        <span>이용규칙</span>, <span>취소 및 환불 규칙</span>에 동의하실 경우
        결제하기를 클릭해주세요.
      </div>

      <button
        css={PaymentButton}
        style={{
          backgroundColor: allAgree ? '#3a7bdf' : 'gray',
          cursor: allAgree ? 'pointer' : 'not-allowed',
        }}
        disabled={!allAgree}
      >
        300,000원 결제하기
      </button>
    </div>
  );
};

const PaymentForm = css`
  width: 100%;
  padding: 2rem;

  margin-top: 1rem;
  margin-bottom: 150px;

  box-shadow: 1px 1px 4px 0px #cacaca;
  border-radius: 5px;
`;

const PaymentInfo = css`
  font-size: 1.4rem;
  font-weight: 900;
`;

const TotalPrice = css`
  margin-top: 2rem;
  padding: 1rem 5rem;

  display: flex;
  justify-content: space-between;

  font-size: 1.4rem;
  font-weight: 900;

  p {
    color: #3a7bdf;
  }
`;

const Agreement = css`
  margin-top: 2.5rem;

  font-size: 1rem;
`;

const AllAgree = css`
  margin: 1.5rem 0;
  margin-bottom: 1.5rem;

  font-size: 1.2rem;
  font-weight: 900;
`;

const Agree = css`
  margin-bottom: 1rem;
  margin-left: 11.2px;
`;

const AgreeInfo = css`
  margin-top: 2rem;

  font-size: 0.8rem;

  span {
    font-weight: 900;
    color: #3a7bdf;
    text-decoration: underline;
    cursor: pointer;
  }
`;

const PaymentButton = css`
  margin-top: 1.5rem;
  padding: 1rem;

  width: 100%;

  font-size: 1.2rem;

  border-radius: 5px;
  background-color: #3a7bdf;
  color: #fff;
  text-align: center;
  cursor: pointer;

  transition: 0.2s;

  &:hover {
    background-color: #2565c8;
  }
`;

export default Payment;
