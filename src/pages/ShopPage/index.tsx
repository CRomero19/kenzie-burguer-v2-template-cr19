import { useContext } from 'react';
import { StyledShopPage } from './style';
import CartModal from '../../components/CartModal';
import Header from '../../components/Header';
import ProductList from '../../components/ProductList';
import { StyledContainer } from '../../styles/grid';
import { CartContext } from '../../context/CartContext';

const ShopPage = () => {

  const { modalVisibility } = useContext(CartContext);

  return(
    <StyledShopPage>
    {modalVisibility && <CartModal />}
    <Header />
    <main>
      <StyledContainer containerWidth={1300}>
        <ProductList />
      </StyledContainer>
    </main>
  </StyledShopPage>

  )
};

export default ShopPage;
