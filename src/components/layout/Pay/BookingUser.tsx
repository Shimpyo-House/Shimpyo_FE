// 고객 예약 정보 - 예약자 정보, 이용자 정보 부분

import { ChangeEvent, useState } from 'react';
import { css } from '@emotion/react';
import theme from '../../../style/theme';

const BookingUser = () => {
  const [reserveInfo, setReserveInfo] = useState('');
  const [userInfo, setUserInfo] = useState('');
  const [checked, setChecked] = useState(false);
  const [phoneNum, setPhoneNum] = useState('');

  const handlePhoneNum = (event: ChangeEvent<HTMLInputElement>) => {
    const inputNumber = event.target.value.replace(/[^0-9]/g, '');
    let formattedNumber = '';

    for (let i = 0; i < inputNumber.length; i++) {
      if (i === 3 || i === 7) {
        formattedNumber += '-';
      }
      formattedNumber += inputNumber[i];
    }

    if (formattedNumber.length > 13) {
      return;
    }

    setPhoneNum(formattedNumber);
  };

  return (
    <div css={BookingUserInfo}>
      <div css={ReservationUser}>
        <h1>예약자 정보</h1>
        <p>성명</p>
        <input
          placeholder="성명을 입력해주세요."
          css={InputEl}
          onChange={(event) => setReserveInfo(event.target.value)}
          value={reserveInfo}
        />
      </div>

      <div css={UsingUser}>
        <h1>이용자 정보</h1>
        <div css={EssentialInfo}>상품 이용 시 필요한 필수 정보입니다.</div>
        <div css={SameReserveUser}>
          <label htmlFor="check" css={AlignCheckBox}>
            <input
              id="check"
              type="checkbox"
              css={CheckBtn}
              onChange={(event) =>
                event.target.checked ? setChecked(true) : setChecked(false)
              }
            />
            <div>예약자 정보와 동일합니다.</div>
          </label>
        </div>
        <p>성명</p>
        <input
          placeholder="성명을 입력해주세요."
          css={InputEl}
          value={checked ? reserveInfo : userInfo}
          onChange={(event) => setUserInfo(event.target.value)}
        />
        <p>휴대폰 번호</p>
        <input
          placeholder="휴대폰 번호를 입력해주세요."
          css={InputEl}
          value={phoneNum}
          onChange={handlePhoneNum}
        />
        <p>
          입력하신 번호는 안심번호로 변경되어 숙소에 전달됩니다. 단, 안심번호로
          처리가 어려운 경우에 한해 제한적으로 개인정보 제공 동의에 근거하여
          실제 휴대폰 번호가 전달 될 수 있습니다.
        </p>
      </div>
    </div>
  );
};

const BookingUserInfo = css`
  h1 {
    margin-bottom: 1.5rem;

    font-size: 1.4rem;
    font-weight: 900;
  }

  p {
    margin-bottom: 0.4rem;
    font-size: 0.8rem;
    color: gray;
  }
`;

const InputEl = css`
  padding: 10px;
  margin-bottom: 1rem;
  width: 100%;

  font-size: 1.1rem;
  outline: none;
  border: none;
  border-bottom: 1px solid #b6b6b6;
  transition: 0.5s;

  &::placeholder {
    font-weight: 900;
    color: #c7c7c7;
  }

  &:focus {
    border-bottom: 1px solid #6d6d6d;
  }
`;

const ReservationUser = css`
  width: 100%;
  padding: 2rem;

  margin-top: 1rem;

  box-shadow: 1px 1px 4px 0px #cacaca;
  border-radius: 5px;

  input {
    width: 100%;
  }
`;

const UsingUser = css`
  width: 100%;
  padding: 2rem;

  margin-top: 1rem;

  box-shadow: 1px 1px 4px 0px #cacaca;
  border-radius: 5px;
`;

const EssentialInfo = css`
  padding: 0.8rem;
  margin-bottom: 0.9rem;

  border-radius: 5px;
  background-color: #e5f0ff;
`;

const SameReserveUser = css`
  margin-bottom: 1.2rem;
  margin-left: 0.3rem;

  label {
    cursor: pointer;
  }

  input {
    cursor: pointer;
  }
`;

const AlignCheckBox = css`
  display: flex;
  gap: 0.5rem;
`;

const CheckBtn = css`
  width: 1rem;
  height: 1rem;

  position: relative;

  border: 1px solid ${theme.colors.gray600};
  border-radius: 5px;

  cursor: pointer;
  appearance: none;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  transition: all 0.3s;

  &:after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    box-shadow: 0 0 0 calc(20px / 3.5) ${theme.colors.blue700};
    border-radius: inherit;
    opacity: 0;
    transition: all 0.5s cubic-bezier(0.12, 0.4, 0.29, 1.46);
  }

  &:before {
    position: absolute;
    top: 40%;
    left: 50%;
    content: '';

    width: 0.2rem;
    height: 0.3rem;
    border-right: 2px solid #fff;
    border-bottom: 2px solid #fff;
    transform: translate(-50%, -50%) rotate(45deg) scale(0);
    opacity: 0;
    transition:
      all 0.1s cubic-bezier(0.71, -0.46, 0.88, 0.6),
      opacity 0.1s;
  }

  &:hover {
    border-color: ${theme.colors.blue700};
  }

  &:checked {
    background: ${theme.colors.blue700};
    border-color: transparent;

    &:before {
      opacity: 1;

      transform: translate(-50%, -50%) rotate(45deg) scale(1.1);
      transition: all 0.2s cubic-bezier(0.12, 0.4, 0.29, 1.46) 0.1s;
    }
  }

  &:active:not(:checked)::after {
    transition: none;
    box-shadow: none;
    opacity: 1;
  }
`;

export default BookingUser;
