/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/no-array-index-key */
/* eslint-disable react/jsx-props-no-spreading */
import { css } from '@emotion/react';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Slider from 'react-slick';
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

  const { productId } = useParams();

  useEffect(() => {
    console.log(ProductName);
    console.log(productDetail);
    console.log(productId);
    console.log(productDetail?.productName);
    console.log(productDetail?.images);

    const fetchProductDetail = async () => {
      try {
        if (productId) {
          const response = await axios.get(`/api/products/${productId}`);
          console.log(response.data.data);
          console.log(response.data);
          setProductDetail(response.data.data);
        }
      } catch (error) {
        console.error('Error fetching product details:', error);
      }
    };

    fetchProductDetail();
  }, [productId]);

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

  return (
    <div>
      <div css={ProductDetailContainer}>
        <Slider {...settings} css={SliderStyle}>
          {productDetail.images.map((image, index) => (
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
              <div css={ProductScore}>⭐ {productDetail.starAvg}</div>
            </div>
            <div css={ProductsLocation}>{productDetail.address}</div>
          </div>
        </div>
        <div css={OptionSelector}>
          <div css={DayCalendar}>
            <CalendarComponent />
          </div>
          <div css={PeopleCount}>
            <PeopleSelector />
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
                <div css={checkTime}>체크인 15:00 ~ 체크아웃 11:00</div>
              </div>
              <div css={RoomAction}>
                <div css={priceStyle}>{room.price}</div>
                <div css={buyBtn}>
                  <button type="button">장바구니</button>
                  <button type="button">예약하기</button>
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
