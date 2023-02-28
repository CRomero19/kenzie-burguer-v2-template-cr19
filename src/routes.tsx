import { Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { LoggedRoutes } from './pages/LoggedRoutes';
import LoginPage from './pages/LoginPage';
import { PublicRoutes } from './pages/PublicRoutes';
import RegisterPage from './pages/RegisterPage';
import ShopPage from './pages/ShopPage';

const Router = () => (
  <Routes>
    <Route path='/' element={<PublicRoutes />}>
      <Route index element={<LoginPage />} />
      <Route path='/register' element={<RegisterPage />} />
    </Route>

    <Route path='/shop' element={<LoggedRoutes />}>
      <Route
        index
        element={
          <CartProvider>
            <ShopPage />
          </CartProvider>
        }
      />
    </Route>

  </Routes>
);

export default Router;
