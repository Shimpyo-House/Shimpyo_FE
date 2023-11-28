import { css } from '@emotion/react';
import { useEffect, useRef, useState } from 'react';
import ColumnList from './ColumnList';
import useProductsData from '../../../hooks/useProductsData';
import { ResponseProductsData } from '../../../types';

type PropsType = {
  category: string;
};

const CategoryProductsList = ({ category }: PropsType) => {
  const trigger = useRef(null);
  const [page, setPage] = useState(0);
  const [productsData, setPropductsData] = useState<ResponseProductsData[]>([]);

  const io = new IntersectionObserver(() => {
    setPage((prev) => prev + 1);
    // console.log(page);
  });

  useEffect(() => {
    if (trigger.current) {
      io.observe(trigger.current);
    }
  }, []);
  useEffect(() => {
    const getData = async () => {
      try {
        console.log(page);

        const data = await useProductsData(page, 8, category);

        if (data) {
          const currentData: ResponseProductsData[] = [
            ...productsData,
            ...data,
          ];
          console.log(currentData);

          setPropductsData(currentData);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getData();
  }, [page]);

  return (
    <div css={PageBox}>
      <div css={ListBox}>
        <div css={CategoryNameBox}>
          <h2 css={CategoryName}>
            {category === 'hot' && '인기 숙소'}
            {category === '펜션,풀빌라' && '펜션, 풀빌라'}
            {category === '호텔,모텔' && '호텔, 모텔'}
          </h2>
          <p css={CategoryDesc}>
            {category === 'hot' && '가장 잘 나가는 숙소 추천'}
            {category === '펜션,풀빌라' && '크리스마스 펜션 예약하기'}
            {category === '호텔,모텔' && '지금 떠나는 도심 호캉스!'}
          </p>
        </div>
        {productsData && <ColumnList category={category} data={productsData} />}
        <div ref={trigger} css={spinner} />
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

const spinner = css`
  width: 50px;
  height: 50px;

  background-color: aqua;
`;
