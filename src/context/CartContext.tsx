import { createContext, useState, ReactNode } from 'react';

interface ICartChildrenType {
  children: ReactNode;
}

interface ICartItem{
	id: number,
	name: string,
	category: string,
	price: number,
	img: string
}

export interface ICartContext {
  cart:ICartItem[];
  modalVisibility:boolean;
  openCloseModal:()=>void;
}

export const CartContext = createContext<ICartContext>({}as ICartContext);

export const CartProvider = ({ children }: ICartChildrenType) => {

  const [cart, setCart] = useState<ICartItem[]>([]);

  const [modalVisibility, setModalVisibility] = useState(false)

  const openCloseModal = () =>{
    setModalVisibility(!modalVisibility)
  }

  return (
    <CartContext.Provider value={{ cart, modalVisibility , openCloseModal }}>
        {children}
    </CartContext.Provider>
  );
};
