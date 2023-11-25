// 고객 예약 정보 - 예약자 정보, 이용자 정보 부분

import { css } from '@emotion/react';

const BookingUser = () => {
  return (
    <div css={BookingUserInfo}>
      <div css={ReservationUser}>
        <h1>예약자 정보</h1>
        <p>성명</p>
        <input placeholder="성명을 입력해주세요." />
      </div>

      <div css={UsingUser}>
        <h1>이용자 정보</h1>
        <div css={EssentialInfo}>상품 이용 시 필요한 필수 정보입니다.</div>
        <div css={SameReserveUser}>
          <label htmlFor="check">
            <input id="check" type="checkbox" /> 예약자 정보와 동일합니다.
          </label>
        </div>
        <p>성명</p>
        <input css={InputBox} placeholder="성명을 입력해주세요." />
        <p>휴대폰 번호</p>
        <input css={InputBox} placeholder="휴대폰 번호를 입력해주세요." />
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

  input {
    padding: 10px;

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

const InputBox = css`
  margin-bottom: 1rem;

  width: 100%;
`;

export default BookingUser;
