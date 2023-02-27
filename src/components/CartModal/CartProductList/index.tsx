import { useContext } from 'react';
import CartProductCard from './CartProductCard';
import { StyledCartProductList } from './style';
import { StyledButton } from '../../../styles/button';
import { StyledParagraph } from '../../../styles/typography';
import { CartContext } from '../../../context/CartContext';

const CartProductList = () => {

  const { cart } = useContext(CartContext);

  return(
    <StyledCartProductList>
    <ul>
      {cart ? (
        cart.map((cartItem) => (
          <CartProductCard key={cartItem.id} cartItem={cartItem} />
        ))
      ) : (
        <p> Carregando... </p>
      )}
    </ul>

    <div className='totalBox'>
      <StyledParagraph>
        <strong>Total</strong>
      </StyledParagraph>
      <StyledParagraph className='total'>R$ 14,00</StyledParagraph>
    </div>
    <StyledButton $buttonSize='default' $buttonStyle='gray'>
      Remover todos
    </StyledButton>
  </StyledCartProductList>

  )
};

export default CartProductList;
