import { css } from '@emotion/react';
import { Outlet } from 'react-router-dom';
import { useEffect } from 'react';
import Header from './components/common/header/Header';

function App() {
  useEffect(() => {
    const getData = async () => {
      // const res = await axiosWithNoToken.get('/api/products');
      // console.log(res);
      // const res = await axios.get('/api/products');
      // const res1 = await axiosWithNoToken.post('/api/auth/signin', {
      //   email: 'test@mail.com',
      //   password: 'qwer1234$$',
      // });
      // console.log('signin ', res1);
      // const res2 = await axiosWithAccessToken.get('/api/orders/1');
      // console.log('res2', res2);
      // const res3 = await axiosWithNoToken.get(
      //   '/api/products/1?startDate=2023-11-20&endDate=2023-11-21',
      // );
      // console.log(res3);
    };

    getData();
  });
  return (
    <div>
      <Header />
      <div css={ContainerStyle}>
        <Outlet />
      </div>
    </div>
  );
}

const ContainerStyle = css`
  position: relative;

  top: 75px;

  height: 100%;
  width: 100%;
  max-width: 1280px;

  margin: 0 auto;
`;

export default App;
