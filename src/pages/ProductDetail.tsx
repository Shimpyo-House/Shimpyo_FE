import { ThemeProvider } from '@mui/material/styles';
import theme from '../style/theme';

import ProductsDetail from '../components/layout/productsDetail/ProductsDetail';
import ListBackground from '../components/layout/productsList/ListBackground';

const ProductDetail = () => {
  return (
    <ThemeProvider theme={theme}>
      {' '}
      <ListBackground />
      <ProductsDetail />
    </ThemeProvider>
  );
};

export default ProductDetail;
