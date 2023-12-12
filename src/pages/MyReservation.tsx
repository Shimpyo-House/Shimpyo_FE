import { css } from '@emotion/react';
import AllReservation from '../components/layout/Pay/AllReservation';

const MyReservation = () => {
  return (
    <div css={MyReservationWrap}>
      <h1 css={MyReservationTitle}>예약 내역</h1>
      <AllReservation />
    </div>
  );
};

const MyReservationWrap = css`
  margin-bottom: 150px;
`;

const MyReservationTitle = css`
  margin-top: 3rem;
  margin-bottom: 2rem;

  display: flex;
  justify-content: center;

  font-size: 1.5rem;
  font-weight: 800;
`;

export default MyReservation;
