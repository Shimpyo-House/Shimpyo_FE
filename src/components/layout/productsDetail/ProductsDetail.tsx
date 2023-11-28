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
import { axiosWithNoToken } from '../../../Axios';
import theme from '../../../style/theme';
import { RequestProductDetail } from '../../../types';
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

  // 선택한 숙박일 수 부모 컴포넌트 상태에 업데이트
  const handleSetNights = (selectedNights: SetStateAction<number>) => {
    setNights(selectedNights);
  };

  useEffect(() => {
    const fetchDataProductDetail = async ({
      startDate,
      endDate,
    }: Pick<RequestProductDetail, 'startDate' | 'endDate'>) => {
      try {
        const response = await axiosWithNoToken.get(
          `/api/products/${productId}?startDate=${startDate}&endDate=${endDate}`,
        );
        console.log('ProductDetail', response);
        setProductDetail(response.data.data);
        console.log(setProductDetail(response.data.data));
      } catch (error) {
        console.error('Error fetching product detail:', error);
      }
    };

    fetchDataProductDetail({
      startDate: '2023-11-22',
      endDate: '2023-11-23',
    });
  }, []);

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

  console.log(nights);

  const realPrice = productDetail.rooms[0].price;

  console.log(realPrice);

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
                ⭐ {productDetail.starAvg.toFixed(1)}
              </div>
            </div>
            <div css={ProductsLocation}>{productDetail.address}</div>
          </div>
        </div>
        <div css={OptionSelector}>
          <div css={DayCalendar}>
            <CalendarComponent setNights={handleSetNights} />
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
                  <AiOutlineShoppingCart css={CartIcon} />
                  {count <= room.capacity ? (
                    <button
                      type="button"
                      css={reservationButton}
                      onClick={() => {}}
                    >
                      예약하기
                    </button>
                  ) : (
                    <button type="button" css={exceedText}>
                      인원초과
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductsDetail;

const ProductDetailContainer = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 4rem;
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
  border-radius: 10px;
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
  width: 100%;
  align-items: center;
  font-size: 14px;
`;

const ProductScore = css`
  margin-left: auto;
  font-size: 1.875rem;
  font-weight: bold;
  width: 6.25rem;
`;

export const ProductName = css`
  width: 100%;

  display: flex;
  justify-content: flex-start;

  font-size: 3rem;
  font-weight: 600;
`;

const ProductsLocation = css`
  width: 100%;

  display: flex;
  justify-content: flex-start;

  font-size: 2.25rem;
  font-weight: 600;

  margin-top: 2rem;
`;

const OptionSelector = css`
  display: flex;
  align-items: center;
  margin-top: 3rem;
  margin-right: auto;
`;

const DayCalendar = css`
  flex: 1;
  white-space: nowrap;
  text-align: center;
  margin-right: 1rem;
`;

const PeopleCount = css`
  flex: 1;
  white-space: nowrap;
  text-align: center;
`;

const RoomContainer = css`
  display: flex;
  flex-direction: column;
  margin-top: 50px;
`;

const RoomItem = css`
  display: flex;
  padding: 20px;
  border: 1px solid #e5e9ed;
  border-radius: 10px;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
  width: 1280px;
  height: 250px;
  margin-bottom: 50px;
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

const reservationButton = css`
  padding: 10px 20px;
  background-color: #3d91ff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  font-size: 16px;
  outline: none;

  &:hover {
    background-color: #2565cb;
  }

  &:active {
    transform: translateY(1px);
  }
`;

const exceedText = css`
  padding: 10px 20px;
  background-color: #cccccc;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: not-allowed;
  transition: background-color 0.3s ease;
  font-size: 16px;
  outline: none;
`;
