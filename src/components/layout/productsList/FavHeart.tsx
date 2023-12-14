import { IoIosHeartEmpty, IoMdHeart } from 'react-icons/io';
import { useEffect, useState } from 'react';
import { css } from '@emotion/react';
import toast from 'react-hot-toast';
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
        toast.success('찜을 해제하였습니다.', {
          duration: 700,
        });
      }
    } else {
      const fav = await setFavorite(productId);
      if (fav) {
        setIsFav(true);
        toast.success('찜 목록에 추가하였습니다.', {
          duration: 700,
        });
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
