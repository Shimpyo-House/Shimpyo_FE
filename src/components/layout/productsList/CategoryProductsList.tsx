import { css } from '@emotion/react';
import ColumnList from './ColumnList';

const CategoryProductsList = () => {
  return (
    <div css={PageBox}>
      <div css={ListBox}>
        <div css={CategoryNameBox}>
          <div css={CategoryName}>인기 상품</div>
          <div css={CategoryDesc}>가장 잘 나가는 숙소 추천</div>
        </div>
        <ColumnList category="인기상품" main={false} />
      </div>
    </div>
  );
};

export default CategoryProductsList;

const PageBox = css`
  display: flex;
  justify-content: center;
`;

const ListBox = css`
  width: 68.75rem;

  display: flex;
  flex-direction: column;

  padding: 3.125rem 0;
  gap: 3rem;
`;

const CategoryNameBox = css`
  height: 6rem;

  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const CategoryName = css`
  font-size: 3rem;
  font-weight: 700;
`;

const CategoryDesc = css`
  font-size: 1.5rem;
  font-weight: 400;
`;
