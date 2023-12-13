/* eslint-disable react/no-array-index-key */
/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-props-no-spreading */
import { css } from '@emotion/react';
import Slider from 'react-slick';

const RoomImageSlider = ({ images }: { images: string[] }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    arrow: true,
    autoplay: true,
    slidesToShow: 1,
    autoplaySpeed: 2000,
  };

  const imageArray = images.length ? images : ['/noImage.png'];

  return (
    <Slider {...settings} css={SliderStyle}>
      {imageArray.map((image, index) => (
        <div key={index} css={SlideItem}>
          <div
            css={ProductDetailImg}
            style={{
              backgroundImage: `url(${image})`,
              backgroundPosition: 'center',
            }}
          />
        </div>
      ))}
    </Slider>
  );
};

const SliderStyle = css`
  width: 100%;
  height: 100%;
  overflow: hidden;
`;

const SlideItem = css`
  width: 100%;
  height: 100%;
`;

const ProductDetailImg = css`
  width: 100%;
  height: 22.375rem;
  max-width: 100%;
  max-height: 100%;
  background-size: cover;
  border-radius: 0.625rem;
  display: block;
  object-fit: cover;
`;

export default RoomImageSlider;
