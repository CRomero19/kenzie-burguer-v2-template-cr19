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
    <Input label='Nome' name='name' type='text' register={register} errors={errors}/>
    <Input label='Email' name='email' type='email' register={register} errors={errors}/>
    <Input label='Senha' name='password' type='password' register={register} errors={errors}/>
    <Input label='Confirmar senha' name='confirmpassword' type='password'  register={register} errors={errors}/>
    <StyledButton type='submit'  $buttonSize='default' $buttonStyle='gray'>
      Cadastrar
    </StyledButton>
  </StyledForm>
  )
};

export default RegisterForm;
