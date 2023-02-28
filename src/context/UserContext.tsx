/* eslint-disable @typescript-eslint/no-unused-vars */
import  { AxiosError } from 'axios';
import { createContext, useState, ReactNode, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { IDefaultChildrenProps } from './CartContext';
import { kenzieBurger } from '../services/api';

interface IUser {
  id: number;
  name: string;
  email: string;
}
interface ILoginFormValue {
  email: string;
  password: string;
}
interface IRegisterFormValue {
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
  handleSubmitLogin: (formData: ILoginFormValue) => Promise<void>;
  handleSubmitRegister: (formData: IRegisterFormValue) => Promise<void>;
  handleLogout: () => void;
}
export const UserContext = createContext({} as IUserContext);

export const UserProvider = ({ children }: IDefaultChildrenProps) => {
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
          const err:any = error;
          toast.error(err);
        }
      };
      autoLogin();
    }
  }, []);

  const handleSubmitLogin = async (formData: ILoginFormValue) => {
    try {
      const response = await kenzieBurger.post('/login', formData);
      localStorage.setItem('@USERTOKEN', response.data.accessToken);
      localStorage.setItem('@USERID', response.data.user.id);
      setUser(response.data);
      toast.success(`Bem vindo, ${response.data.user.name}`);
      navigate(`/shop`);
    } catch (error) {
      const err:any = error;
      toast.error(err);
    }
  };

  const handleSubmitRegister = async (formData: IRegisterFormValue) => {
    try {
      const response = await kenzieBurger.post('/users', formData);
      toast.success(`Cadastrado com sucesso!`);
      navigate(`/`);
    } catch (error) {
      const err:any = error;
      toast.error(err);
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
