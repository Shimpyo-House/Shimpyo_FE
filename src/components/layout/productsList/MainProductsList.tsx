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
  let pensionData: ResponseProductsData[] = [];
  let hotelData: ResponseProductsData[] = [];
  if (data) {
    [hotData, pensionData, hotelData] = data;
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
        <ColumnList category="hot" data={hotData} />
      </div>
      <div css={CategoryBox}>
        <h2 css={CategoryName}>
          <Link css={LinkBox} to="/category?type=펜션,풀빌라">
            펜션, 풀빌라
            <IoIosArrowForward className="arrowIcon" />
          </Link>
        </h2>
        <p css={CategoryDesc}>크리스마스 펜션 예약하기</p>
        <RowList data={pensionData} />
      </div>
      <div css={CategoryBox}>
        <h2 css={CategoryName}>
          <Link css={LinkBox} to="/category?type=호텔,모텔">
            호텔, 모텔
            <IoIosArrowForward className="arrowIcon" />
          </Link>
        </h2>
        <p css={CategoryDesc}>지금 떠나는 도심 호캉스!</p>
        <RowList data={hotelData} />
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

  width: 100%;

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
