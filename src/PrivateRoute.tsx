import React from 'react';
import { Navigate } from 'react-router-dom';
import { getCookie } from './components/layout/auth/auth.utils';

const PrivateRoute = ({
  component: RouteComponent,
}: {
  component: React.ComponentType;
}) => {
  const accessToken = getCookie('accessToken');
  if (accessToken) {
    return <RouteComponent />;
  }
  alert('로그인이 필요합니다.');
  return <Navigate to="/signin" />;
};

export default PrivateRoute;
