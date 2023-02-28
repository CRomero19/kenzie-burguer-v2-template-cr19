// eslint-disable-next-line import/no-extraneous-dependencies
import { useContext } from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { useForm } from 'react-hook-form';
// eslint-disable-next-line import/no-extraneous-dependencies
import { yupResolver } from '@hookform/resolvers/yup';
import { formRegisterSchema } from './registerSchema';
import { UserContext } from '../../../context/UserContext';
import { StyledButton } from '../../../styles/button';
import { StyledForm } from '../../../styles/form';
import Input from '../Input';

interface IUserRegister{
  name: string;
  email:string;
  password:string;
  confirmpassword:string;
}

const RegisterForm = () => {

  const { register, handleSubmit, formState: { errors }} = useForm<IUserRegister>({
    resolver: yupResolver(formRegisterSchema)
  })
  const { handleSubmitRegister } = useContext(UserContext);

  return (
  <StyledForm onSubmit={handleSubmit(handleSubmitRegister)}>
    <Input label='Nome'  type='text' register={register('name')} errors={errors.name}/>
    <Input label='Email'  type='email' register={register('email')} errors={errors.email}/>
    <Input label='Senha'  type='password' register={register('password')} errors={errors.password}/>
    <Input label='Confirmar senha' type='password'  register={register('confirmpassword')} errors={errors.confirmpassword}/>
    <StyledButton type='submit'  $buttonSize='default' $buttonStyle='gray'>
      Cadastrar
    </StyledButton>
  </StyledForm>
  )
};

export default RegisterForm;
