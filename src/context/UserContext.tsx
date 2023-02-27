/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-console */

import { createContext, useState, ReactNode, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { kenzieBurger } from '../services/api';

interface IUserChildrenType {
  children: ReactNode;
}
interface IUser {
  id: number;
  name: string;
  email: string;
}
interface ILogin {
  email: string;
  password: string;
}
interface IRegister {
  name: string;
  email: string;
  password: string;
}
interface IResponseAPI {
  accessToken: string;
  user: IUser;
}
export interface IUserContext {
  user: IResponseAPI | null;
  handleSubmitLogin: (formData: ILogin) => Promise<void>;
  handleSubmitRegister: (formData: IRegister) => Promise<void>;
  /* setUser:React.Dispatch<React.SetStateAction<IResponseAPI | null>>; */
  handleLogout: () => void;
}
export const UserContext = createContext({} as IUserContext);

export const UserProvider = ({ children }: IUserChildrenType) => {
  const navigate = useNavigate();
  const [user, setUser] = useState<IResponseAPI | null>(null);

  useEffect(() => {
    const token = localStorage.getItem('@USERTOKEN');
    const userId = localStorage.getItem('@USERID');
    if (token) {
      const autoLogin = async () => {
        try {
          const response = await kenzieBurger.get(`/users/${userId}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          setUser(response.data);
          navigate('/shop');
        } catch (error) {
          console.log(error);
        }
      };
      autoLogin();
    }
  }, []);

  const handleSubmitLogin = async (formData: ILogin) => {
    try {
      const response = await kenzieBurger.post('/login', formData);
      localStorage.setItem('@USERTOKEN', response.data.accessToken);
      localStorage.setItem('@USERID', response.data.user.id);
      console.log(response);
      setUser(response.data);
      console.log(`Bem vindo, ${response.data.user.name}`);
      navigate(`/shop`);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmitRegister = async (formData: IRegister) => {
    try {
      const response = await kenzieBurger.post('/users', formData);
      console.log(`Cadastrado com sucesso!`);
      navigate(`/`);
    } catch (error) {
      console.log(error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('@USERTOKEN');
    localStorage.removeItem('@USERID');
    setUser(null);
    navigate('/');
  };

  return (
    <UserContext.Provider
      value={{ user, handleLogout, handleSubmitLogin, handleSubmitRegister }}>
      {children}
    </UserContext.Provider>
  );
};
