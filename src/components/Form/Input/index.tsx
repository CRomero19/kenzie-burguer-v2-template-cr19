/* eslint-disable import/no-unresolved */
import { FieldError, UseFormRegisterReturn } from 'react-hook-form/dist/types';
import { StyledTextField } from '../../../styles/form';
import { StyledParagraph } from '../../../styles/typography';

interface IInputProps {
  label: string;
  register: UseFormRegisterReturn<string>;
  type: 'text' | 'email' | 'password';
  errors?: FieldError;
}

const Input = ({ label, type, register, errors }: IInputProps) =>  (
    <fieldset>
      <StyledTextField label={label} type={type} {...register} />
      {errors?.message && (
        <StyledParagraph fontColor='red'> {errors.message} </StyledParagraph>
      )}
    </fieldset>
  );

export default Input;
