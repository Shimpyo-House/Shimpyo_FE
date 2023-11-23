/* eslint-disable import/no-named-as-default */
/* eslint-disable react/jsx-boolean-value */
import { css } from '@emotion/react';
import { Link } from 'react-router-dom';
import { IoIosArrowForward } from 'react-icons/io';
import NormalList from './RowList';
import theme from '../../../style/theme';
import ColumnList from './ColumnList';

const NormalCategory = () => {
  return (
    <div css={PageBox}>
      <div css={CategoryBox}>
        <div css={CategoryName}>
          <Link to="/category?type=hot">인기 숙소</Link>
          <IoIosArrowForward className="arrowIcon" />
        </div>
        <div css={CategoryDesc}>가장 잘 나가는 숙소 추천</div>
        <ColumnList category="hot" main={true} />
      </div>
      <div css={CategoryBox}>
        <div css={CategoryName}>
          <Link to="/category?type=pension">펜션, 풀빌라</Link>
          <IoIosArrowForward className="arrowIcon" />
        </div>
        <div css={CategoryDesc}>크리스마스 펜션 예약하기</div>
        <NormalList category="pension" />
      </div>
      <div css={CategoryBox}>
        <div css={CategoryName}>
          <Link to="/category?type=hotel">호텔, 모텔</Link>
          <IoIosArrowForward className="arrowIcon" />
        </div>
        <div css={CategoryDesc}>지금 떠나는 도심 호캉스!</div>
        <NormalList category="hotel" />
      </div>
    </div>
  );
};

export default NormalCategory;

const PageBox = css`
  width: 100%;

  display: flex;
  flex-direction: column;
  align-items: center;

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
const CategoryDesc = css`
  color: ${theme.colors.gray700};

  font-size: 1rem;
`;
