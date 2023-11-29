import { useState, useEffect } from 'react';
import { css } from '@emotion/react';
import hotelImg from '/img1.jpeg';
import theme from '../../../style/theme';
import OrderAxios from '../../../api/OrderComplete';

const AllReservation = () => {
  const [orderCom, setOrderCom] = useState('');

  useEffect(() => {
    const orderedData = async () => {
      try {
        const data = await OrderAxios();
        setOrderCom(data);
      } catch (error) {
        console.error(error);
      }
    };

    orderedData();
  }, []);

  console.log(orderCom);

  return (
    <nav css={ReservationWrap}>
      <div css={WrapContainer}>
        <h1>2023.11.22</h1>
        <div css={CompleteTag}>이용완료</div>
      </div>
      <hr />

      <div>
        <div css={MakeReservation}>숙소 예약 일시 : 2023-11-19 15:30:00</div>

        <div css={ReserveTitle}>강릉 고즈넉한 주문 펜션</div>

        <div css={ContentWrap}>
          <div css={MainImg}>
            <img src={hotelImg} alt="호텔 이미지" />
          </div>

          <div css={RoomInfoWrap}>
            <div css={RoomInfoTitle}>Double Room(2인 이상시 문의)</div>
            <div>2023.11.22 ~ 2023.11.24</div>
            <div>체크인 13:00 | 체크아웃 17:00</div>
            <div>결제 수단 | toss페이</div>
            <div>결제 금액 | 95,000원</div>
          </div>
        </div>
      </div>
    </nav>
  );
};

const ReservationWrap = css`
  width: 70%;
  padding: 2rem;
  margin: 0 auto;
  margin-top: 1rem;

  box-shadow: 1px 1px 4px 0px #cacaca;
  border-radius: 5px;

  h1 {
    margin-bottom: 1.5rem;

    font-size: 1.3rem;
    font-weight: 900;
  }

  hr {
    margin-bottom: 1rem;
    height: 1px;
    background: ${theme.colors.gray500};
    border: 0;
  }
`;

const WrapContainer = css`
  display: flex;
  justify-content: space-between;
`;

const MakeReservation = css`
  margin-bottom: 0.8rem;
  font-size: 0.8rem;
  color: ${theme.colors.gray700};
`;

const CompleteTag = css`
  padding: 0.1rem 0.8rem;
  height: 2rem;

  display: flex;
  justify-content: center;
  align-items: center;

  border: 1px solid ${theme.colors.gray500};
  border-radius: 5px;
  background-color: ${theme.colors.gray500};
  color: #fff;
  font-size: 0.9rem;
  font-weight: 600;
`;

const ReserveTitle = css`
  margin-top: 0.8rem;
  margin-bottom: 1.5rem;

  font-size: 1.5rem;
  font-weight: 700;
`;

const ContentWrap = css`
  display: flex;
`;

const MainImg = css`
  width: 60%;
  img {
    max-width: 100%;
    border-radius: 5px;
  }
`;

const RoomInfoWrap = css`
  margin-left: 2rem;

  font-size: 1rem;

  div {
    margin-bottom: 1rem;
  }
`;

const RoomInfoTitle = css`
  font-size: 1.1rem;
  font-weight: 600;
`;

export default AllReservation;
