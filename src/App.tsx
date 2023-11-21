import React from 'react';
import { Outlet } from 'react-router-dom';
import { Global } from '@emotion/react';
import Header from './components/common/Header';
import globalStyles from './style/globalStyles';

function App() {
  return (
    <div>
      <Global styles={globalStyles} />
      <Header />
      <Outlet />
    </div>
  );
}
export default App;
