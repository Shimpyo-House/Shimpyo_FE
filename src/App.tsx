// import { ThemeProvider } from '@mui/material/styles';
import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './components/common/Header';
import ProductsDetail from './components/layout/productsDetail/ProductsDetail';

function App() {
  return (
    <div>
      <Header />
      <Outlet />
      <ProductsDetail />
    </div>
  );
}
export default App;
