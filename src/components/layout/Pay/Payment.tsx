// 결제 부분 - 필수 약관 동의 후 결제 가능
import { useEffect, useState } from 'react';
import { css } from '@emotion/react';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import theme from '../../../style/theme';
import { cartDataState } from '../../../atoms/cartAtom';
import { AllReservationData, OrderedList } from '../../../types';
import { axiosWithAccessToken } from '../../../Axios';
import { loadingAtom } from '../../../atoms/loading';
import OrderListAxios from '../../../api/OrderList';

const Payment = () => {
  const [allAgree, setAllAgree] = useState(false);
  const [ageAgree, setAgeAgree] = useState(false);
  const [infoAgree, setInfoAgree] = useState(false);
  const [thirdPartyAgree, setThirdPartyAgree] = useState(false);
  const [eventAgree, setEventAgree] = useState(false);
  const [eventInfoAgree, setEventInfoAgree] = useState(false);
  const payMethod = localStorage.getItem('PaymentMethod');
  const userName = localStorage.getItem('UserName');
  const userPhoneNum = localStorage.getItem('UserPhoneNum');

  const isUserInfoValid = payMethod && userName && userPhoneNum;

  console.log(isUserInfoValid === '');

  const navigate = useNavigate();

  const setLoading = useSetRecoilState(loadingAtom);
  const cartData = useRecoilValue(cartDataState);

  const [orderCom, setOrderCom] = useState<any>('');

  const roomIdsAsString = cartData
    .map((item) => String(item.roomId))
    .join(', ');

  const RoomIds: OrderedList = {
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

  console.log(orderCom);

  const roomPrices =
    orderCom.length > 0
      ? orderCom.map((item: { price: number }) => item.price)
      : [];
  const totalPrice = roomPrices.reduce(
    (acc: number, cur: number) => acc + cur,
    0,
  );

  const handlePaymentData = async () => {
    const reservationProducts: AllReservationData[] = [];

    orderCom.forEach((roomData: any) => {
      cartData.forEach((cartItem) => {
        const reservProducts: AllReservationData = {
          roomId: roomData.roomId,
          startDate: cartItem.startDate,
          endDate: cartItem.endDate,
          visitorName: userName,
          visitorPhone: userPhoneNum,
          price: roomData.price,
        };

        reservationProducts.push(reservProducts);
      });
    });

    try {
      setLoading({ isLoading: true, message: '현재 예약중입니다.' });
      const response = await axiosWithAccessToken.post('/api/reservations', {
        reservationProducts,
        payMethod,
        totalPrice,
      });

      if (response.status === 201) {
        console.log('예약 성공!');
      } else {
        console.error('예약 실패:', response.statusText);
      }
    } catch (error) {
      console.error('예약 중 에러가 발생했습니다:', error);
    } finally {
      setLoading({ isLoading: false, message: '' });
    }
  };

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
        <p>{totalPrice.toLocaleString()}원</p>
      </div>

      <div css={Agreement}>
        <div css={AllAgree}>
          <label htmlFor="allAgree" css={AlignCheckBox}>
            <input
              id="allAgree"
              type="checkbox"
              checked={allAgree}
              css={BigCheckBtn}
              onChange={handleAllAgreeClick}
            />{' '}
            <div>필수 약관 전체 동의</div>
          </label>
        </div>
        <div css={Agree}>
          <label htmlFor="ageAgree" css={AlignCheckBox}>
            <input
              id="ageAgree"
              type="checkbox"
              checked={ageAgree}
              css={CheckBtn}
              onChange={() => setAgeAgree(!ageAgree)}
            />{' '}
            <div>[필수] 만 14세 이상 이용 동의</div>
          </label>
        </div>
        <div css={Agree}>
          <label htmlFor="infoAgree" css={AlignCheckBox}>
            <input
              id="infoAgree"
              type="checkbox"
              checked={infoAgree}
              css={CheckBtn}
              onChange={() => setInfoAgree(!infoAgree)}
            />{' '}
            <div>[필수] 개인정보 수집 및 이용</div>
          </label>
        </div>
        <div css={Agree}>
          <label htmlFor="thirdPartyAgree" css={AlignCheckBox}>
            <input
              id="thirdPartyAgree"
              type="checkbox"
              checked={thirdPartyAgree}
              css={CheckBtn}
              onChange={() => setThirdPartyAgree(!thirdPartyAgree)}
            />{' '}
            <div>[필수] 개인정보 제 3자 제공</div>
          </label>
        </div>
        <div css={Agree}>
          <label htmlFor="eventAgree" css={AlignCheckBox}>
            <input
              id="eventAgree"
              type="checkbox"
              checked={eventAgree}
              css={CheckBtn}
              onChange={() => setEventAgree(!eventAgree)}
            />{' '}
            <div>[선택] 이벤트, 혜택 정보 수신 동의</div>
          </label>
        </div>
        <div css={Agree}>
          <label htmlFor="eventInfoAgree" css={AlignCheckBox}>
            <input
              id="eventInfoAgree"
              type="checkbox"
              checked={eventInfoAgree}
              css={CheckBtn}
              onChange={() => setEventInfoAgree(!eventInfoAgree)}
            />{' '}
            <div>
              [선택] 이벤트, 혜택 정보 전송을 위한 개인정보 수집 및 이용 동의
            </div>
          </label>
        </div>
      </div>

      <div css={AgreeInfo}>
        <span>이용규칙</span>, <span>취소 및 환불 규칙</span>에 동의하실 경우
        결제하기를 클릭해주세요.
      </div>

      <button
        type="button"
        css={PaymentButton}
        style={{
          backgroundColor:
            allAgree && isUserInfoValid !== '' ? '#3a7bdf' : 'gray',
          cursor:
            allAgree && isUserInfoValid !== '' ? 'pointer' : 'not-allowed',
        }}
        disabled={!allAgree || isUserInfoValid === ''}
        onClick={() => {
          navigate('/ordered');
          handlePaymentData();
        }}
      >
        {totalPrice.toLocaleString()}원 결제하기
      </button>
      <div css={WarningInfo}>
        {isUserInfoValid === '' ? '* 필수 정보를 다 입력해 주세요.' : null}
      </div>
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
    color: ${theme.colors.blue700};
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
    color: ${theme.colors.blue700};
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
  background-color: ${theme.colors.blue700};
  color: #fff;
  text-align: center;
  cursor: pointer;

  transition: 0.2s;

  &:hover {
    background-color: ${theme.colors.blue800};
  }
`;

const BigCheckBtn = css`
  width: 1.3rem;
  height: 1.3rem;

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
    box-shadow: 0 0 0 calc(20px / 2.5) ${theme.colors.blue700};
    border-radius: inherit;
    opacity: 0;
    transition: all 0.5s cubic-bezier(0.12, 0.4, 0.29, 1.46);
  }

  &:before {
    position: absolute;
    top: 40%;
    left: 50%;
    content: '';

    width: 0.25rem;
    height: 0.45rem;
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

      transform: translate(-50%, -50%) rotate(45deg) scale(1.2);
      transition: all 0.2s cubic-bezier(0.12, 0.4, 0.29, 1.46) 0.1s;
    }
  }

  &:active:not(:checked)::after {
    transition: none;
    box-shadow: none;
    opacity: 1;
  }
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

const AlignCheckBox = css`
  display: flex;
  gap: 10px;
`;

const WarningInfo = css`
  margin-top: 1rem;
  color: ${theme.colors.blue800};
`;

export default Payment;
