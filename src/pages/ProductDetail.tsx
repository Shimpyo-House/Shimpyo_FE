import React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import theme from '../style/theme';

import ProductsDetail from '../components/layout/productsDetail/ProductsDetail';
import Calendar from '../components/layout/productsDetail/Calendar';

const ProductDetail = () => {
  return (
    <ThemeProvider theme={theme}>
      <>
        <ProductsDetail />
        <Calendar />
      </>
    </ThemeProvider>
  );
};

export default ProductDetail;
