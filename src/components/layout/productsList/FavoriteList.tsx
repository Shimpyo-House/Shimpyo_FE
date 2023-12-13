import { useEffect, useState } from 'react';
import { css } from '@emotion/react';
import { getFavorite } from '../../../api/favorite';
import FavProduct from './FavProduct';
import { ResponseProductsData } from '../../../types';

const FavoriteList = () => {
  const [resData, SetResData] = useState<ResponseProductsData[] | undefined>(
    undefined,
  );

  const getData = async () => {
    const data = await getFavorite(0);
    SetResData(data);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div css={PageBox}>
      <div css={ListBox}>
        <p css={CategoryName}>찜한 숙소</p>
        <div css={ProductsBox}>
          {resData &&
            resData.map((e) => {
              return <FavProduct resData={e} key={e.productId} />;
            })}
        </div>
      </div>
    </div>
  );
};

export default FavoriteList;

const PageBox = css`
  position: relative;

  display: flex;
  flex-direction: column;
  align-items: center;

  min-height: calc(100vh - 70px);

  background-color: rgba(255, 2555, 255, 0.8);

  gap: 3.125rem;
`;

const ListBox = css`
  width: 68.75rem;

  display: flex;
  flex-direction: column;

  padding: 3.125rem 0;
  gap: 3rem;
`;

const CategoryName = css`
  font-size: 3rem;
  font-weight: 700;

  width: 100%;
`;

const ProductsBox = css`
  width: 100%;

  position: relative;

  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-items: flex-start;

  gap: 3.125rem;
`;
