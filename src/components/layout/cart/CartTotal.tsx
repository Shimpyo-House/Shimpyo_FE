/* eslint-disable react/button-has-type */
import { css } from '@emotion/react';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { useNavigate } from 'react-router-dom';
import swal from 'sweetalert';
import { cartPostToJudgment } from '../../../api/cart';
import {
  cartDataState,
  cartSoldOutState,
  cartCheckedRoomListState,
} from '../../../atoms/cartAtom';
import theme from '../../../style/theme';

interface CartTotalProps {
  totalPrice: number;
}

const CartTotal = ({ totalPrice }: CartTotalProps) => {
  const navigate = useNavigate();
  const setCartData = useSetRecoilState(cartDataState);
  const [soldOutData, setSoldOutData] = useRecoilState(cartSoldOutState);
  const [checkedRoomList, setCheckedRoomList] = useRecoilState(
    cartCheckedRoomListState,
  );

  const handlePostClick = async () => {
    const updateCheckboxAvailability = () => {
      const unavailableRoomIds = soldOutData?.unavailableIds || [];
      const updatedCheckedRoomList =
        checkedRoomList.map((room) => ({
          ...room,
          disabled: unavailableRoomIds.includes(room.roomId),
        })) || [];
      setCheckedRoomList(updatedCheckedRoomList);
    };
    try {
      if (checkedRoomList.length === 0) {
        swal({
          title: '선택한 상품이 없습니다.',
          icon: 'error',
        });
        return;
      }

      const rooms = checkedRoomList.map(({ roomId, startDate, endDate }) => ({
        roomId,
        startDate,
        endDate,
      }));

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

      const response = await cartPostToJudgment(rooms);

      if (!response) {
        alert('주문이 성공적으로 완료되었습니다.');
        navigate('/pay');
        setCartData(updatedCartData);
        setCheckedRoomList([]);
      } else {
        setSoldOutData(response);
        updateCheckboxAvailability();

        const soldOutRoomNames = checkedRoomList
          .filter(
            (room) =>
              response.unavailableIds &&
              response.unavailableIds.includes(room.roomId),
          )
          .map((room) => room.productName)
          .join(', ');
        alert(
          `[${soldOutRoomNames}] 상품이 품절되었습니다. 주문할 수 없습니다.`,
        );
        setCheckedRoomList([]);
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div css={Container}>
      <h2>전체 주문 합계</h2>
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
        <button
          onClick={handlePostClick}
          css={checkedRoomList.length > 3 ? DisabledButton : OrderButton}
          disabled={checkedRoomList.length > 3}
        >
          주문하기
        </button>
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

  transition: all 0.15s ease-in-out;

  &:hover {
    background-color: ${theme.colors.blue600};
  }
`;

const DisabledButton = css`
  width: 70%;

  margin: auto;
  margin-top: 1rem;
  padding: 1rem;

  border-radius: 0.5rem;

  font-size: 1.3rem;
  font-weight: 700;
  color: ${theme.colors.white};
  background-color: ${theme.colors.gray400};

  cursor: not-allowed;
`;
