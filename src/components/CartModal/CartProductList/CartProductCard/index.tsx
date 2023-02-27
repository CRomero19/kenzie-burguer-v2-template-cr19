import {useContext} from 'react'
import { MdDelete } from 'react-icons/md';
import { StyledCartProductCard } from './style';
import { StyledTitle } from '../../../../styles/typography';
import { CartContext, IProduct } from '../../../../context/CartContext';

interface ICartItem{
  cartItem:IProduct;
}
const CartProductCard = ({cartItem}:ICartItem) => {
  const { removeItem } = useContext(CartContext)
  return(
    <StyledCartProductCard>
    <div className='imageBox'>
      <img src={cartItem.img} alt='Imagem hamburger' />
    </div>
    <div className='contentBox'>
      <StyledTitle tag='h3' $fontSize='three'>
        {cartItem.name}
      </StyledTitle>
      <button onClick={()=>removeItem(cartItem)} type='button' aria-label='Remover'>
        <MdDelete size={24} />
      </button>
    </div>
  </StyledCartProductCard>
  )
};

export default CartProductCard;
