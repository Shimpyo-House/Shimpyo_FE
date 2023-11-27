import { useEffect, useState } from 'react';
import { css } from '@emotion/react';
import OrderAxios from '../api/OrderComplete';
import OrderedProduct from '../components/layout/Pay/OrderedProduct';

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

  return (
    <nav>
      <div css={OrderComplete}>{orderCom}</div>
      <OrderedProduct />
      <OrderedProduct />
      <div css={OrderedAmount}>총 결제 금액 : 156, 000원</div>
    </nav>
  );
};

const OrderComplete = css`
  margin-top: 4rem;
  margin-bottom: 3rem;

  display: flex;
  justify-content: center;

  font-size: 2rem;
  font-weight: 900;
`;

const OrderedAmount = css`
  margin-top: 2rem;
  margin-right: 1rem;
  margin-bottom: 150px;

  display: flex;
  justify-content: flex-end;

  font-size: 1.4rem;
  font-weight: 700;
`;

export default OrderedList;
