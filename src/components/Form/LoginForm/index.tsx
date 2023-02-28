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
import { ILoginFormValue, UserContext } from '../../../context/UserContext';

const LoginForm = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<ILoginFormValue>({
    resolver: yupResolver(formLoginSchema)
  })
  
  const { handleSubmitLogin } = useContext(UserContext);

  return (
    <StyledForm onSubmit={handleSubmit(handleSubmitLogin)}>
      <Input label='Email'  type='text' register={register('email')} errors={errors.email} />
      <Input label='Senha'  type='password' register={register('password')} errors={errors.password} />
      <StyledButton type='submit' $buttonSize='default' $buttonStyle='green'>
        Entrar
      </StyledButton>
    </StyledForm>
  );
};

export default LoginForm;
