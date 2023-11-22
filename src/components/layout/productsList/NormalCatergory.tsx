import { css } from '@emotion/react';
import NormalList from './NormalList';
import theme from '../../../style/theme';
import HotList from './HotList';

export default function NormalCategory() {
  return (
    <div css={PageBox}>
      <div css={CategoryBox}>
        <div css={CategoryName}>인기 상품</div>
        <div css={CategoryDesc}>가장 잘 나가는 숙소 추천</div>
        <HotList />
      </div>
      <div css={CategoryBox}>
        <div css={CategoryName}>펜션, 풀빌라</div>
        <div css={CategoryDesc}>지금 떠나는 도심 호캉스 !</div>
        <NormalList category="펜션" />
      </div>
      <div css={CategoryBox}>
        <div css={CategoryName}>호텔, 모텔</div>
        <div css={CategoryDesc}>지금 떠나는 도심 호캉스 !</div>
        <NormalList category="호텔" />
      </div>
    </div>
  );
}

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
  font-size: 1.875rem;
  font-weight: 700;
`;
const CategoryDesc = css`
  color: ${theme.colors.gray700};

  font-size: 1rem;
`;
