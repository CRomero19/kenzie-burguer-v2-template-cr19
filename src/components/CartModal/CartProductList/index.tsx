import { useContext } from 'react';
import CartProductCard from './CartProductCard';
import { StyledCartProductList } from './style';
import { StyledButton } from '../../../styles/button';
import { StyledParagraph } from '../../../styles/typography';
import { CartContext } from '../../../context/CartContext';

const CartProductList = () => {

  const { cart, removeAllItens, cartTotalPrice } = useContext(CartContext);

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
      <StyledParagraph className='total'>R${cartTotalPrice().toFixed(2)}</StyledParagraph>
    </div>
    <StyledButton type='button' onClick={()=>removeAllItens()} $buttonSize='default' $buttonStyle='gray'>
      Remover todos
    </StyledButton>
  </StyledCartProductList>

  )
};

export default CartProductList;
