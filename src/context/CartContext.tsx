import useEnhancedEffect from '@mui/material/utils/useEnhancedEffect';
import { createContext, useState, ReactNode } from 'react';
import { IProduct } from '../components/ProductList';
import { kenzieBurger } from '../services/api';

interface ICartChildrenType {
  children: ReactNode;
}
export interface IProduct {
  id: number;
  name: string;
  category: string;
  price: number;
  img: string;
}
interface ICartItem {
  id: number;
  name: string;
  category: string;
  price: number;
  img: string;
}
export interface ICartContext {
  cart: ICartItem[];
  modalVisibility: boolean;
  openCloseModal: () => void;
  addToCart: (product: IProduct) => void;
  removeItem: (clickedItem: IProduct) => void;
  filter: string;
  setFilter:React.Dispatch<React.SetStateAction<string>>;
  products:IProduct[];
  filteredProducts:IProduct[];
}

export const CartContext = createContext<ICartContext>({} as ICartContext);

export const CartProvider = ({ children }: ICartChildrenType) => {
  const [cart, setCart] = useState<ICartItem[]>([]);
  const [filter, setFilter] = useState('');
  const [modalVisibility, setModalVisibility] = useState(false);
  const [products, setProducts] = useState<IProduct[]>([]);

  useEnhancedEffect(() => {
    const token = localStorage.getItem('@USERTOKEN');
    const getProducts = async () => {
      try {
        const response = await kenzieBurger.get(`/products`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setProducts(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    getProducts();
  }, []);

  const openCloseModal = () => {
    setModalVisibility(!modalVisibility);
  };
  const addToCart = (product: IProduct) => {
    if (!cart.includes(product)) {
      setCart([...cart, product]);
      console.log(cart);
    } else {
      console.log('vsf');
    }
  };
  const removeItem = (clickedItem) => {
    const newCart = cart.filter((product) => product.id !== clickedItem.id);
    setCart(newCart);
    console.log('Produto removido!');
  };
  const removeAllItens = () => {
    if (cart.length > 0) {
      setCart([]);
      console.log('Todos os produtos foram removidos!');
    } else {
      console.log('Não há produtos no carrinho!');
    }
  };

  const filteredProducts = products.filter(product=> product.name.toLowerCase().includes(filter.toLowerCase()) || product.category.toLowerCase().includes(filter.toLowerCase()))

  return (
    <CartContext.Provider
      value={{ cart, modalVisibility, openCloseModal, addToCart, products, filter, setFilter, removeItem,filteredProducts}}
    >
      {children}
    </CartContext.Provider>
  );
};
