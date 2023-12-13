/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/no-array-index-key */
import { css } from '@emotion/react';

const koreanAmenities: { [key: string]: string } = {
  barbecue: '바베큐',
  beauty: '화장대',
  beverage: '식수대',
  bicycle: '사이클',
  campfire: '캠프파이어',
  fitness: '헬스장',
  karaoke: '노래방',
  publicBath: '목욕탕',
  publicPc: '피시방',
  sauna: '사우나',
  seminar: '세미나실',
  sports: '운동기구',
};

export type ProductOption = {
  cooking: boolean;
  parking: boolean;
  pickup: boolean;
  foodPlace: string;
  infoCenter: string;
};

interface ProductOptionResponse {
  [key: string]: boolean | string;
}

interface ProductAmenityResponse {
  [key: string]: boolean;
}

const ProductAmenities = ({
  productDetail,
}: {
  productDetail: {
    productAmenityResponse: ProductAmenityResponse;
    productOptionResponse: ProductOptionResponse;
  };
}) => {
  const { productAmenityResponse, productOptionResponse } = productDetail;

  const amenityKeys = Object.keys(productAmenityResponse).map(
    (key) => koreanAmenities[key],
  ) as string[];

  const amenityValues = Object.values(productAmenityResponse) as boolean[];

  const chunkSize = 4;
  const chunkedKeys = chunkArray(amenityKeys, chunkSize);
  const chunkedValues = chunkArray(amenityValues, chunkSize);

  return (
    <>
      <div css={ProductsDetailInfo}>추가 정보</div>
      <div css={AmenitiesContainer}>
        <div>
          <div>
            숙소 연락처:{' '}
            {productOptionResponse.infoCenter
              ? productOptionResponse.infoCenter
              : '없음'}
          </div>
          <div>
            음식점: {productOptionResponse.foodPlace ? '레스토랑' : '없음'}
          </div>
          <div>음식조리: {productOptionResponse.cooking ? '가능' : '불가'}</div>
          <div>주차여부: {productOptionResponse.parking ? '가능' : '불가'}</div>
          <div>픽업여부: {productOptionResponse.pickup ? '가능' : '불가'}</div>
        </div>
        {chunkedKeys.map((keys, index) => (
          <div key={index} css={AmenityGroup}>
            {keys.map((key, i) => (
              <div key={i} css={AmenityItem}>
                {chunkedValues[index][i] ? '✅' : '❌'} {key}
              </div>
            ))}
          </div>
        ))}
      </div>
    </>
  );
};

const ProductsDetailInfo = css`
  width: 95%;
  display: flex;
  justify-content: flex-start;
  font-size: 2rem;
  font-weight: 600;
  margin-bottom: 2rem;
  margin-top: 4rem;
  margin-left: auto;
  margin-right: auto;
`;

const AmenitiesContainer = css`
  display: flex;
  width: 95%;
  flex-direction: column;
  margin-left: auto;
  margin-right: auto;
`;

const AmenityGroup = css`
  display: flex;
  justify-content: space-between;
  font-size: 1.3rem;
  margin-bottom: 0.625rem;
  font-weight: 500;
`;

const AmenityItem = css`
  flex: 1;
`;

function chunkArray<T>(array: T[], size: number): T[][] {
  return Array.from({ length: Math.ceil(array.length / size) }, (_, index) =>
    array.slice(index * size, index * size + size),
  );
}

export default ProductAmenities;
