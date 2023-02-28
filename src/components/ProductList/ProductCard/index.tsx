import { useContext } from 'react';
import { StyledProductCard } from './style';
import { StyledButton } from '../../../styles/button';
import { StyledParagraph, StyledTitle } from '../../../styles/typography';
import { CartContext, IProduct } from '../../../context/CartContext';

interface IProductCard {
  product: IProduct;
}

const ProductCard = ({ product }: IProductCard) => {
  const { addToCart } = useContext(CartContext);
  return (
    <StyledProductCard>
      <div className='imageBox'>
        <img src={product.img} alt='Hamburguer' />
      </div>
      <div className='content'>
        <StyledTitle tag='h3' $fontSize='three'>
          {product.name}
        </StyledTitle>
        <StyledParagraph className='category'>
          {product.category}
        </StyledParagraph>
        <StyledParagraph className='price'>R$ {product.price}</StyledParagraph>
        <StyledButton
          onClick={() => addToCart(product)}
          type='button'
          $buttonSize='medium'
          $buttonStyle='green'
        >
          Adicionar
        </StyledButton>
      </div>
    </StyledProductCard>
  );
};

export default ProductCard;
