import { ThemeProvider } from '@mui/material/styles';
import theme from '../style/theme';

// import ProductsDetail from '../components/layout/productsDetail/ProductsDetail';

const ProductDetail = () => {
  return (
    <ThemeProvider theme={theme}>{/* <ProductsDetail /> */}</ThemeProvider>
  );
};

export default ProductDetail;
