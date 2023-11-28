/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-alert */
/* eslint-disable react/button-has-type */
import { css } from '@emotion/react';
import { useRecoilState } from 'recoil';
import { useNavigate } from 'react-router-dom';
// import { cartPostToJudgment } from '../../../api/cart';
import { ResponseCartData } from '../../../types';
import { cartDataState } from '../../../atoms/cartAtom';
import theme from '../../../style/theme';

interface CartTotalProps {
  totalPrice: number;
  checkedRoomList: ResponseCartData[];
}

const CartTotal = ({ totalPrice, checkedRoomList }: CartTotalProps) => {
  const navigate = useNavigate();
  const [cartData, setCartData] = useRecoilState(cartDataState);
  console.log(cartData);

  const handlePostClick = async () => {
    try {
      if (checkedRoomList.length > 3) {
        alert('3개 이상의 상품을 주문할 수 없습니다.');
        return;
      }

      if (checkedRoomList.length === 0) {
        alert('선택한 상품이 없습니다.');
        return;
      }

      // const roomData = checkedRoomList.map(
      //   ({ roomId, startDate, endDate }) => ({
      //     roomId,
      //     startDate,
      //     endDate,
      //   }),
      // );

      // const response = await cartPostToJudgment(roomData);
      // const soldOutRooms = response.filter(
      //   (room: PostRoomData) => !room.isAvailable,
      // );

      // if (soldOutRooms.length > 0) {
      //   const soldOutRoomIds = soldOutRooms.map(
      //     (room: PostRoomData) => room.roomId,
      //   );
      //   alert(`${soldOutRoomIds} 상품이 품절되었습니다. 주문할 수 없습니다.`);
      //   return;
      // }

      const updatedCartData = checkedRoomList.map(
        ({
          roomId,
          roomName,
          startDate,
          endDate,
          productName,
          standard,
          capacity,
          checkIn,
          checkOut,
          price,
        }) => ({
          roomId,
          roomName,
          productName,
          startDate,
          endDate,
          standard,
          capacity,
          checkIn,
          checkOut,
          price,
        }),
      );
      setCartData(updatedCartData);
      alert('주문이 성공적으로 완료되었습니다.');
      navigate('/pay');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div css={Container}>
      <h2>전체 주문 합계</h2>
      <div css={Total}>
        <p>상품 금액</p>
        <p>{new Intl.NumberFormat().format(totalPrice)}원</p>
      </div>
      <div css={Total}>
        <p>주문 상품 개수</p>
        <p>{checkedRoomList.length}개</p>
      </div>
      <button onClick={handlePostClick} css={OrderButton}>
        주문하기
      </button>
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

const Total = css`
  display: flex;
  justify-content: space-around;

  color: ${theme.colors.gray700};
  font-size: 1.3rem;
  font-weight: 700;
`;

const OrderButton = css`
  width: 70%;

  margin: auto;
  margin-top: 1rem;
  padding: 1rem;

  border-radius: 0.5rem;

  font-size: 1.3rem;
  font-weight: 700;
  color: ${theme.colors.white};
  background-color: ${theme.colors.blue700};

  cursor: pointer;
  transition: all 0.15s ease-in-out;

  &:hover {
    background-color: ${theme.colors.blue600};
  }
`;
