import { css } from '@emotion/react';
import { Outlet } from 'react-router-dom';
import Header from './components/common/header/Header';

const ContainerStyle = css`
  position: relative;

  top: 75px;

  height: 100%;
  width: 100%;
  max-width: 1280px;

  margin: 0 auto;
`;

function App() {
  return (
    <div>
      <Header />
      <div css={ContainerStyle}>
        <Outlet />
      </div>
    </div>
  );
}

export default App;
