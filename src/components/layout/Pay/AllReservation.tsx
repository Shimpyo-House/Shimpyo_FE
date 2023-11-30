import { useState, useEffect } from 'react';
import { css } from '@emotion/react';
import { useSetRecoilState } from 'recoil';
import theme from '../../../style/theme';
import OrderAxios from '../../../api/OrderComplete';
import { loadingAtom } from '../../../atoms/loading';
import StarModal from '../../common/StarModal';

export type ModalInfoType = {
  productId: number;
  productName: string;
  reservationProductId: number;
};

const AllReservation = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [modalInfo, setModalInfo] = useState<ModalInfoType>({
    productId: 0,
    productName: '',
    reservationProductId: 0,
  });
  const setLoading = useSetRecoilState(loadingAtom);
  const [orderCom, setOrderCom] = useState<any>('');

  const handlerOnClickRegisterStar = ({
    productId,
    productName,
    reservationProductId,
  }: ModalInfoType) => {
    setIsOpen(true);
    setModalInfo({ productId, productName, reservationProductId });
  };

  useEffect(() => {
    const orderedData = async () => {
      try {
        setLoading({ isLoading: true, message: '현재 주문중입니다' });
        const data = await OrderAxios();
        setOrderCom(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading({ isLoading: false, message: '' });
      }
    };

    orderedData();
  }, []);

  const productArray = orderCom?.content ?? [];

  return (
    <div>
      <StarModal isOpen={isOpen} setIsOpen={setIsOpen} modalInfo={modalInfo} />
      {productArray.length > 0 ? (
        productArray.map((product: any) => {
          return (
            <nav css={ReservationWrap}>
              <div css={WrapContainer}>
                <h1>{product.startDate}</h1>
                <button
                  onClick={() =>
                    handlerOnClickRegisterStar({
                      productId: product.productId,
                      productName: product.productName,
                      reservationProductId: product.reservationProductId,
                    })
                  }
                  css={RoomRate}
                  type="button"
                >
                  별점 남기기
                </button>
              </div>
              <hr />

              <div>
                <div css={ReserveTitle}>{product.productName}</div>
                <div css={MakeReservation}>{product.productAddress}</div>

                <div css={ContentWrap}>
                  <div css={MainImg}>
                    <img src={product.productImageUrl} alt="호텔 이미지" />
                  </div>

                  <div css={RoomInfoWrap}>
                    <div css={RoomInfoTitle}>{product.roomName}</div>
                    <div>
                      {product.startDate} ~ {product.endDate}
                    </div>
                    <div>
                      체크인 {product.checkIn} | 체크아웃 {product.checkOut}
                    </div>
                    <div>결제 수단 | {product.payMethod}</div>
                    <div css={ReservationPrice}>
                      결제 금액 | {product.price.toLocaleString()}원
                    </div>
                  </div>
                </div>
              </div>
            </nav>
          );
        })
      ) : (
        <div css={ErrorMessage}>예약 내역이 없습니다.</div>
      )}
    </div>
  );
};

const ReservationWrap = css`
  width: 55%;
  padding: 2rem;
  margin: 0 auto;
  margin-top: 1rem;

  box-shadow: 1px 1px 4px 0px #cacaca;
  border-radius: 5px;

  h1 {
    margin-bottom: 1.5rem;

    font-size: 1.3rem;
    font-weight: 900;
  }

  hr {
    margin-bottom: 1rem;
    height: 1px;
    background: ${theme.colors.gray500};
    border: 0;
  }
`;

const WrapContainer = css`
  display: flex;
  justify-content: space-between;
`;

const MakeReservation = css`
  margin-bottom: 1rem;
  font-size: 0.8rem;
  color: ${theme.colors.gray700};
`;

const ReserveTitle = css`
  margin-top: 1rem;
  margin-bottom: 1rem;

  font-size: 1.5rem;
  font-weight: 700;
`;

const ContentWrap = css`
  display: flex;
`;

const MainImg = css`
  width: 60%;
  max-width: 19rem;
  img {
    max-width: 100%;
    border-radius: 5px;
  }
`;

const RoomInfoWrap = css`
  margin-left: 2rem;

  display: flex;
  flex-direction: column;
  font-size: 1rem;
  justify-content: center;
  align-items: flex-start;

  div {
    margin-bottom: 1rem;
  }
`;

const RoomInfoTitle = css`
  font-size: 1.1rem;
  font-weight: 600;
`;

const ReservationPrice = css`
  font-weight: 700;
`;

const RoomRate = css`
  margin-top: -0.3rem;
  padding: 0.1rem 0.8rem 0.2rem;
  height: 2rem;

  display: flex;
  justify-content: center;
  align-items: center;

  border-radius: 5px;
  background-color: ${theme.colors.blue700};
  color: #fff;
  font-size: 0.9rem;
  font-weight: 600;
  transition: 0.2s;

  &:hover {
    background-color: ${theme.colors.blue600};
  }
`;
const ErrorMessage = css`
  display: flex;
  justify-content: center;
  align-items: center;

  height: 80vh;

  font-size: 1.5rem;
  font-weight: 800;
`;

export default AllReservation;
