import { useContext } from 'react';
import { MdSearch } from 'react-icons/md';
import { StyledSearchForm } from './style';
import { StyledButton } from '../../../styles/button';
import { CartContext } from '../../../context/CartContext';

const SearchForm = () => {
  const { setFilter } = useContext(CartContext)
  return(
    <StyledSearchForm>
    <input type='text' placeholder='Digitar pesquisa' onChange={(event)=>setFilter(event?.target.value)}/>
    <StyledButton type='submit' $buttonSize='medium' $buttonStyle='green'>
      <MdSearch />
    </StyledButton>
  </StyledSearchForm>

  )
};

export default SearchForm;
