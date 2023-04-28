/* eslint-disable @typescript-eslint/no-unused-vars */
import useEnhancedEffect from '@mui/material/utils/useEnhancedEffect';
import axios from 'axios';
import { createContext, useState, ReactNode } from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { toast } from 'react-toastify';
import { kenzieBurger } from '../services/api';

export interface IDefaultChildrenProps {
  children: ReactNode;
}
export interface IProduct {
  quantidade: ReactNode;
  id: number;
  name: string;
  category: string;
  price: number;
  img: string;
}
interface ICartItem {
  quantidade: number;
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
  removeAllItens:() => void;
  filter: string;
  setFilter:React.Dispatch<React.SetStateAction<string>>;
  products:IProduct[];
  filteredProducts:IProduct[];
  cartTotalPrice:()=>number;
  addOneToQuantityOnProduct: (clickedItem: IProduct) => void;
  removeOneToQuantityOoProduct: (clickedItem: IProduct) => void;
}

export const CartContext = createContext<ICartContext>({} as ICartContext);

export const CartProvider = ({ children }: IDefaultChildrenProps) => {
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
        const err:any = error;
        toast.error(err);
      }
    };
    getProducts();
  }, []);

  const openCloseModal = () => {
    setModalVisibility(!modalVisibility);
  };

  const addToCart = (product: IProduct) => {
    const isProductAlreadyInCart = cart.some((p) => p.id === product.id);
  
    if (!isProductAlreadyInCart) {
      const productWithQuantity = { ...product, quantidade: 1 };
      setCart([...cart, productWithQuantity]);
      toast.success('Produto adicionado');
    } else {
      const updatedCart = cart.map((p) => {
        if (p.id === product.id) {
          return { ...p, quantidade: p.quantidade + 1 }
        }
        return p;
      });
      setCart(updatedCart);
      toast.success('Quantidade atualizada');
    }
  };

  const removeItem = (clickedItem: IProduct) => {
    const newCart = cart.filter((product) => product.id !== clickedItem.id);
    setCart(newCart);
    toast.info('Produto removido!');
  };
  const removeAllItens = () => {
    if (cart.length > 0) {
      setCart([]);
      toast.info('Todos os produtos foram removidos!');
    } else {
      toast.info('Não há produtos no carrinho!');
    }
  };

  const filteredProducts = products.filter(product=> product.name.toLowerCase().includes(filter.toLowerCase()) || product.category.toLowerCase().includes(filter.toLowerCase()))

  const cartTotalPrice = () =>{
    const totalValue = cart.reduce((acc, cur) => acc + (cur.price * cur.quantidade), 0);
    return totalValue;
  }

  const addOneToQuantityOnProduct = (clickedItem: IProduct) =>{
    const newQuantity = cart.map((p) => {
      if (p.id === clickedItem.id) {
        return { ...p, quantidade: p.quantidade + 1 }
      }
      return p;

    });
    setCart(newQuantity)
    return;
  }

  const removeOneToQuantityOoProduct = (clickedItem: IProduct) =>{
    const newQuantity = cart.map((p) => {
      if (p.id === clickedItem.id) {
        return { ...p, quantidade: p.quantidade - 1 }
      }
      return p;

    });
    setCart(newQuantity)
    return;
  }

  return (
    <CartContext.Provider
      value={{ cart, modalVisibility, openCloseModal, addToCart, products, filter, setFilter, removeItem,removeAllItens,filteredProducts,cartTotalPrice,addOneToQuantityOnProduct,removeOneToQuantityOoProduct}}
    >
      {children}
    </CartContext.Provider>
  );
};
