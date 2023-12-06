/* eslint-disable prefer-template */
/* eslint-disable @typescript-eslint/indent */
/* eslint-disable no-unneeded-ternary */
/* eslint-disable jsx-a11y/label-has-associated-control */
import { useCallback, useMemo } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { css } from '@emotion/react';
import { RiDeleteBin6Line } from 'react-icons/ri';
import swal from 'sweetalert';
import { ResponseCartData } from '../../../types';
import {
  cartSoldOutState,
  cartCheckedRoomListState,
} from '../../../atoms/cartAtom';
import useCart from '../../../hooks/useCart';
import theme from '../../../style/theme';
import CartTotal from './CartTotal';

const CartItem = () => {
  const {
    cartQuery: { data: cartData },
    deleteCartItemMutation,
  } = useCart();
  const [checkedRoomList, setCheckedRoomList] = useRecoilState(
    cartCheckedRoomListState,
  );
  const soldOutData = useRecoilValue(cartSoldOutState);

  const handleCheckbox = useCallback(
    (room: ResponseCartData) => {
      const isChecked = checkedRoomList.includes(room);
      if (isChecked) {
        setCheckedRoomList(checkedRoomList.filter((id) => id !== room));
      } else {
        setCheckedRoomList([...checkedRoomList, room]);
      }
    },
    [checkedRoomList],
  );

  const handleAllCheckbox = useCallback(() => {
    const availableCartData = cartData.filter(
      (cart: ResponseCartData) =>
        !soldOutData.unavailableIds.includes(cart.roomId) && !cart.reserved,
    );
    const allChecked = cartData.every((cart: ResponseCartData) =>
      checkedRoomList.includes(cart),
    );
    if (allChecked) {
      setCheckedRoomList([]);
    } else {
      const allRoomIds = availableCartData.map(
        (cart: ResponseCartData) => cart,
      );
      setCheckedRoomList(allRoomIds);
    }
  }, [checkedRoomList]);

  const totalPrice = useMemo(() => {
    const roomPrices = checkedRoomList
      ? checkedRoomList.map((room) => room.price)
      : [];
    return roomPrices.length > 0
      ? roomPrices.reduce((acc, cur) => acc + cur, 0)
      : 0;
  }, [checkedRoomList]);

  const handleDeleteCartItem = async (cartId: number, productName: string) => {
    try {
      const confirm = await swal({
        title: '삭제',
        text: `[${productName}]을 장바구니에서 제거하시겠습니까?`,
        icon: 'warning',
        buttons: ['취소', '확인'],
      });
      if (confirm) {
        await deleteCartItemMutation.mutate(cartId);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <label htmlFor="allCheckBox" css={AllLabel}>
        <input
          id="allCheckBox"
          type="checkbox"
          css={AllCheckBox}
          onChange={handleAllCheckbox}
          checked={
            cartData &&
            cartData.every((cart: ResponseCartData) =>
              checkedRoomList.includes(cart),
            )
              ? true
              : false
          }
          disabled={soldOutData && soldOutData.unavailableIds.length > 0}
        />
        <p css={AllSelect}>전체 선택</p>
      </label>
      {cartData &&
        cartData.map((cart: ResponseCartData) => (
          <div css={Container} key={`${cart.cartId}_${cart.productName}`}>
            <label htmlFor="box" css={Label}>
              <input
                id="box"
                type="checkbox"
                css={[
                  CheckBox,
                  (soldOutData &&
                    soldOutData.unavailableIds.includes(cart.roomId)) ||
                  cart.reserved
                    ? DisabledCheckBox
                    : null,
                ]}
                onChange={() => handleCheckbox(cart)}
                checked={checkedRoomList.includes(cart)}
                disabled={
                  (soldOutData &&
                    soldOutData.unavailableIds.includes(cart.roomId)) ||
                  cart.reserved
                }
              />
            </label>
            <img css={CartImg} src={cart.image} alt="장바구니 상품 이미지" />
            <div
              css={DescriptionContainer}
              key={`${cart.roomId}_${cart.roomName}`}
            >
              <h3 css={RoomName}>{cart.productName}</h3>
              <p css={RoomPeriod}>
                {cart.startDate} ~ {cart.endDate}
              </p>
              <p css={RoomPeriod}>
                {cart.checkIn} ~ {cart.checkOut}
              </p>
              <p css={RooType}>{cart.roomName}</p>
              <p css={RoomPerson}>
                기준 {cart.standard}명 / 최대 {cart.capacity}명
              </p>
              <p css={RoomDescription}>{cart.desc}</p>
            </div>
            <div css={RightContainer}>
              <RiDeleteBin6Line
                onClick={() =>
                  handleDeleteCartItem(cart.cartId, cart.productName)
                }
                css={DeleteIcon}
              />
              <div css={PriceContainer}>
                {(soldOutData &&
                  soldOutData.unavailableIds.includes(cart.roomId)) ||
                cart.reserved ? (
                  <span css={SoldOutText}>❎해당 상품은 현재 품절입니다.</span>
                ) : (
                  <>
                    <p css={Price}>
                      {new Intl.NumberFormat().format(cart.price) + '원'}
                    </p>
                    {!soldOutData ||
                      (!soldOutData.unavailableIds.includes(cart.roomId) && (
                        <p css={PriceText}>취소 및 환불 불가</p>
                      ))}
                  </>
                )}
              </div>
            </div>
          </div>
        ))}
      <CartTotal totalPrice={totalPrice} />
    </>
  );
};

export default CartItem;

const AllLabel = css`
  display: flex;
  align-items: center;
  gap: 0.8rem;

  margin: 1rem;
`;

const AllCheckBox = css`
  width: 1.5rem;
  height: 1.5rem;

  border: 1.5px solid ${theme.colors.gray600};
  border-radius: 0.35rem;

  cursor: pointer;
  appearance: none;

  &:checked {
    border-color: transparent;

    background-image: url("data:image/svg+xml,%3csvg viewBox='0 0 16 16' fill='white' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M5.707 7.293a1 1 0 0 0-1.414 1.414l2 2a1 1 0 0 0 1.414 0l4-4a1 1 0 0 0-1.414-1.414L7 8.586 5.707 7.293z'/%3e%3c/svg%3e");
    background-size: 100% 100%;
    background-position: 50%;
    background-repeat: no-repeat;
    background-color: ${theme.colors.blue700};
  }
`;

const AllSelect = css`
  font-weight: 700;
`;

const Container = css`
  display: flex;
  align-items: flex-start;

  height: 15rem;

  margin: 3rem 0;
`;

const Label = css`
  margin: 0 1rem;
`;

const CheckBox = css`
  width: 1.5rem;
  height: 1.5rem;

  border: 1.5px solid ${theme.colors.gray600};
  border-radius: 0.35rem;

  cursor: pointer;
  appearance: none;

  &:checked {
    border-color: transparent;

    background-image: url("data:image/svg+xml,%3csvg viewBox='0 0 16 16' fill='white' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M5.707 7.293a1 1 0 0 0-1.414 1.414l2 2a1 1 0 0 0 1.414 0l4-4a1 1 0 0 0-1.414-1.414L7 8.586 5.707 7.293z'/%3e%3c/svg%3e");
    background-size: 100% 100%;
    background-position: 50%;
    background-repeat: no-repeat;
    background-color: ${theme.colors.blue700};
  }
`;

const DisabledCheckBox = css`
  cursor: not-allowed;
  opacity: 0.3;
`;

const CartImg = css`
  width: 15rem;
  height: 15rem;

  border-radius: 0.5rem;
`;

const DescriptionContainer = css`
  display: flex;
  flex-direction: column;
  justify-content: space-around;

  width: 60%;
  height: 90%;

  margin-left: 2rem;
`;

const RoomName = css`
  font-size: 1.5rem;
`;

const RoomPeriod = css`
  font-size: 0.95rem;
`;

const RooType = css`
  font-size: 0.95rem;
  color: ${theme.colors.gray700};
`;

const RoomPerson = css`
  font-size: 0.95rem;
  color: ${theme.colors.gray700};
`;

const RoomDescription = css`
  font-size: 0.95rem;
  color: ${theme.colors.gray700};
`;

const RightContainer = css`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-end;

  height: 90%;
`;

const DeleteIcon = css`
  width: 2rem;
  height: 2rem;

  color: ${theme.colors.gray700};

  cursor: pointer;
  transition: all 0.15s ease-in-out;

  &:hover {
    color: ${theme.colors.gray500};
  }
`;

const PriceContainer = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
`;

const Price = css`
  font-weight: 700;
`;

const SoldOutText = css`
  display: flex;
  justify-content: flex-end;
  width: 15rem;
  font-weight: 700;
  color: ${theme.colors.error};
`;

const PriceText = css`
  font-size: 0.8rem;
  font-weight: 700;
  color: ${theme.colors.error};
`;
