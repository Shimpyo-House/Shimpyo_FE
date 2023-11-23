import React, { useEffect, useState } from 'react';
import { css } from '@emotion/react';
import OrderAxios from '../api/OrderComplete';

const OrderedList = () => {
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

  const orderComplete = async () => {
    try {
      const data = await OrderAxios();
      setOrderCom(data);
    } catch (error) {
      console.error(error);
    }
  };

  orderComplete();

  return <div css={OrderComplete}>{orderCom}</div>;
};

const OrderComplete = css`
  margin-top: 4rem;

  display: flex;
  justify-content: center;

  font-size: 2rem;
  font-weight: 900;
`;

export default OrderedList;
