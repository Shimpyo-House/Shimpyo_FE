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

const CartOrder = () => {
  const navigate = useNavigate();
  const setCartData = useSetRecoilState(cartDataState);
  const [soldOutData, setSoldOutData] = useRecoilState(cartSoldOutState);
  const [checkedRoomList, setCheckedRoomList] = useRecoilState(
    cartCheckedRoomListState,
  );

  const handleOrderButton = async () => {
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
      if (checkedRoomList.length > 3) {
        swal({
          title: '예약 한도 초과',
          text: '3개 이상의 상품을 주문할 수 없습니다',
          icon: 'error',
        });
        return;
      }

      if (checkedRoomList.length === 0) {
        swal({
          title: '선택한 상품이 없습니다.',
          icon: 'error',
        });
        return;
      }

      const rooms = checkedRoomList.map(({ roomCode, startDate, endDate }) => ({
        roomCode,
        startDate,
        endDate,
      }));
      const updatedCartData = checkedRoomList.map(
        ({
          roomCode,
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
          roomCode,
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
        swal({
          title: '주문 가능',
          text: '주문 가능한 상품입니다.',
          icon: 'success',
        });
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
        swal({
          title: '상품 품절',
          text: `[${soldOutRoomNames}] 상품이 품절되었습니다. 주문할 수 없습니다.`,
          icon: 'error',
        });
        setCheckedRoomList([]);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <button
      onClick={handleOrderButton}
      css={checkedRoomList.length > 3 ? DisabledButton : OrderButton}
      disabled={checkedRoomList.length > 3}
      type="button"
    >
      주문하기
    </button>
  );
};

export default CartOrder;

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
