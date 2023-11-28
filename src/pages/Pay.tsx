import CheckBooking from '../components/layout/Pay/CheckBooking';
import BookingUser from '../components/layout/Pay/BookingUser';
import Payment from '../components/layout/Pay/Payment';
import PayMethod from '../components/layout/Pay/PayMethod';

const Pay = () => {
  return (
    <>
      <CheckBooking />
      <BookingUser />
      <PayMethod />
      <Payment />
    </>
  );
};

export default Pay;
