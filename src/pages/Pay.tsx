import React from 'react';
import CheckBooking from '../components/layout/Pay/CheckBooking';
import BookingUser from '../components/layout/Pay/BookingUser';
import Payment from '../components/layout/Pay/Payment';

const Pay = () => {
  return (
    <>
      <CheckBooking />
      <BookingUser />
      <Payment />
    </>
  );
};

export default Pay;
