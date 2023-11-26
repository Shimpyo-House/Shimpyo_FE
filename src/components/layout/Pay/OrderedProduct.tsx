import { css } from '@emotion/react';

const OrderedProduct = () => {
  return (
    <div css={OrderedContainer}>
      <div css={BookingInfoCss}>
        <div css={BookHeader}>
          <span>최저가보상</span>
          <h1>마리나베이 속초</h1>
          <p>[God딜] 슈페리어 더블 레이크뷰</p>
        </div>

        <div css={CheckInOut}>
          <div>
            <span>체크인</span>
            <h3>2023.11.23(목)</h3>
            <p>15:00</p>
          </div>
          <div>
            <span>체크아웃</span>
            <h3>2023.11.24(금)</h3>
            <p>11:00</p>
          </div>
        </div>

        <div css={RefPeople}>기준 2명 / 최대 2명</div>

        <div css={BookingPrice}>
          숙박 / 1박 <span>72,800원</span>
        </div>
      </div>
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

export default OrderedProduct;
