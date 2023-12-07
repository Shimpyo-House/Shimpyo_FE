import { css } from '@emotion/react';
import { useRecoilValue } from 'recoil';
import { cartCheckedRoomListState } from '../../../atoms/cartAtom';
import theme from '../../../style/theme';
import CartOrder from './CartOrder';

interface CartTotalProps {
  totalPrice: number;
}

const CartTotal = ({ totalPrice }: CartTotalProps) => {
  const checkedRoomList = useRecoilValue(cartCheckedRoomListState);

  return (
    <div css={Container}>
      <div css={InnerContainer}>
        <div css={Total}>
          <p>상품 금액</p>
          <p>{new Intl.NumberFormat().format(totalPrice)}원</p>
        </div>
        <div css={Total}>
          <p>주문 상품 개수</p>
          <p>{checkedRoomList.length}개</p>
        </div>
        {checkedRoomList.length > 3 ? (
          <p css={ErrorText}>⚠️ 3개 초과는 주문할 수 없습니다.</p>
        ) : (
          ''
        )}
        <CartOrder />
      </div>
    </div>
  );
};

export default CartTotal;

const Container = css`
  display: flex;
  flex-direction: column;
  gap: 2rem;

  margin-bottom: 1rem;
  padding: 3rem;

  border-top: 1px solid ${theme.colors.gray400};
`;

const InnerContainer = css`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Total = css`
  display: flex;
  justify-content: space-between;
  width: 30rem;
  margin-bottom: 2rem;

  color: ${theme.colors.gray700};
  font-size: 1.3rem;
  font-weight: 700;
`;

const ErrorText = css`
  color: ${theme.colors.error};
  font-size: 1rem;
  font-weight: 700;
`;
