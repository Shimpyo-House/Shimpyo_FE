import { BrowserRouter, Route, Routes } from 'react-router-dom';
import App from './App';
import Home from './pages/Home';
import ProductDetail from './pages/ProductDetail';
import Signup from './pages/Signup';
import Signin from './pages/Signin';
import Cart from './pages/Cart';
import Pay from './pages/Pay';
import OrderedList from './pages/OrderedList';
import CategoryProducts from './pages/CategoryProducts';
import TokenProvider from './TokenProvider';
import MyPage from './pages/MyPage';
import MyReservation from './pages/MyReservation';
import PrivateRoute from './PrivateRoute';
import SearchProducts from './pages/SearchProducts';

const Router = () => {
  return (
    <main>
      <BrowserRouter>
        <Routes>
          <Route element={<TokenProvider />}>
            <Route element={<App />}>
              <Route index element={<Home />} />
              <Route path="category" element={<CategoryProducts />} />
              <Route path="search" element={<SearchProducts />} />
              <Route path="products/:productId" element={<ProductDetail />} />
              <Route path="carts" element={<Cart />} />
              <Route path="pay" element={<PrivateRoute component={Pay} />} />
              <Route
                path="ordered"
                element={<PrivateRoute component={OrderedList} />}
              />
              <Route
                path="reservation"
                element={<PrivateRoute component={MyReservation} />}
              />
              <Route
                path="mypage"
                element={<PrivateRoute component={MyPage} />}
              />
            </Route>
            <Route path="signup" element={<Signup />} />
            <Route path="signin" element={<Signin />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </main>
  );
};

export default Router;
