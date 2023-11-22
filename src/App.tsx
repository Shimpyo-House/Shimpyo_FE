// // App.tsx
// import React from 'react';
// import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import Header from './components/common/Header';
// import ProductDetail from './components/layout/productsDetail/ProductDetail';

// const App = () => {
//   return (
//     <Router>
//       <div>
//         <Header />
//         <Routes>
//           <Route path="/product-detail" element={<ProductDetail />} />
//           {/* 다른 경로에 대한 처리 */}
//         </Routes>
//       </div>
//     </Router>
//   );
// };

// export default App;

import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './components/common/Header';
import ProductsDetail from './components/layout/productsDetail/ProductsDetail';

function App() {
  return (
    <div>
      <Header />
      <ProductsDetail />
      <Outlet />
    </div>
  );
}
export default App;
