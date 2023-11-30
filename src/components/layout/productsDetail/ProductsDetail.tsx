/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable no-nested-ternary */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/no-array-index-key */
/* eslint-disable react/jsx-props-no-spreading */
import { css } from '@emotion/react';
import { SetStateAction, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
// import axios from 'axios';
import Slider from 'react-slick';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import { format } from 'date-fns';
import Modal from 'react-modal';
import { axiosWithNoToken, axiosWithAccessToken } from '../../../Axios';
import theme from '../../../style/theme';
import { CartItem, RequestProductDetail, Room } from '../../../types';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import CalendarComponent from './Calendar';
import PeopleSelector from './PeopleSelector';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const ProductsDetail = () => {
  const [productDetail, setProductDetail] =
    useState<RequestProductDetail | null>(null);

  const [count, setCount] = useState(2);

  const { productId } = useParams();

  const [nights, setNights] = useState(1);

  const today = new Date();
  const tomorrow = new Date(today.getTime() + 86400000);

  const [defaultDate, setDefaultDate] = useState(format(today, 'yyyy-MM-dd'));
  const [defaultDatePlusDay, setDefaultDatePlusDay] = useState(
    format(tomorrow, 'yyyy-MM-dd'),
  );

  // 선택한 숙박일 수 부모 컴포넌트 상태에 업데이트
  const handleSetNights = (selectedNights: SetStateAction<number>) => {
    setNights(selectedNights);
  };

  const [enterDate, setEnterDate] = useState('');
  const [exitDate, setExitDate] = useState('');

  // 캘린더에서 날짜 선택했을 때 로직(입실날짜 및 퇴실날짜 설정)
  const handleEnterExitDatesChange = (enterDate: string, exitDate: string) => {
    setEnterDate(enterDate);
    setExitDate(exitDate);

    const startDateFormatted = format(new Date(enterDate), 'yyyy-MM-dd');
    const endDateFormatted = format(new Date(exitDate), 'yyyy-MM-dd');

    setDefaultDate(startDateFormatted);
    setDefaultDatePlusDay(endDateFormatted);
  };

  console.log(today, tomorrow);

  useEffect(() => {
    const fetchDataProductDetail = async ({
      startDate,
      endDate,
    }: Pick<RequestProductDetail, 'startDate' | 'endDate'>) => {
      try {
        // if (!startDate || !endDate) return;
        const response = await axiosWithNoToken.get(
          `/api/products/${productId}?startDate=${startDate}&endDate=${endDate}`,
        );
        console.log('ProductDetail', response);
        setProductDetail(response.data.data);
      } catch (error) {
        console.error('Error fetching product detail:', error);
      }
    };

    fetchDataProductDetail({
      startDate: enterDate || defaultDate,
      endDate: exitDate || defaultDatePlusDay,
    });
  }, [enterDate, exitDate]);

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const openModal = () => {
    Modal.setAppElement('#root');
    setModalIsOpen(true);
  };
  const closeModal = () => {
    setModalIsOpen(false);
  };

  const addToCart = async (product: RequestProductDetail, room: Room) => {
    if (!product || !room) {
      console.error('Product or room information is missing');
      return;
    }

    const requestData = {
      roomId: room.roomId,
      productId: product.productId,
      productName: product.productName,
      images: product.images,
      price: parseFloat(`${room.price}`) * nights,
      desc: room.description,
      standard: room.standard,
      capacity: room.capacity,
      startDate: defaultDate,
      endDate: defaultDatePlusDay,
      checkIn: room.checkIn,
      checkOut: room.checkOut,
    };

    try {
      // 로컬스토리지에 상품 담기
      const existingCartItems = localStorage.getItem('cartItems');
      const cartItems = existingCartItems ? JSON.parse(existingCartItems) : [];

      // 아이템이 장바구니에 있는지 확인
      const existingItemIndex = cartItems.findIndex(
        (item: CartItem) =>
          item.roomId === room.roomId &&
          item.startDate === defaultDate &&
          item.endDate === defaultDatePlusDay,
      );

      // 장바구니에 아이템 X
      if (existingItemIndex === -1) {
        cartItems.push(requestData);

        // 로컬스토리지에 저장
        localStorage.setItem('cartItems', JSON.stringify(cartItems));

        const response = await axiosWithAccessToken.post(
          '/api/carts',
          requestData,
        );
        console.log('Added to cart:', response);
      } else {
        openModal();
        console.log('Item already exists in the cart');
      }
    } catch (error) {
      console.error('Error adding to cart:', error);
    }
  };

  if (!productDetail) {
    return <div>Loading...</div>;
  }

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    autoplay: true,
    slidesToShow: 1,
    autoplaySpeed: 2000,
  };

  if (!productDetail || !productDetail.images) {
    console.log('ProductDetail or images are undefined:', productDetail);
    console.log(productDetail.images);
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div css={ProductDetailContainer}>
        <Slider {...settings} css={SliderStyle}>
          {productDetail?.images.map((image, index) => (
            <div key={index} css={SlideItem}>
              <div
                css={ProductDetailImg}
                style={{ backgroundImage: `url(${image})` }}
              />
            </div>
          ))}
        </Slider>
        <div css={ProductDetailBox}>
          <div css={ProductData}>
            <div css={NameScoreContainer}>
              <div css={ProductName}>{productDetail.productName}</div>
              <div css={ProductScore}>
                <p>⭐</p>
                {productDetail.starAvg.toFixed(1)}
              </div>
            </div>
            <div css={ProductsLocation}>{productDetail.address}</div>
          </div>
        </div>
        <div css={OptionSelector}>
          <div css={[DayCalendar, Divider]}>
            <CalendarComponent
              setNights={handleSetNights}
              onEnterExitDatesChange={handleEnterExitDatesChange}
            />
          </div>
          <div css={PeopleCount}>
            <PeopleSelector count={count} setCount={setCount} />
          </div>
        </div>
        <div css={RoomContainer}>
          {productDetail.rooms.map((room) => (
            <div key={`room ${room.roomId}`} css={RoomItem}>
              <div
                css={RoomImg}
                style={{ backgroundImage: `url('${productDetail.images[0]}')` }}
              />
              <div css={RoomInfo}>
                <div css={RoomName}>{room.roomName}</div>
                <div>{`기준 ${room.standard}인 / 최대 ${room.capacity}인`}</div>
                <div>{room.description}</div>
                <div css={checkTime}>
                  {`${room.checkIn} ~ ${room.checkOut}`}
                </div>
              </div>
              <div css={RoomAction}>
                <div css={priceStyle}>
                  {parseFloat(`${room.price}`) * nights}원
                </div>
                <div css={buyBtn}>
                  {room.reserved ? (
                    <>
                      <AiOutlineShoppingCart css={NoCartIcon} />{' '}
                      {/* 예약 불가 아이콘 */}
                      <button type="button" css={exceedText}>
                        예약불가
                      </button>
                    </>
                  ) : (
                    <>
                      {count < room.capacity ? (
                        <>
                          <AiOutlineShoppingCart
                            css={CartIcon}
                            onClick={() => addToCart(productDetail, room)}
                          />
                          <button type="button" css={reservationButton}>
                            예약하기
                          </button>
                        </>
                      ) : (
                        <>
                          <AiOutlineShoppingCart css={NoCartIcon} />{' '}
                          <button type="button" css={exceedText}>
                            인원초과
                          </button>
                        </>
                      )}
                    </>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
        <Modal
          css={modalStyle}
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          contentLabel="장바구니 안내"
          shouldCloseOnOverlayClick={false}
        >
          <div css={modalText1}>장바구니 안내</div>
          <div css={modalTextContainer}>
            <div css={modalText2}>
              이미 같은 날짜에 장바구니에 상품이 담겨있습니다.
            </div>
            <div css={modalText3}>장바구니를 확인해주세요.</div>
          </div>
          <button css={modalBtn} type="button" onClick={closeModal}>
            닫기
          </button>
        </Modal>
      </div>
    </div>
  );
};

export default ProductsDetail;

const ProductDetailContainer = css`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  /* margin-top: 4rem; */
  background-color: rgba(255, 2555, 255, 0.8);
`;

const SliderStyle = css`
  width: 100%;
  height: 500px;
  overflow: hidden;
`;

const SlideItem = css`
  width: 100%;
  height: 100%;
`;

const ProductDetailImg = css`
  width: 100%;
  height: 500px;
  background-size: cover;
  /* border-radius: 10px; */
  display: block;
  object-fit: cover;
`;

const ProductDetailBox = css`
  width: 100%;
  //   max-width: 1000px;
  display: flex;
  gap: 20px;
  margin-top: 3rem;
`;

const ProductData = css`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
`;

const NameScoreContainer = css`
  display: flex;
  justify-content: space-between;
  width: 95%;
  align-items: center;
  font-size: 14px;
`;

const ProductScore = css`
  display: flex;

  /* margin-left: auto; */
  font-size: 1.875rem;
  font-weight: bold;
  /* width: 6.25rem; */
`;

export const ProductName = css`
  width: 100%;

  display: flex;
  justify-content: flex-start;

  font-size: 3rem;
  font-weight: 600;
`;

const ProductsLocation = css`
  width: 95%;

  display: flex;
  justify-content: flex-start;

  font-size: 2.25rem;
  font-weight: 600;

  margin-top: 2rem;
`;

const OptionSelector = css`
  display: flex;
  width: 100%;
  background-color: ${theme.colors.white};
  border: 1px solid #ccc;
  /* border-radius: 4px; */
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
  margin-top: 4rem;
`;

const Divider = css`
  border-right: 1px solid #ccc;
`;

const DayCalendar = css`
  flex: 1;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding-left: 0.5rem;
`;

const PeopleCount = css`
  flex: 1;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding-left: 0.5rem;
`;

const RoomContainer = css`
  display: flex;
  flex-direction: column;
  /* margin-top: 50px; */
`;

const RoomItem = css`
  display: flex;
  padding: 20px;
  border: 1px solid #e5e9ed;
  /* border-radius: 10px; */
  /* box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25); */
  background-color: ${theme.colors.white};
  width: 1280px;
  height: 250px;
  /* margin-bottom: 50px; */
`;

const RoomImg = css`
  width: 30%;
  border-radius: 10px;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
`;

const RoomInfo = css`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 10px;
  margin-left: 20px;
  font-weight: bold;
`;

const RoomName = css`
  font-size: 36px;
`;

const checkTime = css`
  font-size: 20px;
`;

const RoomAction = css`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  margin-left: auto;
  padding: 10px;
`;

const priceStyle = css`
  align-self: flex-end;
  margin-bottom: 10px;
  font-size: 30px;
`;

const buyBtn = css`
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  margin-top: auto;
`;

const CartIcon = css`
  width: 2.5rem;
  height: 2.5rem;

  color: ${theme.colors.blue500};

  cursor: pointer;
  transition: all 0.3s ease-in-out;

  &:hover {
    color: ${theme.colors.blue700};
  }

  margin-right: 2rem;
`;

const NoCartIcon = css`
  width: 2.5rem;
  height: 2.5rem;
  color: ${theme.colors.gray500};
  cursor: not-allowed;
  margin-right: 2rem;
`;

const reservationButton = css`
  padding: 10px 20px;
  background-color: ${theme.colors.blue700};
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  font-size: 16px;
  outline: none;

  &:hover {
    background-color: ${theme.colors.blue800};
  }

  &:active {
    transform: translateY(1px);
  }
`;

const exceedText = css`
  padding: 10px 20px;
  background-color: ${theme.colors.gray500};
  color: white;
  border: none;
  border-radius: 5px;
  cursor: not-allowed;
  transition: background-color 0.3s ease;
  font-size: 16px;
  outline: none;
`;

const modalStyle = css`
  display: flex;
  flex-direction: column;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 400px;
  height: 250px;
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 20px;
  background-color: white;
`;

const modalTextContainer = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex: 1;
`;

const modalText1 = css`
  font-size: 20px;
  font-weight: bold;
  margin-right: auto;
  margin-left: auto;
  margin-top: 10px;
`;

const modalText2 = css`
  text-align: center;
  margin-bottom: 10px;
`;

const modalText3 = css`
  text-align: center;
  margin-top: 10px;
`;

const modalBtn = css`
  padding: 8px 16px;
  background-color: ${theme.colors.blue600};
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: ${theme.colors.blue800};
  }
`;
