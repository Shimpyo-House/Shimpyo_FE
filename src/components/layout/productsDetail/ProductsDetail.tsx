/* eslint-disable react/button-has-type */
/* eslint-disable import/extensions */
import { css } from '@emotion/react';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { ResponseProductsData } from '../../../types';
import Calendar from './Calendar';

const ProductsDetail = () => {
  const [productDetail, setProductDetail] =
    useState<ResponseProductsData | null>(null);

  const { productId } = useParams();

  useEffect(() => {
    console.log(ProductName);
    console.log(productDetail);
    console.log(productId);
    console.log(productDetail?.productName);

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

  return (
    <div css={ProductDetailContainer}>
      <div css={ProductDetailImgBox}>
        <div
          css={ProductDetailImg}
          style={{ backgroundImage: `url('${productDetail.images[0]}')` }}
        />
      </div>
      <div css={ProductDetailBox}>
        <div css={ProductData}>
          <div css={NameScoreContainer}>
            <div css={ProductName}>{productDetail.productName}</div>
            <div css={ProductScore}>⭐ {productDetail.starAvg}</div>
          </div>
          <div css={ProductsLocation}>{productDetail.address}</div>
        </div>
      </div>
      <div css={DayCalendar}>
        <Calendar onChange={undefined} value={undefined} />
      </div>
      <div css={RoomContainer}>
        {productDetail.rooms.map((room) => (
          <div key={room.roomId} css={RoomItem}>
            <div
              css={RoomImg}
              style={{ backgroundImage: `url('${productDetail.images[0]}')` }}
            />
            <div css={RoomInfo}>
              <div css={RoomName}>{room.roomName}</div>
              <div>{`기준 ${room.standard}인 / 최대 ${
                room['capacity '] || '정보없음'
              }인`}</div>
              <div>{room.desc}</div>
              <div css={checkTime}>체크인 15:00 ~ 체크아웃 11:00</div>
            </div>
            <div css={RoomAction}>
              <div css={priceStyle}>{room.price}</div>
              <div css={buyBtn}>
                <button>장바구니</button>
                <button>예약하기</button>
              </div>
            </div>
          </div>
        ))}
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

const ProductDetailImgBox = css`
  width: 100%;
  //   max-width: 1000px;
`;

const ProductDetailBox = css`
  width: 100%;
  //   max-width: 1000px;
  display: flex;
  gap: 20px;
  margin-top: 3rem;
`;

const ProductDetailImg = css`
  width: 800;
  height: 500px;

  background-image: url('/public/img1.jpeg');
  background-size: cover;

  border-radius: 10px;
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

const DayCalendar = css`
  width: 100%;
  //   max-width: 1000px;

  display: flex;
  justify-content: flex-start;

  margin-top: 2.5rem;
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
