/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/no-array-index-key */
import { css } from '@emotion/react';
import OutdoorGrillIcon from '@mui/icons-material/OutdoorGrill';
import FaceRetouchingNaturalIcon from '@mui/icons-material/FaceRetouchingNatural';
import WaterDropIcon from '@mui/icons-material/WaterDrop';
import PedalBikeIcon from '@mui/icons-material/PedalBike';
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import LibraryMusicIcon from '@mui/icons-material/LibraryMusic';
import HotTubIcon from '@mui/icons-material/HotTub';
import ComputerIcon from '@mui/icons-material/Computer';
import ShowerIcon from '@mui/icons-material/Shower';
import Groups2Icon from '@mui/icons-material/Groups2';
import SportsTennisIcon from '@mui/icons-material/SportsTennis';

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

const iconsMap: { [key: string]: JSX.Element } = {
  barbecue: <OutdoorGrillIcon />,
  beauty: <FaceRetouchingNaturalIcon />,
  beverage: <WaterDropIcon />,
  bicycle: <PedalBikeIcon />,
  campfire: <LocalFireDepartmentIcon />,
  fitness: <FitnessCenterIcon />,
  karaoke: <LibraryMusicIcon />,
  publicBath: <HotTubIcon />,
  publicPc: <ComputerIcon />,
  sauna: <ShowerIcon />,
  seminar: <Groups2Icon />,
  sports: <SportsTennisIcon />,
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

  const chunkSize = 4;
  const keys = Object.keys(productAmenityResponse);
  const chunkedKeys = chunkArray(keys, chunkSize);
  const values = Object.values(productAmenityResponse);

  return (
    <>
      <div css={ProductsDetailInfo}>추가 정보</div>
      <div css={ProductsIntroduce}>
        <div css={ProductsIntroduceText}>
          숙소 연락처:{' '}
          {productOptionResponse.infoCenter
            ? productOptionResponse.infoCenter
            : '없음'}
        </div>
        <div css={ProductsIntroduceText}>
          음식점: {productOptionResponse.foodPlace ? '레스토랑' : '없음'}
        </div>
        <div css={ProductsIntroduceText}>
          음식조리: {productOptionResponse.cooking ? '가능' : '불가'}
        </div>
        <div css={ProductsIntroduceText}>
          주차여부: {productOptionResponse.parking ? '가능' : '불가'}
        </div>
        <div css={ProductsIntroduceText}>
          픽업여부: {productOptionResponse.pickup ? '가능' : '불가'}
        </div>
      </div>
      <div css={ProductsDetailInfo}>시설 정보</div>
      <div css={AmenitiesContainer}>
        {chunkedKeys.map((keyGroup, index) => (
          <div key={index} css={AmenityGroup}>
            {keyGroup.map((key, i) => (
              <div key={i} css={AmenityItem}>
                <div css={IconAndTextWrapper}>
                  {iconsMap[key]}
                  <span css={values[keys.indexOf(key)] ? '' : StrikeThrough}>
                    {koreanAmenities[key]}
                  </span>
                </div>
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
  font-size: 1.5rem;
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
  margin-bottom: 5rem;
`;

const AmenityGroup = css`
  display: flex;
  justify-content: space-between;
  font-size: 1.3rem;
  margin-bottom: 1rem;
  font-weight: 500;
`;

const AmenityItem = css`
  flex: 1;
  font-size: 1rem;
  margin-bottom: 2rem;
`;

const StrikeThrough = css`
  text-decoration: line-through;
  text-decoration-thickness: 0.1563rem;
`;

const IconAndTextWrapper = css`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const ProductsIntroduce = css`
  width: 95%;
  margin-left: auto;
  margin-right: auto;
  font-size: 1.2rem;
  font-weight: 500;
  margin-bottom: 2rem;
`;

const ProductsIntroduceText = css`
  font-size: 1rem;
  margin-bottom: 1rem;
`;

function chunkArray<T>(array: T[], size: number): T[][] {
  return Array.from({ length: Math.ceil(array.length / size) }, (_, index) =>
    array.slice(index * size, index * size + size),
  );
}

export default ProductAmenities;
