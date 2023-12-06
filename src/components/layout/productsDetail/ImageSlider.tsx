/* eslint-disable react/no-array-index-key */
/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-props-no-spreading */
// ProductImageSlider.jsx
import { css } from '@emotion/react';
import Slider from 'react-slick';

const ImageSlider = ({ images }: { images: string[] }) => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    arrow: true,
    autoplay: true,
    slidesToShow: 1,
    autoplaySpeed: 2000,
  };

  return (
    <Slider {...settings} css={SliderStyle}>
      {images?.map((image, index) => (
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
  height: 500px;
  overflow: hidden;
`;

const SlideItem = css`
  width: 100%;
  height: 100%;
`;

const ProductDetailImg = css`
  width: 100%;
  height: 500px;
  background-size: cover;
  /* border-radius: 10px; */
  display: block;
  object-fit: cover;
`;

export default ImageSlider;
