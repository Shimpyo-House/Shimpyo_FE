/* eslint-disable import/no-named-as-default */
/* eslint-disable react/jsx-boolean-value */

import { css } from '@emotion/react';
import { Link } from 'react-router-dom';
import { IoIosArrowForward } from 'react-icons/io';
import RowList from './RowList';
import theme from '../../../style/theme';
import ColumnList from './ColumnList';
import { ResponseProductsData } from '../../../types';

type PropsType = {
  data: ResponseProductsData[][] | undefined;
};

const NormalCategory = ({ data }: PropsType) => {
  let hotData: ResponseProductsData[] = [];
  let hotelData: ResponseProductsData[] = [];
  let pensionData: ResponseProductsData[] = [];
  let koreaData: ResponseProductsData[] = [];
  if (data) {
    [hotData, pensionData, hotelData, koreaData] = data;
  }

  return (
    <div css={PageBox}>
      <div css={CategoryBox}>
        <h2 css={CategoryName}>
          <Link css={LinkBox} to="/category?type=hot">
            인기 숙소
            <IoIosArrowForward className="arrowIcon" />
          </Link>
        </h2>
        <p css={CategoryDesc}>가장 잘 나가는 숙소 추천</p>
        <ColumnList data={hotData} />
      </div>
      <div css={CategoryBox}>
        <h2 css={CategoryName}>
          <Link css={LinkBox} to="/category?type=관광호텔">
            호텔
            <IoIosArrowForward className="arrowIcon" />
          </Link>
        </h2>
        <p css={CategoryDesc}>지금 떠나는 도심 호캉스!</p>
        <RowList data={hotelData} />
      </div>
      <div css={CategoryBox}>
        <h2 css={CategoryName}>
          <Link css={LinkBox} to="/category?type=펜션">
            펜션
            <IoIosArrowForward className="arrowIcon" />
          </Link>
        </h2>
        <p css={CategoryDesc}>자연과 함께 즐기는 펜션여행</p>
        <RowList data={pensionData} />
      </div>
      <div css={CategoryBox}>
        <h2 css={CategoryName}>
          <Link css={LinkBox} to="/category?type=한옥">
            한옥
            <IoIosArrowForward className="arrowIcon" />
          </Link>
        </h2>
        <p css={CategoryDesc}>한옥에서 즐기는 대한민국의 정취</p>
        <RowList data={koreaData} />
      </div>
    </div>
  );
};

export default NormalCategory;

const PageBox = css`
  position: relative;

  display: flex;
  flex-direction: column;
  align-items: center;

  min-height: calc(100vh - 70px);

  background-color: rgba(255, 2555, 255, 0.8);

  padding: 3.125rem 0;
  gap: 3.125rem;
`;
const CategoryBox = css`
  width: 68.75rem;

  display: flex;
  flex-direction: column;

  gap: 0.9375rem;
`;
const CategoryName = css`
  display: flex;
  align-items: center;

  font-size: 1.875rem;
  font-weight: 700;

  .arrowIcon {
    color: ${theme.colors.blue800};
  }
`;
const LinkBox = css`
  display: flex;
  align-items: center;
`;
const CategoryDesc = css`
  color: ${theme.colors.gray700};

  font-size: 1rem;
`;
