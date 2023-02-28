/* eslint-disable import/no-extraneous-dependencies */
import { useContext } from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { useForm } from 'react-hook-form';
// eslint-disable-next-line import/no-unresolved
import { yupResolver } from '@hookform/resolvers/yup';
import { formLoginSchema } from './loginSchema';
import { StyledButton } from '../../../styles/button';
import { StyledForm } from '../../../styles/form';
import Input from '../Input';
import { UserContext } from '../../../context/UserContext';

interface IUserLogin {
  email: string;
  password: string;
}

const LoginForm = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<IUserLogin>({
    resolver: yupResolver(formLoginSchema)
  })
  
  const { handleSubmitLogin } = useContext(UserContext);

  return (
    <StyledForm onSubmit={handleSubmit(handleSubmitLogin)}>
      <Input label='Email' name='email' type='text' register={register} errors={errors} />
      <Input label='Senha' name='password' type='password' register={register} errors={errors} />
      <StyledButton type='submit' $buttonSize='default' $buttonStyle='green'>
        Entrar
      </StyledButton>
    </StyledForm>
  );
};

export default LoginForm;
