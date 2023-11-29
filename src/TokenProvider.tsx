import { Outlet } from 'react-router-dom';
import useTokenRefresher from './hooks/useTokenRefresher';
import Loading from './components/common/Loading';

const TokenProvider = () => {
  useTokenRefresher();
  return (
    <>
      <Loading />
      <Outlet />
    </>
  );
};

export default TokenProvider;
