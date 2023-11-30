import React from 'react';
import swal from 'sweetalert';
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
  swal({
    title: '로그인이 필요합니다',
    icon: 'info',
  });
  return <Navigate to="/" />;
};

export default PrivateRoute;
