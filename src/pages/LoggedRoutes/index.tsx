/* eslint-disable react/jsx-no-useless-fragment */
import { useContext } from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { UserContext } from '../../context/UserContext';


export const LoggedRoutes = () => {
  const { user } = useContext(UserContext);

  return <>{user ? <Outlet /> : <Navigate to='/' />}</>;
};
