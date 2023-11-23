import React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import theme from '../style/theme';

import ProductsDetail from '../components/layout/productsDetail/ProductsDetail';
import Calendar from '../components/layout/productsDetail/Calendar';
import ProductsRoom from '../components/layout/productsDetail/ProductsRoom';

const ProductDetail = () => {
  return (
    <ThemeProvider theme={theme}>
      <>
        <ProductsDetail />
        <Calendar />
        <ProductsRoom roomData={undefined} />
      </>
    </ThemeProvider>
  );
};

export default ProductDetail;
