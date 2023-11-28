import { css } from '@emotion/react';
import { useEffect, useRef, useState } from 'react';
import ColumnList from './ColumnList';
import useProductsData from '../../../hooks/useProductsData';
import { ResponseProductsData } from '../../../types';

type PropsType = {
  category: string;
};

const CategoryProductsList = ({ category }: PropsType) => {
  const [page, setPage] = useState(0);
  const [productsData, setPropductsData] = useState<ResponseProductsData[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isEnd, setIsEnd] = useState(false);
  const obsRef = useRef(null);

  useEffect(() => {
    const io = new IntersectionObserver(obsHandler, {
      threshold: 1,
    });
    if (obsRef.current) {
      io.observe(obsRef.current);
    }
    return () => {
      io.disconnect();
    };
  }, []);

  const obsHandler = async (entries: IntersectionObserverEntry[]) => {
    const target = entries[0];
    if (target.isIntersecting && !isLoading && !isEnd) {
      setPage((prev) => prev + 1);
    }
  };

  // page > 0을 함으로써 첫 렌더링 시 옵저버의 페이지 증가로 인한 중복 렌더링을 방지
  useEffect(() => {
    const getData = async () => {
      try {
        setIsLoading(true);
        if (page > 0) {
          const data = await useProductsData(page - 1, 8, category);
          if (data) {
            if (data.length < 8) {
              setIsEnd(true);
            }
            const currentData: ResponseProductsData[] = [
              ...productsData,
              ...data,
            ];
            setPropductsData(currentData);
          }
        }
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
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
        {!isEnd && <div ref={obsRef} css={spinner} />}
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
  height: 0;

  background-color: aqua;
`;
