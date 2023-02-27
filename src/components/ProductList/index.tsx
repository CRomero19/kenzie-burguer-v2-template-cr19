import { useContext, useEffect, useState } from 'react';
import ProductCard from './ProductCard';
import { StyledProductList } from './style';
import { CartContext } from '../../context/CartContext';


const ProductList = () => {
 
  const { filteredProducts } = useContext(CartContext)
  
  return (
    <StyledProductList>
     {
      filteredProducts ?
      filteredProducts.map( product =>(
        <ProductCard key={product.id} product={product}/>
      )) 
      :
      <p> vsf </p>
     }
    </StyledProductList>
  );
};

export default ProductList;
