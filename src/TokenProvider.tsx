import { Outlet } from 'react-router-dom';
import useTokenRefresher from './hooks/useTokenRefresher';

const TokenProvider = () => {
  useTokenRefresher();
  return <Outlet />;
};

export default TokenProvider;
