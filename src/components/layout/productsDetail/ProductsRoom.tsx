/* eslint-disable react/button-has-type */
/* eslint-disable jsx-a11y/img-redundant-alt */
/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import { css } from '@emotion/react';

const containerStyle = css`
  display: flex;
  margin-top: 3rem;
  height: 12.5rem;
`;

const roomImageStyle = css`
  flex: 1;
`;

const roomImageImgStyle = css`
  max-width: 100%;
  height: auto;
  width: 18.75rem;
  border-radius: 2px;
`;

const roomDetailsStyle = css`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 20px;
`;

const priceStyle = css`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`;

const actionsStyle = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

function ProductsRoom({ data }) {
  return (
    <div css={containerStyle}>
      <div css={roomImageStyle}>
        <img css={roomImageImgStyle} src={data.images[0]} alt="Room Image" />
      </div>
      <div css={roomDetailsStyle}>
        <h2>{data.productName}</h2>
        <p>{data.desc}</p>
        <p>Price: {data.rooms[0].price.toLocaleString()}원 ~</p>
        <div css={priceStyle}>
          <p>{data.rooms[0].desc}</p>
          <p>{data.rooms[0].reserved ? 'Reserved' : 'Available'}</p>
        </div>
        <div css={actionsStyle}>
          <p>장바구니</p>
          <button>예약하기</button>
        </div>
      </div>
    </div>
  );
}

function MyComponent() {
  const [productData, setProductData] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const mockData = {
          code: 200,
          message: '상품을 성공적으로 조회했습니다.',
          data: {
            productId: 3,
            productName: '서산 오션 호텔',
            desc: '호텔 내 수영장이 있어요.',
            images: ['이미지url', '이미지2url'],
            rooms: [
              {
                roomId: 1,
                roomName: '디럭스룸',
                price: 100000,
                desc: '실내 흡연 금지',
                reserved: true,
              },
            ],
          },
        };

        setProductData(mockData.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }

    fetchData();
  }, []);

  return <div>{productData && <ProductsRoom data={productData} />}</div>;
}

export default MyComponent;
