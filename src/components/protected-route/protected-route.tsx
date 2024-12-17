import React, { ReactElement } from 'react';
import { Navigate, useLocation, Location, useNavigate } from 'react-router-dom';
import { useSelector } from '../../services/store';
import { isAuthCheckedSelector } from '../../services/slices/user-slice';

type ProtectedRouteProps = {
  nonAuth?: boolean;
  children: ReactElement;
};

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  nonAuth = false,
  children
}) => {
  const isAuthChecked = useSelector(isAuthCheckedSelector);
  const location = useLocation();
  const navigate = useNavigate();

  const fromPage = (location.state as { from?: Location })?.from || {
    pathname: '/'
  };
  const navigateTo = (to: Location) => {
    navigate(to);
  };

  if (isAuthChecked === undefined) {
    return null;
  }

  if (!nonAuth && !isAuthChecked) {
    return <Navigate replace to='/login' state={{ from: location }} />;
  }

  if (nonAuth && isAuthChecked) {
    return <Navigate replace to={fromPage} />;
  }

  return children;
};

export default ProtectedRoute;

/* import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

import { useSelector } from '../../services/store';
import { isAuthCheckedSelector } from '../../services/slices/user-slice';

type ProtectedRouteProps = {
  nonAuth?: boolean;
  children: React.ReactElement;
};

export const ProtectedRoute = ({
  nonAuth = false,
  children
}: ProtectedRouteProps) => {
  const isAuthChecked = useSelector(isAuthCheckedSelector);
  const location = useLocation();

  if (!nonAuth && !isAuthChecked) {
    return <Navigate replace to='/login' state={{ from: location }} />;
  }

  if (nonAuth && isAuthChecked) {
    const fromPage = location.state?.from || { pathname: '/' };

    return <Navigate replace to={fromPage} />;
  }
  return children;
}; */
