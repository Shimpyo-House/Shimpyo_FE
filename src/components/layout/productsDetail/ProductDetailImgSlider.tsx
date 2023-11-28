/* eslint-disable react/no-array-index-key */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable import/no-extraneous-dependencies */
// ProductDetailImgSlider 컴포넌트
import React from 'react';
import Slider from 'react-slick';
import { css } from '@emotion/react';

const ProductDetailImg = css`
  width: 100%;
  height: 500px;
  border-radius: 10px;
`;

const ProductDetailImgSlider = ({ images }: { images: string[] }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    autoplay: true,
    slidesToShow: 1,
    autoplaySpeed: 2000,
  };

  return (
    <Slider {...settings}>
      {images.map((image, index) => (
        <div key={index}>
          <div
            css={ProductDetailImg}
            style={{ backgroundImage: `url('${image}')` }}
          />
        </div>
      ))}
    </Slider>
  );
};

export default ProductDetailImgSlider;
