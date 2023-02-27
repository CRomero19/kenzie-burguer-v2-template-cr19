import { Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { UserProvider } from './context/UserContext';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ShopPage from './pages/ShopPage';

const Router = () => (
  <Routes>
    <Route
      path='/'
      element={
        <UserProvider>
          <LoginPage />
        </UserProvider>
      }
    />
    <Route
      path='/register'
      element={
        <UserProvider>
          <RegisterPage />
        </UserProvider>
      }
    />
    <Route
      path='/shop'
      element={
        <CartProvider>
          <UserProvider>
            <ShopPage />
          </UserProvider>
        </CartProvider>
      }
    />
  </Routes>
);

export default Router;
