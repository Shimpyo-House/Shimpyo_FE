import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { css } from '@emotion/react';
import App from './App';
import Home from './pages/Home';
import ProductDetail from './pages/ProductDetail';
import Signup from './pages/Signup';
import Signin from './pages/Signin';

const RouterContainerStyle = css`
  height: 100%;
  width: 100%;
  max-width: 1280px;

  margin: 0 auto;
`;

const Router = () => {
  return (
    <main css={RouterContainerStyle}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />}>
            <Route index element={<Home />} />
            <Route path="product/:id" element={<ProductDetail />} />
          </Route>
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
        </Routes>
      </BrowserRouter>
    </main>
  );
};

export default Router;
