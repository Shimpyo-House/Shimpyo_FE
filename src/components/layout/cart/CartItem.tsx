/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable import/no-cycle */
/* eslint-disable jsx-a11y/label-has-associated-control */
import { css } from '@emotion/react';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { CheckBox } from '../../../pages/Cart';
import { ResponseCartsData } from '../../../types';
import theme from '../../../style/theme';

interface CartsDataProps {
  carts: ResponseCartsData[] | null;
}

const CartItem = (carts: CartsDataProps) => {
  return (
    <>
      {carts?.carts &&
        carts?.carts.map((cart) => (
          <div css={Container} key={cart.productId}>
            <label htmlFor="box" css={Label}>
              <input id="box" type="checkbox" css={CheckBox} />
            </label>
            <img css={CartImg} src={cart.images} alt="장바구니 상품 이미지" />
            {cart.rooms?.map((room) => (
              <>
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
                    <p css={Price}>{room.price}</p>
                    <p css={PriceText}>취소 및 환불 불가</p>
                  </div>
                </div>
              </>
            ))}
          </div>
        ))}
    </>
  );
};

export default CartItem;

const Container = css`
  display: flex;
  align-items: flex-start;

  height: 15rem;

  margin: 3rem 0;
`;

const Label = css`
  margin: 0 1rem;
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
