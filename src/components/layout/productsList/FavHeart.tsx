import { IoIosHeartEmpty, IoMdHeart } from 'react-icons/io';
import { useEffect, useState } from 'react';
import { css } from '@emotion/react';
import { deleteFavorite, setFavorite } from '../../../api/favorite';

type PropsType = {
  productId: string;
  favorites: boolean;
};

const FavHeart = ({ productId, favorites }: PropsType) => {
  const [isFav, setIsFav] = useState(false);

  useEffect(() => {
    if (favorites === true) {
      setIsFav(true);
    }
  }, []);

  const handleFavorite = async () => {
    if (isFav) {
      const fav = await deleteFavorite(productId);
      if (fav) {
        setIsFav(false);
        alert('찜하기 취소됨');
      }
    } else {
      const fav = await setFavorite(productId);
      if (fav) {
        setIsFav(true);
        alert('찜하기 됨');
      }
    }
  };

  return (
    <div css={FavoriteBtn}>
      {isFav ? (
        <IoMdHeart onClick={handleFavorite} />
      ) : (
        <IoIosHeartEmpty onClick={handleFavorite} />
      )}
    </div>
  );
};

export default FavHeart;

const FavoriteBtn = css`
  position: absolute;
  top: 0.8rem;
  right: 0.8rem;

  font-size: 2rem;
  color: #ff2d2d;

  transition: all 0.25s;

  z-index: 10;

  :hover {
    scale: 1.05;
  }
  :active {
    scale: 0.95;
  }
`;
