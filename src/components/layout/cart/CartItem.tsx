/* eslint-disable react/destructuring-assignment */
/* eslint-disable import/order */
/* eslint-disable jsx-a11y/label-has-associated-control */
import { css } from '@emotion/react';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { ResponseCartsData, ResponseCartRoomData } from '../../../types';
import React, { useCallback, useMemo, useState } from 'react';
import theme from '../../../style/theme';
import CartTotal from './CartTotal';

interface CartDataProps {
  carts: ResponseCartsData[] | null;
}

const CartItem = (carts: CartDataProps) => {
  const cartsData = carts.carts;
  const rooms: ResponseCartRoomData[] = [];
  const [checkedList, setCheckedList] = useState<number[]>([]);

  if (cartsData) {
    cartsData.forEach((cart) => {
      if (cart.rooms) {
        rooms.push(...cart.rooms);
      }
    });
  }

  const handleCheckbox = useCallback(
    (roomPrice: number) => {
      const isChecked = checkedList.includes(roomPrice);
      if (isChecked) {
        setCheckedList(checkedList.filter((id) => id !== roomPrice));
      } else {
        setCheckedList([...checkedList, roomPrice]);
      }
    },
    [checkedList],
  );

  const handleAllCheckbox = useCallback(() => {
    const allChecked = rooms.every((room) => checkedList.includes(room.price));
    if (allChecked) {
      setCheckedList([]);
    } else {
      const allRoomIds = rooms.map((room) => room.price) || [];
      setCheckedList(allRoomIds);
    }
  }, [checkedList]);

  const totalPrice = useMemo(
    () => checkedList.reduce((acc, cur) => acc + cur, 0),
    [checkedList],
  );

  return (
    <>
      <label htmlFor="allCheckBox" css={AllLabel}>
        <input
          id="allCheckBox"
          type="checkbox"
          css={AllCheckBox}
          onChange={handleAllCheckbox}
          checked={
            rooms &&
            rooms.length > 0 &&
            rooms.every((room) => checkedList.includes(room.price))
          }
        />
        <p css={AllSelect}>전체 선택</p>
      </label>
      {cartsData &&
        cartsData.map((cart) => (
          <div css={Container} key={cart.productId}>
            {cart.rooms?.map((room) => (
              <React.Fragment key={room.roomId}>
                <label htmlFor="box" css={Label}>
                  <input
                    id="box"
                    type="checkbox"
                    css={CheckBox}
                    onChange={() => handleCheckbox(room.price)}
                    checked={checkedList.includes(room.price)}
                  />
                </label>
                <img
                  css={CartImg}
                  src={cart.images}
                  alt="장바구니 상품 이미지"
                />
                <div css={DescriptionContainer} key={room.roomId}>
                  <h3 css={RoomName}>{cart.productName}</h3>
                  <p css={RoomPeriod}>
                    {room.checkIn} ~ {room.checkOut}
                  </p>
                  <p css={RooType}>{room.roomName}</p>
                  <p css={RoomPerson}>
                    기준 {room.standard}명 / 최대 {room.capacity}명
                  </p>
                  <p css={RoomDescription}>{room.desc}</p>
                </div>
                <div css={RightContainer}>
                  <RiDeleteBin6Line css={DeleteIcon} />
                  <div css={PriceContainer}>
                    <p css={Price}>
                      {new Intl.NumberFormat().format(room.price)}원
                    </p>
                    <p css={PriceText}>취소 및 환불 불가</p>
                  </div>
                </div>
              </React.Fragment>
            ))}
          </div>
        ))}
      <CartTotal totalPrice={totalPrice} checkedList={checkedList} />
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

const PriceText = css`
  font-size: 0.8rem;
  font-weight: 700;
  color: ${theme.colors.error};
`;
