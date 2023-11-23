import { css } from '@emotion/react';
import { useSearchParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import ColumnList from './ColumnList';

const CategoryProductsList = () => {
  const [searchPrams] = useSearchParams();
  const [category, setCategory] = useState('');
  useEffect(() => {
    const isString = searchPrams.get('type');
    if (isString) {
      setCategory(isString);
    }
  }, []);

  return (
    <div css={PageBox}>
      <div css={ListBox}>
        <div css={CategoryNameBox}>
          <p css={CategoryName}>
            {category === 'hot' && '인기 숙소'}
            {category === 'pension' && '펜션, 풀빌라'}
            {category === 'hotel' && '호텔, 모텔'}
          </p>
          <p css={CategoryDesc}>
            {category === 'hot' && '가장 잘 나가는 숙소 추천'}
            {category === 'pension' && '크리스마스 펜션 예약하기'}
            {category === 'hotel' && '지금 떠나는 도심 호캉스!'}
          </p>
        </div>
        {category !== '' && <ColumnList category={category} main={false} />}
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
