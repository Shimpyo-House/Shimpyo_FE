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

      <div css={OrderedWrap}>
        <div css={OrderedWrapEl}>
          <h3>이용자 정보</h3>
          <div>소유나 (010-0000-0000)</div>
        </div>
        <div css={OrderedWrapEl}>
          <h3>결제 수단</h3>
          <div>토스페이</div>
        </div>
        <div css={OrderedWrapEl}>
          <h3>총 결제 금액</h3>
          <div>156,000원</div>
        </div>
      </div>
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

const OrderedWrap = css`
  margin-top: 1.5rem;
  padding: 1rem;

  display: flex;
  align-items: flex-end;
  flex-direction: column;

  gap: 1rem;

  font-size: 1.2rem;
`;

const OrderedWrapEl = css`
  display: flex;
  justify-content: flex-end;

  div {
    width: 16rem;

    text-align: end;
  }
`;

export default OrderedList;
