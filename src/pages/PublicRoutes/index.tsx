/* eslint-disable react/jsx-no-useless-fragment */
import { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { UserContext } from '../../context/UserContext';

export const PublicRoutes = () => {
  const { user } = useContext(UserContext);

  return <>{user ? <Navigate to='/shop' /> : <Outlet />}</>;
};
